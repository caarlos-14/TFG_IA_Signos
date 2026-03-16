"use client"

//Importamos todos los componentes que se van a utilizar para la página principal
import ContenidoInicio from '@/app/componentes/ContenidoInicio/ContenidoInicio'
import Gestos from '@/app/componentes/Gestos/Gestos'
import Seccion2 from '@/app/componentes/segunda_seccion/Seccion2'
import Navbar from '@/app/componentes/NavBar/Navbar'
import LSE from "@/app/componentes/LSE/LSE"
//Importamos los hooks y la conexión con supabase para verificar que existe sesión
import { supabase } from '@/supabase'
import { useEffect } from 'react'
import {useRouter} from 'next/navigation'

export default function Home() {
//**Codigo sujeto a pruebas, es posible quedeba borrarse más adelante */
const router = useRouter();
useEffect(() => {
const comprobarSesion = async () =>{
  const {data: {session},error} = await supabase.auth.getSession();
if (error){
  console.error("Error al obtener la sesión:", error);
  return;
}
if(session){
  console.log("Usuario autenticado:", session.user);
}else{
  console.log("No hay usuario autenticado");
  /** 
  setTimeout(() =>{
  alert("No hay usuario registrado, redirigiendo para crear la sesión")
  },5000)


  setTimeout(() =>{
    router.push("/Registro")
  },8000)
  */
}
}

comprobarSesion();
},[]);





  return (
<>
{/*Establecemos los section para inidcar cada seccion ya que cada clase tiene su estilo
en el archivo css*/}
  <section className="seccion_inicio">
             <Navbar></Navbar>
             <ContenidoInicio/>
             <Gestos/>
  </section>
  <section id="seccion2">
    <Seccion2/>
  </section>
  <LSE></LSE>
  </>

  );
}
