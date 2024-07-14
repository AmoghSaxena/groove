from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.



def testing(request):
    return render(request, 'tmp.html')


def document(request):
    # return HttpResponse("Hello, world. You're at the polls index.")
    return render(request, 'pages-misc-under-maintenance.html')

def index(request):
    # return HttpResponse("Hello, world. You're at the polls index.")
    return render(request, 'rsa/rsaDemo.html')

def custom_404(request, exception):
    return render(request, '404.html', status=404)

def hashInfo(request):
    # return HttpResponse("Hello, world. You're at the polls index.")
    return render(request, 'hash/hashInfo.html')

def cipherInfo(request):
    # return HttpResponse("Hello, world. You're at the polls index.")
    return render(request, 'cipher/cipherInfo.html')

def caeserCipherInfo(request):
    # return HttpResponse("Hello, world. You're at the polls index.")
    return render(request, 'cipher/caeserCipher.html')

def vigenereCipherInfo(request):
    # return HttpResponse("Hello, world. You're at the polls index.")
    return render(request, 'cipher/vigenereCipher.html')

def caeserCipherDemo(request):
    # return HttpResponse("Hello, world. You're at the polls index.")
    return render(request, 'cipher/caeserDemo.html')

def vigenereCipherDemo(request):
    return render(request, 'cipher/vigenereDemo.html')

def sha265(request):
    # return HttpResponse("Hello, world. You're at the polls index.")
    return render(request, 'hash/sha256.html')

def simpleHashDemo(request):
    # return HttpResponse("Hello, world. You're at the polls index.")
    return render(request, 'hash/simpleHashDemo.html')

def rsaDemo(request):
    # return HttpResponse("Hello, world. You're at the polls index.")
    return render(request, 'rsa/rsaDemo.html')

def rsaInfo(request):
    # return HttpResponse("Hello, world. You're at the polls index.")
    return render(request, 'rsa/rsaInfo.html')

def prngLcgInfo(request):
    # return HttpResponse("Hello, world. You're at the polls index.")
    return render(request, 'prng/prngLcgInfo.html')

def prngLcgDemo(request):
    # return HttpResponse("Hello, world. You're at the polls index.")
    return render(request, 'prng/prngLcgDemo.html')

def trngDemo(request):
    # return HttpResponse("Hello, world. You're at the polls index.")
    return render(request, 'trng/trngDemo.html')