from django.contrib import admin
from django.urls import path, include
from projects.views import ProjectApiView, SkillViewSet
from rest_framework import routers
from ai.serializers import AIModelSerializer
from ai.views import AIModelViewset, AIModelApi

router = routers.DefaultRouter()
router.register(r'skills', SkillViewSet)
router.register(r'ai_models', AIModelViewset)

urlpatterns = [
    path('', include(router.urls)),
    path('ai_models/<int:id>/predict/', AIModelApi.as_view()),
    path('projects/', ProjectApiView.as_view()),
    path('projects/<int:id>/', ProjectApiView.as_view()),
]