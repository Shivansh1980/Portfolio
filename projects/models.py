from django.db import models
from portfolio.settings import MEDIA_ROOT
from django.core.files.storage import FileSystemStorage
# Create your models here.



#<---------------------------- Skill Model --------------------------->
class Skill(models.Model):
    name = models.CharField(max_length=2000, unique=True)
    description = models.TextField(max_length=2000, blank=True, null=True)

    def __str__(self):
        return self.name


#<---------------------------- Project Model ------------------------------>

class Project(models.Model):
    name = models.CharField(max_length=500, unique=True)
    image = models.FileField(upload_to=MEDIA_ROOT, storage=FileSystemStorage)
    description = models.TextField(max_length=4000)
    skills = models.ManyToManyField(Skill, related_name='skills')
    link = models.TextField(max_length=500, blank=True, null=True)
    metadata = models.JSONField(null=True, blank=True)


