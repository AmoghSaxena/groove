from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("testing", views.testing, name="testing"),
    path("cipher", views.cipherInfo, name="cipherInfo"),
    path("cipher/caeserCipher", views.caeserCipherInfo, name="caeserCipherInfo"),
    path("cipher/vigenereCipher", views.vigenereCipherInfo, name="vigenereCipherInfo"),
    path("cipher/demo/caeserCipher", views.caeserCipherDemo, name="caeserCipherDemo"),
    path("cipher/demo/vigenereCipher", views.vigenereCipherDemo, name="vigenereCipherDemo"),
    path("hash/sha256Demo", views.sha265, name="sha265"),
    path("hash/simpleHash/Demo", views.simpleHashDemo, name="simpleHashDemo"),
    path("hash", views.hashInfo, name="hashInfo"),
    path("rsa", views.rsaInfo, name="rsaInfo"),
    path("rsa/demo", views.rsaDemo, name="rsaDemo"),
    path("prng/lcg", views.prngLcgInfo, name="prngLcgInfo"),
    path("prng/lcg/demo", views.prngLcgDemo, name="prngLcgDemo"),
    path("trng/demo", views.trngDemo, name="trngDemo"),
    path("document", views.document, name="document"),
]