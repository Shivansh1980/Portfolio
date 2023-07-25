from rest_framework import serializers
from .models import AIModel
from django.db.models import Q


class AIModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = AIModel
        fields = '__all__'
