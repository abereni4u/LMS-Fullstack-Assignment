from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAuthenticated
from .serializers import *
from .models import *
from rest_framework.response import Response

class CourseViewset(viewsets.ViewSet):
    permissions = [IsAuthenticated]
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def list(self, request):
        queryset = Course.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
# Create your views here.
