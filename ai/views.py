from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import  AIModelSerializer
from .models import AIModel
import base64
from PIL import Image
from rest_framework import viewsets
from custom_tools.data_processing_tools import SkillDataProcessing, AIModelDataProcessor
import tensorflow as tf
from custom_tools.model_tools import ModelOutputPredictor


class AIModelViewset(viewsets.ModelViewSet):
    queryset = AIModel.objects.all()
    serializer_class = AIModelSerializer

class AIModelApi(APIView):
    def post(self, request, id=None, **kwargs):
        # try:
        database_model = AIModel.objects.get(id=id)
        data = request.data
        data = {key: data.get(key) for key in data.keys()}
        data['for_model'] = database_model.name

        if(database_model.data_type == 'model'):
            output_predictor = ModelOutputPredictor(database_model)
            output = output_predictor.predict(data)
            return Response({'message':'everything successfull', 'data':output}, status=200)
        else:
            return Response({'message':'model data type invalide'}, status=400)

        # except Exception as e:
        #     return Response({'status':False, 'message':'failed to load the model', 'error':str(e)})
    
    def get(self, request, id=None, **kwargs):
        return Response({'status':False, 'message':'only post request is supported'})