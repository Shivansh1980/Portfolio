from django.db import models
from portfolio.settings import MEDIA_ROOT
from django.core.files.storage import FileSystemStorage
import os
import torch.nn as nn
import torch

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



class SparseAutoencoder(nn.Module):
    def __init__(self, input_size, hidden_size, sparsity_level):
        super(SparseAutoencoder, self).__init__()
        self.encoder = nn.Linear(input_size, hidden_size)
        self.decoder = nn.Linear(hidden_size, input_size)
        self.sparsity_level = sparsity_level

    def forward(self, x):
        x = self.encoder(x)
        x = torch.sigmoid(x)
        x = self.decoder(x)
        return x
    
    def encode(self, x):
        x = self.encoder(x)
        x = torch.sigmoid(x)
        return x
    
    def encode_image(self, x):
        x = self.encoder(x)
        x = torch.sigmoid(x)
        with torch.no_grad():
            return x.reshape(12,12,1).numpy()
        
    def decode_image(self, x):
        x = x.reshape(144,1)
        x = self.decoder(torch.FloatTensor(x))
        with torch.no_grad():
            return x.reshape(28,28,1).numpy()

    def loss(self, x, x_hat):
        sparse_loss = self.sparsity_level * torch.sum(torch.abs(self.encoder.weight))
        reconstruction_loss = nn.MSELoss()(x_hat, x)
        return reconstruction_loss + sparse_loss
    







# < --------------------------------------- Data Transformers ----------------------------------------------->
