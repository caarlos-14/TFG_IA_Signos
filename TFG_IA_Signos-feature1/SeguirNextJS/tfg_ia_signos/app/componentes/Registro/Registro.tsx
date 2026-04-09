"use client"

//Importamos el css del componente
import "@/app/componentes/Registro/registro.css"
import {useState,useEffect} from "react"
import {useRouter} from "next/navigation"
import Image from "next/image"
import { supabase } from "@/supabase";

//UseEffect para verificar en todo momento si hay una sesion activa
const Registro = () =>{
useEffect(() =>{
    //Desestructuracion para extraer la informacion de sesion
    const comprobarSesion = async () => {
        const {data:{session}} = await supabase.auth.getSession();
        //Si existe sesion, activa el estado
        if(session){
            setActivo(true);
        }   
    }
    comprobarSesion();
},[])

/*Hooks para manejar los estados de cada campo del formulario de registro*/
    const [email,setEmail] = useState<string>("");
    const [password,setPasswd] = useState<string>("");
    const [nombre,setNombre] = useState<string>("");
//Hooks para manejar el mensaje que aparezca de aviso al usuario
    const [mensaje,setMensaje] = useState<string>("");
    const [mensajeTipo,setMensajeTipo] = useState<"success" | "danger" | "warning">("warning");
//Hook para redirigir al usuario
    const router = useRouter();
//Hook para comprobar sesion
    const [activo,setActivo] = useState(false);

//Funcion para iniciar sesion con google
async function sesionGoogle(){

    //Iniciar sesion y redirigir a la raiz del proyecto
    const {error} = await supabase.auth.signInWithOAuth({
        provider:"google",
        options:{
            redirectTo:"http://tfg-amadeus.carlos-sanchez.dev"
        }
    });
    
    //Manejando el error si no se pudo conectar
    if(error){
    setMensajeTipo("danger")
    setMensaje("Error al iniciar sesión con Google");
    }
}

//Funcion para validar los campos del registro antes de enviar al servidor
const validarCampos = (password:string):boolean =>{

    //Condicional para validar que el usuario rellena los campos
    if(password.trim() === "" || nombre.trim() === ""){
        setMensajeTipo("danger");
        setMensaje("Los campos de nombre y contraseña son obligatorios");
        return false;
    }

    //Condicional para validar el largo de la contraseña
    if(password.length < 8 || password.length > 15){
        setMensajeTipo("warning")
        setMensaje("Numero de caracteres entre 8 y 15");
        return false;
    }
    
    //Condicional para validar la contraseña
    if(!/[A-Z]/.test(password)){
        setMensajeTipo("warning")
        setMensaje("Falta mayúscula");
        return false;
    }
    
    //Condicional para validar la contraseña
    if(!/[a-z]/.test(password)){
        setMensajeTipo("warning")
        setMensaje("Falta minúscula");
        return false;
    }
    
    //Condicional para validar la contraseña
    if(!/[0-9]/.test(password)){
        setMensajeTipo("warning")
        setMensaje("Falta número");
        return false;

    //Condicional para validar la contraseña
    }if(!/[^A-Za-z0-9]/.test(password)){
        setMensajeTipo("warning")
        setMensaje("Falta caracter especial ");
        return false;
    }
        setMensaje("");
        return true;
}

const registrarUsuario = async (e: any) =>{
    //Evitamos la recarga del formulario
    e.preventDefault();
    
    //Creamos un array con los datos a enviar
    const datos = {nombre:nombre,email:email,password:password}

    //Detenemos la funcion si uno de los condicionales no se cumple
    if(!validarCampos(password)) return;
        
    {/*Enviamos los datos a la direccion indicada junto al fetch*/}
        try{
            const response = await fetch("https://tfg-amadeus.carlos-sanchez.dev/insertar",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(datos)
            })

            const {status,message} = await response.json();
            /**Indicamos la acción que va a realizar si el estado de la conexión es exitoso */
            if(status === "success"){
                setTimeout(() =>{
                router.push("/Login");
                },2000);
                setMensajeTipo("success")
                setMensaje(message);
            /**En caso contrario indicamos mensaje de error */
            }else{
                setMensajeTipo("warning")
                setMensaje(message);
            }
            /**Manejamos el error e indicamos mensaje de error */
            }catch(error){
                setMensajeTipo("danger")
                setMensaje("Error al registrar el usuario");
            }
        }



    return(
        <div className="container-fluid p-0">
            {/*Contenedor de ancho completo con padding:0*/}
            <div className="row g-0">
                {/*Div de la imagen en la parte derecha cambiado de orden (order-2)
                Con col-12 en movil y pantalla media >= 768px
                Con col-lg-6 >=992px
                */}
               <div className="imagenes_registro col-12 col-md-12 col-lg-6 order-2 ">
                    <Image src="/Imagenes/Seccion_Registro/inicio.jpg" alt="Imagen de registro" width={500} height={500} className="img-fluid imagen_registro "/>
                    
                    {/*Condicion para si no esta registrado no salga la opcion de volver inicio
                    pero si salga el logo*/}
                    <div className="parte_superior">
                    {activo && 
                    <a href="/" className="volver">Volver al inicio</a>
                    }
                    <Image src="/Imagenes/Seccion_Inicio/logo_blanco.png" alt="Logo Amadeus" width={200} height={220} className="img-fluid logo_registro"/>
                    </div>
                    
                </div> 
                {/*Div del contenedor de registro
                Con col-12 en movil y pantalla media >= 768px
                Con col-lg-6 >=992px
                */}
                <div className="registro_seccion col-12 col-md-12 col-lg-6">
                {/*Asignamos al formulario la funcion de registrar usuario y ponemos order-1*/}
                <form className="formulario col-12 col-md-8 order-1 " onSubmit={registrarUsuario}>
                    <h1>Crea una cuenta</h1>

                    <p>¿Ya tienes cuenta?&nbsp;<a className="text-decoration-none" href="/Login">Inicia sesión</a></p>
                    {/*Campos del formulario para registrarse y cada campo se le asigna su valor actual
                    a su hook correspondiente*/}
                    <input type="text" className="col-10 col-md-10" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
                    <input type="email" className="col-10 col-md-10" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" className="col-10 col-md-10" placeholder="Contraseña" value={password} onChange={(e) => setPasswd(e.target.value)}/>

                    <button type="submit" className="col-10 col-md-10">Registrarse</button>
                    {mensaje && <p className={`mensaje alert alert-${mensajeTipo}`}>{mensaje}</p>}

                    {/*Linea de separacion*/}
                    <hr className="col-10 col-md-10 border-light"/>

                    {/*Boton para iniciar sesion con google al cual le indicamos la funcion*/}
                    <button type="button" onClick={sesionGoogle} className="col-10 col-md-10"><Image src="/Imagenes/Seccion_Registro/google.svg" className="me-2" alt="Google" width={20} height={20}/>Accede con google</button>
                </form>
                </div>
            </div>
        </div>
   
    )
}
export default Registro