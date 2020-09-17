from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.views import View

# Create your views here.


def home(request):
    
    context = {
        'title': 'Roman BARON Resume'
    }
    return render(request, 'resume/index.html', context)

@require_http_methods(['POST'])
def sendEmail(request):
    pass