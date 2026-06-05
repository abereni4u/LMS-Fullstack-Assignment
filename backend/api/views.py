from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .serializers import *
from .models import *


class CourseViewset(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def get_queryset(self):
        user = self.request.user
        if getattr(user, "role", None) == "instructor":
            return Course.objects.filter(instructor=user)
        return Course.objects.all()  # students see all courses to browse/join

    def perform_create(self, serializer):
        serializer.save(instructor=self.request.user)

class ChapterViewset(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer

    def get_queryset(self):
        qs = Chapter.objects.all()
        course_id = self.request.query_params.get("course")
        if course_id:
            qs = qs.filter(course=course_id)
        # Students only see public chapters; instructors see all
        if getattr(self.request.user, "role", None) == "student":
            qs = qs.filter(is_public=True)
        return qs

class EnrollmentViewset(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer

    def get_queryset(self):
        return Enrollment.objects.filter(student=self.request.user)

    def perform_create(self, serializer):
        serializer.save(student=self.request.user)

# Get the current user's info
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    user = request.user
    return Response({
        'id': user.id,
        'username': user.username,
        'role': user.role,
    })