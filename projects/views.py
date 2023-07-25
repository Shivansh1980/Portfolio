from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ProjectSerializer, SkillSerializer
from .models import Project, Skill
# Create your views here.
from rest_framework import viewsets
from custom_tools.data_processing_tools import SkillDataProcessing
import json

class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer



class ProjectApiView(APIView):
    def get(self, request, id=None, slug=None, **kwargs):
        if id is not None:
            try:
                project = Project.objects.get(id=id)
                project_serializer = ProjectSerializer(project)
                return Response(project_serializer.data, status=200)
            except Exception as e:
                return Response({'status':False, 'message':f'project with id {id} not found'})
        projects = Project.objects.all()
        serialized_projects = ProjectSerializer(projects, many=True)
        return Response(serialized_projects.data, status=200)
    
    def post(self, request, slug=None, **kwargs):
        skill_preprocessing = SkillDataProcessing()
        data = request.POST.copy()
        data['image'] = request.FILES.get("image")
        
        try:
            skills = skill_preprocessing.get_skills_by_ids_and_names(data['skills'])
            if(skills is None):
                return Response({'message':'some skills with the given id or name not found'})
        
            data.pop("skills")

            project_serializer = ProjectSerializer(data=data)
            if(project_serializer.is_valid()):
                project = project_serializer.save()

                for s in skills:
                    project.skills.add(s)
    
                return Response(project_serializer.data, status=201)
            else:
                return Response(project_serializer.errors, status=400)
        except Exception as e:
            return Response({'status':False, 'message':'there could be an error in skills field'}, status=400)
        
    def delete(self, request, id=None, slug=None, **kwargs):
        project_id = request.data.get('id', None)
        try:
            project = Project.objects.get(id=project_id)
            return Response(ProjectSerializer(project).data, status=200)
        except Project.DoesNotExist as e:
            return Response({'status':False, 'message':f'project with id {id} does not exist'}, status=401)