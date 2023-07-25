from django.db import models
from portfolio.settings import MEDIA_ROOT
from django.core.files.storage import FileSystemStorage
import os

# <------------------------ AI MODEL ------------------------------>

class ModelDataType(models.TextChoices):
     MODEL = 'model', 'Model'
     WEIGHTS = 'weights', 'Weights'
     TORCH = 'torch', 'Torch'


class AIModel(models.Model):
    name = models.CharField(max_length=1000)
    description = models.TextField(max_length=4000, null=True, blank=True)
    data = models.FileField(upload_to=os.path.join(MEDIA_ROOT, 'models'), storage=FileSystemStorage)
    data_type = models.CharField(max_length=100, choices=ModelDataType.choices, default=ModelDataType.MODEL, null=True, blank=True)
    data_transformer = models.FileField(upload_to=os.path.join(MEDIA_ROOT, 'pipelines'), storage=FileSystemStorage, null=True, blank=True)
    metadata = models.JSONField(null=True, blank=True)

    def __str__(self):
        return self.name
