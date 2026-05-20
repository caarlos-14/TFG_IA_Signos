import sys
from unittest.mock import MagicMock, patch

sys.modules['supabase'] = MagicMock()

with patch('os.getenv', return_value='http://fake-url.com'):
    from main import app

from fastapi.testclient import TestClient

client = TestClient(app)

# Payload de usuario válido reutilizable
USUARIO_VALIDO = {
    "nombre": "Jorge",
    "email": "jorge@test.com",
    "password": "Tlabaha1#"
}

class TestInsertarUsuario:

    # Registro exitoso
    def test_registro_exitoso(self):
        mock_user = MagicMock()
        mock_user.user.id = "usuario-123"
        mock_user.user.email = "jorge@test.com"

        with patch('main.supabase') as mock_supabase:
            mock_supabase.auth.sign_up.return_value = mock_user

            response = client.post("/insertar", json=USUARIO_VALIDO)

        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "success"
        assert data["message"] == "Usuario Registrado Correctamente"
        assert "user" in data

    # Longitud inválida (no debe llamar a supabase)
    def test_registro_contrasena_invalida_longitud(self):
        payload = {**USUARIO_VALIDO, "password": "corta"}

        with patch('main.supabase') as mock_supabase:
            response = client.post("/insertar", json=payload)
            mock_supabase.auth.sign_up.assert_not_called()

        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "error"
        assert data["message"] == "Número de caracteres entre 8 y 15"

    # Contraseña sin mayúscula (no llama a supabase)
    def test_registro_contrasena_sin_mayuscula(self):
        payload = {**USUARIO_VALIDO, "password": "holaafj1!"}
        response = client.post("/insertar", json=payload)
        
        assert response.status_code == 200
        assert response.json()["message"] == "Falta mayúscula"

    # Contraseña sin minúscula (no llama a supabase) 
    def test_registro_contrasena_sin_minuscula(self):
        payload = {**USUARIO_VALIDO, "password": "HOLAMUNDO1!"}
        response = client.post("/insertar", json=payload)
        
        assert response.status_code == 200
        assert response.json()["message"] == "Falta minúscula"

    # falta numero
    def test_registro_contrasena_sin_numero(self):
        payload = {**USUARIO_VALIDO, "password": "SinNumero@"}
        response = client.post("/insertar", json=payload)
        
        assert response.status_code == 200
        assert response.json()["message"] == "Falta número"

    # falta caracter especial
    def test_registro_contrasena_sin_especial(self):
        payload = {**USUARIO_VALIDO, "password": "SinEspecial1"}
        response = client.post("/insertar", json=payload)
        
        assert response.status_code == 200
        assert response.json()["message"] == "Falta carácter especial"

    # El email está duplicado, supabase tiene que lanzar una excepcion
    def test_registro_email_duplicado(self):
        with patch('main.supabase') as mock_supabase:
            mock_supabase.auth.sign_up.side_effect = Exception("Usuario ya registrado")
            response = client.post("/insertar", json=USUARIO_VALIDO)
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "error"
        assert "Usuario ya registrado" in data["message"]

    # Faltan campos (pydantic valida de forma automática)
    def test_registro_sin_email(self):
        payload = {"nombre": "Carlos", "password": "Tlabaha1#"}
        response = client.post("/insertar", json=payload)

        assert response.status_code == 422
        data = response.json()
        assert "detail" in data

    def test_registro_sin_nombre(self):
        payload = {"email": "jorge@test.com", "password": "Tlabaha1#"}
        response = client.post("/insertar", json=payload)
        
        assert response.status_code == 422
        data = response.json()
        assert "detail" in data