from django.contrib import admin
from .models import User, Course, Chapter, Enrollment

admin.site.register(User)
admin.site.register(Course)
admin.site.register(Chapter)
admin.site.register(Enrollment)
# Register your models here.
