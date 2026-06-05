from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = [
        ("instructor", "Instructor"),
        ("student", "Student"),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

class Course(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    instructor = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="courses",
    )

    def __str__(self):
        return self.title
    

class Chapter(models.Model):
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="chapters",
    )
    title = models.CharField(max_length=255)
    content = models.JSONField(default=dict, blank=True)
    is_public = models.BooleanField(default=False)

    def __str__(self):
        return self.title
    
class Enrollment(models.Model):
    student = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="enrollments",
    )
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="enrollments",
    )

    class Meta:
        unique_together = ("student", "course")

    def __str__(self):
        return f"{self.student.username} -> {self.course.title}"