from django.db import models

# Create your models here.

class Email(models.Model):
    email_sender = models.CharField(max_length = 200)
    subject = models.CharField(max_length = 500)
    message = models.TextField()
    date_sent = models.DateField(auto_now = True)

    def __str__(self):
        return self.email_sender