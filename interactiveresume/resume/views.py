from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.core.mail import send_mail, BadHeaderError
from django.views import View
from config.settings import DEFAULT_FROM_EMAIL as default_email

from .models import *

import json

# Create your views here.


def home(request):
    
    context = {
        'title': 'Roman BARON Resume'
    }
    return render(request, 'resume/index.html', context)

@require_http_methods(['POST'])
def contact(request):
    data = request.POST
    print(data)

    from_email = data['email-address']
    subject = data['email-subject']
    message = data['email-message']

    print(from_email)


    #save in db
    Email.objects.create(email_sender = from_email, subject = subject, message = message)

    final_message = 'Message from ' + from_email + '\n' + message

    try:
        send_mail(subject, final_message, default_email, ['rbaronpro@gmail.com'], fail_silently=False)
        print('email sent!')
    except BadHeaderError:
        pass


    response_data = {
        'success' : True,
        'done': True
    }

    return HttpResponse(
                json.dumps(response_data),
                content_type="application/json"
            )