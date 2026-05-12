import sys
from unittest.mock import MagicMock, patch

sys.modules['supabase'] = MagicMock()

with patch('os.getenv', return_value='http://fake-url.com'):
    from main import app

from fastapi.testclient import TestClient

client = TestClient(app)

class TestInicioSesion:

    # Credenciales correctas y login exitoso
    def test_login_credenciales_correctas(self):
        mock_user = MagicMock()
        mock_user.user = {"id": "jorge2005", "email": "pruebinha@gmail.com"}
        mock_user.session = {"access_token": "token_fake"}

        with patch('main.supabase') as mock_supabase:
            mock_supabase.auth.sign_in_with_password.return_value = mock_user

            response = client.post("/login", json={
                "email": "pruebinha@gmail.com",
                "password": "Inci252atk@"
            })

        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "success"
        assert "user" in data
        assert "session" in data

    # Credenciales incorrectas y excepción capturada
    def test_login_credenciales_incorrectas(self):
        with patch('main.supabase') as mock_supabase:
            mock_supabase.auth.sign_in_with_password.side_effect = Exception("Credenciales incorrectas")

            response = client.post("/login", json={
                "email": "correomalo@gmail.com",
                "password": "Todomal1|"
            })

        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "error"

    # Payload incompleto (falta la contraseña)
    def test_login_payload_incompleto(self):
        response = client.post("/login", json={
            "email": "pruebinha@gmail.com"
        })
        assert response.status_code == 422

    # Email con formato inválido que da error de supabase
    def test_login_email_formato_invalido(self):
        with patch('main.supabase') as mock_supabase:
            mock_supabase.auth.sign_in_with_password.side_effect = Exception("Formato de correo inválido")

            response = client.post("/login", json={
                "email": "esto como se ve no es un email",
                "password": "Inci252atk@"
            })

        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "error"

    # Email vacío y error de supabase
    def test_login_email_vacio(self):
        with patch('main.supabase') as mock_supabase:
            mock_supabase.auth.sign_in_with_password.side_effect = Exception("Email inválido")

            response = client.post("/login", json={
                "email": "",
                "password": "Mirodilla2@"
            })

        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "error"

    # Password vacía y error de supabase
    def test_login_contrasena_vacia(self):
        with patch('main.supabase') as mock_supabase:
            mock_supabase.auth.sign_in_with_password.side_effect = Exception("Contraseña vacía")

            response = client.post("/login", json={
                "email": "holajesus@gmail.com",
                "password": ""
            })

        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "error"