"use client";

//Importamos componentes y hooks necesarios para poder implementar la sección de la cámara
import Image from "next/image";
import { useRef, useState, useEffect,useCallback } from "react";
import Webcam from "react-webcam";
import "@/app/componentes/Transcripcion/estilostutocam.css";
import {supabase} from "@/supabase"

/*Array de objetos para iterar sobre ellos y mostrar los pasos por:
-Titulo
-descripción
-imagen
-texto alternativo
*/
const pasos = [
  {
    titulo: "Paso 1: ¡Activa la cámara!",
    descripcion: "Acepta el uso de la cámara en tu navegador para comenzar.",
    img: "/Imagenes/Transcripcion/activacam.png",
    alt: "Cámara",
  },
  {
    titulo: "Paso 2: ¡Ponte frente a la cámara!",
    descripcion: "Colócate en una zona bien iluminada y centrada.",
    img: "/Imagenes/Transcripcion/frentecamara.png",
    alt: "Activar Cámara",
  },
  {
    titulo: "Paso 3: ¡Transcribe!",
    descripcion: "Gesticula con claridad y observa el resultado en tiempo real.",
    img: "/Imagenes/Transcripcion/hombreok.png",
    alt: "Gesticulación",
  },
];




export default function Camara_Seccion() {

  //Hook para poder hacer referencia a la cámara y poder manejarla en el código
  const webcamRef = useRef<Webcam>(null);
  //Hook boolean para activar y desactivar la cámara
  const [camaraActiva, setCamaraActiva] = useState(false);
  const [dispositivos,setDispositivos] = useState<MediaDeviceInfo[]>([])
  //Hooks para los puntos tipo Number
  const [actual, setActual] = useState(0);
  const [clave, setClave] = useState(0);
  const [selectedDevice,setSelectedDevice] = useState("")
  const [session, setSession] = useState(false);


  //Hook para poder cambiar el paso cada 3 segundos y medio
  useEffect(() => {
    const intervalo = setInterval(() => {
      setActual((prev) => (prev + 1) % pasos.length);
      setClave((k) => k + 1);
    }, 3500);
    //Limpiamos el intervalo para que se vaya ejecutando perfectamente
    return () => clearInterval(intervalo);
  }, []);

  useEffect(() =>{
    navigator.mediaDevices.enumerateDevices().then(handleDevices)
  },[])

  const handleDevices = useCallback((mediaDevices:MediaDeviceInfo[]) =>{
    setDispositivos(mediaDevices.filter(({kind}) => kind === "videoinput"))
  },[])

 useEffect(() =>{
    const comprobarSesion = async () =>{
        //Verificamos si existe sesion
        const {data:{session}} = await supabase.auth.getSession();

        if(session){
          setSession(true);
        }
    }
    comprobarSesion();    
},[]);

  //Actualizamos
  const paso = pasos[actual];

  return (
    <div className="cam_Page">
      <div className="container-fluid py-3">

        {/* Tutorial carousel */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="tutorial">
              <div className="tutorial_card" key={clave}>
                <div className="texto_tuto">
                <h3>{paso.titulo}</h3>
                <p>{paso.descripcion}</p>
                </div>
                <Image src={paso.img} alt={paso.alt} width={180} height={180} />
              </div>
              <div className="tutorial_dots mt-2">
                {pasos.map((_, i) => (
                  <span key={i} className={i === actual ? "active" : ""} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/*Cámara + Transcripción*/}
        <div className="row align-items-start g-4 justify-content-center">
          {/* Webcam */}
          <div className="col-12 col-md-6 col-lg-6">
            <div className="webcam-wrapper">
              {!session ? (
                <div className="cam-bloqueada text-center">
                  Camara bloqueada,<br/>Por favor inicia sesión
                  <i className="bi bi-lock"/>
                </div>
              ) : !camaraActiva ? (
                <div className="cam-off">
                  <p>Cámara desactivada</p>
                </div>
              ) : (
              
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  mirrored={true}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{
                    deviceId:selectedDevice
                  }}
                  className="webcam"
                />
              )}
            </div>

            {/* Botones integrados debajo de la cámara */}
            {session && (
            <div className="botones-cam d-flex flex-wrap flex-md-nowrap flex-row gap-2 mt-1 justify-content-center">
                <button
                  className="btn-cam"
                  onClick={() => setCamaraActiva(!camaraActiva)}
                >
                  {camaraActiva ? "Desactivar Camara":"Activar Camara"}
                </button>
             
              {dispositivos.length > 0 && (
                <select className="btn-cam" value={selectedDevice}onChange={(e) => setSelectedDevice(e.target.value)}>
                <option value="">Seleccionar Cámara</option>
                {dispositivos.map((device,index) => (
                  <option key={index} value={device.deviceId}>
                    {device.label || `Cámara ${index+1}`}
                  </option>
                ))}
                </select>
              )}
            </div>
            )}
          </div>

          {/* Panel de transcripción */}
          <div className="col-12 col-md-6 col-lg-6">
            <div className="contenedor-transcripcion">
              <div className="transcripcion-header">
                <span className="dot-live" />
                <h4>Transcripción en vivo</h4>
              </div>
              <p className="d-none d-sm-block texto-introduccion">¡Comienza a transcribir!</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}