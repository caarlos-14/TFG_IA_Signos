from fastapi import FastAPI
from supabase import create_client, Client
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import re
import os
from dotenv import load_dotenv

app = FastAPI() 

#Modelo de datos para el usuario
class Usuario_Registro(BaseModel):
    nombre:str
    email:str
    password:str


def validar_password(password):

    if len(password) < 8 or len(password) > 15:
        return "Número de caracteres entre 8 y 15"

    if not re.search(r"[A-Z]",password):
        return "Falta mayúscula"
    
    if not re.search(r"[a-z]",password):
        return "Falta minúscula"
    
    if not re.search(r"[0-9]",password):
        return "Falta número"
    
    if not re.search(r"[^A-Za-z0-9]",password):
        return "Falta carácter especial"
    
    return False

# Configuración de CORS para permitir solicitudes desde el frontend
origins = [
    "http://localhost:3000",
    "https://tfg-amadeus.carlos-sanchez.dev",
    "https://api.carlos-sanchez.dev"
]

# Agregar middleware de CORS a la aplicación FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True
)

load_dotenv()
# Configuración de Supabase
url = os.getenv("SUPABASE_URL")
key = os.getenv("SERVICE_ROLE_SUPABASE_KEY")

# Crear cliente de Supabase
supabase: Client = create_client(url, key)

# Endpoint para insertar datos en la tabla "Usuario"
@app.post("/insertar")
def insertar_datos(usuario:Usuario_Registro):

    validacion = validar_password(usuario.password)
    if validacion:
        return {"status":"error","message":validacion}

    user = supabase.auth.sign_up({
        "email":usuario.email,
        "password":usuario.password,
        "options":{
            "data":{
               "nombre":usuario.nombre
            }
        }
        })
    return {"status":"success","message":"Usuario Registrado Correctamente","user":user} 

class Usuario_Login(BaseModel):
    email: str
    password: str

@app.post("/login")
async def login(usuario: Usuario_Login):
    try:
        user = supabase.auth.sign_in_with_password({"email":usuario.email,"password":usuario.password})
        return {"status":"success","user":user.user,"session":user.session}
         
    except Exception as e:
        return {"status": "error", "message": ""}
