from rest_framework import serializers
from .models import Project, Skill
from django.db.models import Q

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    skills = serializers.SerializerMethodField()
    class Meta:
        model = Project
        fields = '__all__'

    def get_skills(self, obj):
        # return a list of skill names for the project
        return [skill.name for skill in obj.skills.all()]
    
    def to_internal_value(self, data):
        # convert the list of skill ids to a list of skill objects
        skills = data.pop('skills', [])
        skills = [Skill.objects.get(id=skill_id) for skill_id in skills]
        validated_data = super().to_internal_value(data)
        validated_data['skills'] = skills
        return validated_data
