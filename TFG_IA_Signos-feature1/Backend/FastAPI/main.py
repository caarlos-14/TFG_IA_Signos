from fastapi import FastAPI
from supabase import create_client, Client
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from passlib.context import CryptContext
import re

app = FastAPI() 

pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")
#Modelo de datos para el usuario
class Usuario_Registro(BaseModel):
    nombre:str
    email:str
    password:str

def validar_password(password):

    if len(password) < 8 or len(password) > 15:
        return "Numero de caracteres entre 8 y 15"

    if not re.search(r"[A-Z]",password):
        return "Falta mayuscula"
    
    if not re.search(r"[a-z]",password):
        return "Falta minúscula"
    
    if not re.search(r"[0-9]",password):
        return "Falta número"
    
    if not re.search(r"[^A-Z-a-z-0-9]",password):
        return "Falta mayuscula"
    
    return False



# Configuración de CORS para permitir solicitudes desde el frontend
origins = [
    "http://localhost:3000",
    "https://lpgdlmjx-3000.uks1.devtunnels.ms/"
]

# Agregar middleware de CORS a la aplicación FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True
)
# Configuración de Supabase
url = ""
key = ""

# Crear cliente de Supabase
supabase: Client = create_client(url, key)

# Endpoint para insertar datos en la tabla "Usuario"
@app.post("/insertar")
def insertar_datos(usuario:Usuario_Registro):

    validacion = validar_password(usuario.password)

    if validacion:
        return {"status":"error","message":validacion}

    #Creamos dos variables para verificar que exista el email o el usuario o las dos
    existe = supabase.table("Usuario").select("*").eq("nombre",usuario.nombre).execute()
    existe_email = supabase.table("Usuario").select("*").eq("email",usuario.email).execute()

    #Condiconales de mensaje desde el backend de la aplicación
    if existe.data:return {"message":"Usuario ya existe"}
    if existe_email.data:return {"message":"Email ya registrado"}
    
    try:
        data = {
        "nombre":usuario.nombre,
        "email":usuario.email,
        "password": pwd_context.hash(usuario.password[:72])
        }   
            
        supabase.table("Usuario").insert(data).execute()
        return {"status":"success", "message":"Usuario registrado correctamente"}
    except Exception as e:
        return {"status":"error", "message":str(e)}
    




class Usuario_Login(BaseModel):
    usuario: str
    password: str

@app.post("/login")
async def login(usuario: Usuario_Login):
    try:
        resultado = supabase.table("Usuario").select("*").eq("nombre", usuario.usuario).execute()

        if not resultado.data:
            return {"success": False, "message": "Usuario no encontrado"}

        user = resultado.data[0]

        if user["password"] != usuario.password:
            return {"success": False, "message": "Contraseña incorrecta"}

        return {
            "message": "Inicio de sesión exitoso"
        }

    except Exception as e:
        return {"success": False, "message": f"Error del servidor: {str(e)}"}
