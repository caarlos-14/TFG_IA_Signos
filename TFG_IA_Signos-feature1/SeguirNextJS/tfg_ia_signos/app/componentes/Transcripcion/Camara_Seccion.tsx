"use client";

//Importamos componentes y hooks necesarios para poder implementar la sección de la cámara
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import "@/app/componentes/Transcripcion/estilostutocam.css";

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
  //Hook para manejar el modo de la cámara | comienza en cámara trasera
  const [modoCamara, setModoCamara] = useState("environment");
  //Hook boolean para activar y desactivar la cámara
  const [camaraActiva, setCamaraActiva] = useState(false);
  //Hooks para los puntos tipo Number
  const [actual, setActual] = useState(0);
  const [clave, setClave] = useState(0);

  //Hook para poder cambiar el paso cada 3 segundos y medio
  useEffect(() => {
    const intervalo = setInterval(() => {
      setActual((prev) => (prev + 1) % pasos.length);
      setClave((k) => k + 1);
    }, 3500);
    //Limpiamos el intervalo para que se vaya ejecutando perfectamente
    return () => clearInterval(intervalo);
  }, []);

  //Actualizamos
  const paso = pasos[actual];

  return (
    <div className="cam_Page">
      <div className="container-xl py-3">

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
              {camaraActiva ? (
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
                    facingMode: modoCamara,
                  }}
                  className="webcam"
                />
              )}
            </div>

            {/* Botones integrados debajo de la cámara */}
            <div className="botones-cam d-flex flex-row gap-2 mt-3 justify-content-center justify-content-md-start w-70">
              {camaraActiva ? (
                <button
                  className="btn-cam"
                  onClick={() => setCamaraActiva(false)}
                >
                  Activar cámara
                </button>
              ) : (
                <button
                  className="btn-cam"
                  onClick={() => setCamaraActiva(true)}
                >
                  Desactivar cámara
                </button>
              )}
              <button
                className="btn-cam"
                onClick={() =>
                  setModoCamara(
                    modoCamara === "user" ? "environment" : "user"
                  )
                }
              >
                Girar cámara
              </button>
              <button
                  className="btn-cam"
                >
                  Cambiar cámara
                </button>
            </div>
          </div>

          {/* Panel de transcripción */}
          <div className="col-12 col-md-6 col-lg-6">
            <div className="contenedor-transcripcion">
              <div className="transcripcion-header">
                <span className="dot-live" />
                <h4>Transcripción en vivo</h4>
              </div>
              <p className="texto-introduccion">¡Comienza a transcribir!</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}