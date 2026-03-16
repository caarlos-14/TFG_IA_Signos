"use client"

//Importamos el css del componente
import "@/app/componentes/Registro/registro.css"
import {useState,useEffect} from "react"
import {useRouter} from "next/navigation"
import Image from "next/image"
import { supabase } from "@/supabase";

const Registro = () =>{

const [activo,setActivo] = useState(false);

useEffect(() =>{
    const comprobarSesion = async () => {
        const {data:{session}} = await supabase.auth.getSession();
    
        if(session){
            setActivo(true);
        }
        
    }
    comprobarSesion();
    })

/*Hooks para manejar los estados de cada campo del formulario de registro*/
    const [email,setEmail] = useState<string>("");
    const [password,setPasswd] = useState<string>("");
    const [nombre,setNombre] = useState<string>("");
    const [mensaje,setMensaje] = useState<string>("");
    const [mensajeTipo,setMensajeTipo] = useState<"success" | "danger" | "warning">("warning");
    const router = useRouter();


async function sesionGoogle(){
try{
    const {error} = await supabase.auth.signInWithOAuth({
        provider:"google",
        options:{
            redirectTo:"http://localhost:3000/"
        }
    });
    if(error) throw error;
}catch(error){
    setMensajeTipo("danger")
    setMensaje("Error al iniciar sesión con Google");
}
}


const validarCampos = (password:string):boolean =>{

    if(password.trim() === "" || email.trim() === ""){
        setMensajeTipo("danger");
        setMensaje("Los campos email y contraseña son obligatorios");
        return false;
    }

    if(password.length < 8 || password.length > 15){
        setMensajeTipo("warning")
        setMensaje("Numero de caracteres entre 8 y 15");
        return false;
    }
    
    if(!/[A-Z]/.test(password)){
        setMensajeTipo("warning")
        setMensaje("Falta mayúscula");
        return false;
    }
    
    if(!/[a-z]/.test(password)){
        setMensajeTipo("warning")
        setMensaje("Falta minúscula");
        return false;
    }
    
    if(!/[0-9]/.test(password)){
        setMensajeTipo("warning")
        setMensaje("Falta número");
        return false;

    }if(!/[^A-Za-z0-9]/.test(password)){
        setMensajeTipo("warning")
        setMensaje("Falta caracter especial ");
        return false;
    }
    
        setMensaje("");
        return true;
    
}

const registrarUsuario = async (e: any) =>{
    e.preventDefault();
    
    const datos = {
        nombre:nombre,
        email:email,
        password:password,
    }

        if(!validarCampos(password)) return;
        
        try{
            const response = await fetch("http://localhost:8000/insertar",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(datos)
            })

            const data = await response.json();
            /**Indicamos la acción que va a realizar si el estado de la conexión es exitoso */
            if(data.status === "success"){
                setTimeout(() =>{
                router.push("/Login");
                },2000);
                setMensajeTipo("success")
                setMensaje(data.message);
            /**En caso contrario indicamos mensaje de error */
            }else{
                setMensajeTipo("warning")
                setMensaje(data.message);
            }
            /**Manejamos el error e indicamos mensaje de error */
            }catch(error){
                setMensajeTipo("danger")
                setMensaje("Error al registrar el usuario");
            }

        }



    return(
        <div className="container-fluid p-0">
            <div className="row g-0">
               <div className="imagenes_registro col-12 col-md-12 col-lg-6 order-2 ">
                    <Image src="/Imagenes/Seccion_Registro/inicio.jpg" alt="Imagen de registro" width={500} height={500} className="img-fluid imagen_registro "/>
                    
                    <div className="parte_superior">
                    {activo && 
                    <a href="/" className="volver">Volver al inicio</a>
                    }
                    <Image src="/Imagenes/Seccion_Inicio/logo_blanco.png" alt="Logo Amadeus" width={200} height={220} className="img-fluid logo_registro"/>
                    </div>
                    
                </div> 
                <div className="registro_seccion col-12 col-md-12 col-lg-6">
                <form className="formulario col-12 col-md-8 order-1 " onSubmit={registrarUsuario}>
                    <h1>Crea una cuenta</h1>

                    <p>¿Ya tienes cuenta?<a href="/Login">Inicia sesión</a></p>

                    <input type="text" className="col-10 col-md-10" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
                    <input type="email" className="col-10 col-md-10" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" className="col-10 col-md-10" placeholder="Contraseña" value={password} onChange={(e) => setPasswd(e.target.value)}/>

                    <button type="submit" className="col-10 col-md-10">Registrarse</button>
                    {mensaje && <p className={`mensaje alert alert-${mensajeTipo}`}>{mensaje}</p>}

                    <hr className="col-10 col-md-10 border-light"/>

                    <button type="button" onClick={sesionGoogle} className="col-10 col-md-10"><Image src="/Imagenes/Seccion_Registro/google.svg" className="me-2" alt="Google" width={20} height={20}/>Accede con google</button>
                </form>
                </div>
            </div>
        </div>
   
    )
}
export default Registro