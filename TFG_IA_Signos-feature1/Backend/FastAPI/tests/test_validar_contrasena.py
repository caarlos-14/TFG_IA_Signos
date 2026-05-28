import sys
from unittest.mock import MagicMock, patch

sys.modules['supabase'] = MagicMock()

with patch('os.getenv', return_value='http://fake-url.com'):
    from main import validar_password

class TestValidarContrasena:

    #Caso correcto
    def test_contrasena_valida(self):
        resultado = validar_password("Contrasegura1@")
        assert resultado == False
    
    #Longitudes erróneas
    def test_contrasena_muy_corta(self):
        resultado = validar_password("fa1.")
        assert resultado == "Número de caracteres entre 8 y 15"
    
    def test_contrasena_muy_larga(self):
        resultado = validar_password("Abcdefgh123456789!")
        assert resultado == "Número de caracteres entre 8 y 15"
    
    #Longitudes exactas
    def test_contrasena_minima_exacta(self):
        resultado = validar_password("fAjctr7m-")
        assert resultado == False

    def test_contrasena_maxima_exacta(self):
        resultado = validar_password("Ahfksnrfodn12!.")
        assert resultado == False
    
    #Sin mayúscula
    def test_contrasena_sin_mayuscula(self):
        resultado = validar_password("blablabla1.")
        assert resultado == "Falta mayúscula"
    #Sin minúscula
    def test_contrasena_sin_minuscula(self):
        resultado = validar_password("SEGURA1!")
        assert resultado == "Falta minúscula"
    
    #Sin número 
    def test_contrasena_sin_numero(self):
        resultado = validar_password("Spiderman#")
        assert resultado == "Falta número"
    
    #Sin carácter especial
    def test_contrasena_sin_caracter(self):
        resultado = validar_password("Pikachu22")
        assert resultado == "Falta carácter especial"


