"use client";

//Importamos componentes y hooks necesarios para poder implementar la sección de la cámara
import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import "@/app/componentes/Transcripcion/estilostutocam.css";
import { supabase } from "@/supabase";

//Importacion para la implementacion del modelo entrenado
import { InferenceSession, Tensor } from "onnxruntime-web";

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
    descripcion:
      "Gesticula con claridad y observa el resultado en tiempo real.",
    img: "/Imagenes/Transcripcion/hombreok.png",
    alt: "Gesticulación",
  },
];

//Configuraciones
const frames = 30;
const clases = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "LL",
];

export default function Camara_Seccion() {
  //Hook para poder hacer referencia a la cámara y poder manejarla en el código
  const webcamRef = useRef<Webcam>(null);
  //Hook boolean para activar y desactivar la cámara
  const [camaraActiva, setCamaraActiva] = useState(false);
  const [dispositivos, setDispositivos] = useState<MediaDeviceInfo[]>([]);
  //Hooks para los puntos tipo Number
  const [actual, setActual] = useState(0);
  const [clave, setClave] = useState(0);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [session, setSession] = useState(false);

  //Estados y ref para el manejo del modelo
  const [transcripcion, setTranscripcion] = useState("Esperando Gestos LSE...");
  const [modeloListo, setModeloListo] = useState(false);
  const modeloIA = useRef<InferenceSession | null>(null);
  const detectorManos = useRef<any>(null);
  const memoriaPuntos = useRef<number[][]>([]);

  //Cargar el modelo onnx que esta en public/modelo
  useEffect(() => {
    async function cargarModelo() {
      try {
        modeloIA.current = await InferenceSession.create(
          "/modelo/modelo_lse_V3.onnx",
          { executionProviders: ["wasm"] },
        );

        setModeloListo(true);
        console.log("Modelo cargado");
      } catch (error) {
        console.error("Error al cargar el modelo", error);
      }
    }
    cargarModelo();
  }, []);

  //Normalización
  const normalizarPuntos = (landmarks: any) => {
    //Extraemos las listas de coordenadas horizontales (X) y verticales (Y)
    const xs = landmarks.map((p: any) => p.x);
    const ys = landmarks.map((p: any) => p.y);

    //Usamos la muñeca como el punto de anclaje
    const xMuñeca = xs[0];
    const yMuñeca = ys[0];

    //Restamos la posición de la muñeca a todos los puntos
    //Esto hace que la mano siempre nazca desde la muñeca
    const puntosCentradosX = xs.map((x: any) => x - xMuñeca);
    const puntosCentradosY = ys.map((y: any) => y - yMuñeca);

    //Medimos el tamaño de la mano (usando la distancia al nudillo del dedo corazón)
    const tamañoMano = Math.sqrt(
      puntosCentradosX[9] ** 2 + puntosCentradosY[9] ** 2,
    );

    // Si no se detecta tamaño, cancelamos para no dividir por cero
    if (tamañoMano < 1e-6) return null;

    //Creamos la lista final de 42 números que pasaran por el modelo entrenado
    const vectorFinal: number[] = [];
    for (let i = 0; i < 21; i++) {
      // Dividimos cada punto por el tamaño para que la mano siempre mida lo mismo para la IA
      vectorFinal.push(puntosCentradosX[i] / tamañoMano);
      vectorFinal.push(puntosCentradosY[i] / tamañoMano);
    }

    return vectorFinal;
  };

  //Funcion de prediccion
  const realizarPrediccion = async () => {
    //Se asegura que el modelo haya cargado o que la entrada de frames no sea menor a lo que definimos anteriormente
    if (!modeloIA.current || memoriaPuntos.current.length < frames) {
      return;
    }

    try {
      const datosAplanados = new Float32Array(memoriaPuntos.current.flat());
      const contenedor = new Tensor("float32", datosAplanados, [1, 30, 42]);

      const resultadoIA = await modeloIA.current.run({ input: contenedor });
      const predicciones = Object.values(resultadoIA)[0].data as Float32Array;

      //Se busca el indice que tenga mayor probabilidad segun el modelo entrenado
      const indiceGanador = predicciones.indexOf(
        Math.max(...Array.from(predicciones)),
      );

      //Traducimos el indice al la letra que pertenezca
      const letraTraducida = clases[indiceGanador];
      setTranscripcion(letraTraducida || "Analizando");
    } catch (error) {
      console.error("Error al intentar predecir", error);
    }
  };

  //Funcion de la integracion de mediapipe
  useEffect(() => {
    if (!modeloListo) return;

    const iniciarDetector = async () => {
      // 1. Cargamos la librería dinámicamente solo en el cliente
      const mpHands = await import("@mediapipe/hands");

      // 2. Extraemos el constructor. MediaPipe suele guardarlo en .Hands
      // o a veces Next.js lo envuelve en .default
      const HandsClass = mpHands.Hands || (mpHands as any).default?.Hands;

      if (!HandsClass) {
        console.error("No se encontró la clase Hands en el módulo");
        return;
      }

      const manos = new HandsClass({
        locateFile: (file: string) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });

      manos.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.7,
      });

      manos.onResults((resultados) => {
        if (
          resultados.multiHandLandmarks &&
          resultados.multiHandLandmarks.length > 0
        ) {
          const puntosLimpios = normalizarPuntos(
            resultados.multiHandLandmarks[0],
          );
          if (puntosLimpios) {
            if (memoriaPuntos.current.length >= frames) {
              memoriaPuntos.current.shift();
            }
            memoriaPuntos.current.push(puntosLimpios);
            realizarPrediccion();
          }
        }
      });

      detectorManos.current = manos;
    };

    iniciarDetector();
  }, [modeloListo]);

  //Bucle de captura
  useEffect(() => {
    let temporizador: NodeJS.Timeout;

    const capturarYDetectar = async () => {
      if (
        camaraActiva &&
        webcamRef.current &&
        detectorManos.current &&
        webcamRef.current.video &&
        webcamRef.current.video.readyState === 4 && 
        webcamRef.current.video.videoWidth > 0
      ) {
        // Enviamos el frame actual de la webcam al detector de MediaPipe
        await detectorManos.current.send({ image: webcamRef.current.video });
      }

      // Volvemos a llamar a esta función en 50 milisegundos
      temporizador = setTimeout(capturarYDetectar, 50);
    };

    if (camaraActiva) {
      capturarYDetectar();
    }

    return () => clearTimeout(temporizador);
  }, [camaraActiva]);

  //Hook para poder cambiar el paso cada 3 segundos y medio
  useEffect(() => {
    const intervalo = setInterval(() => {
      setActual((prev) => (prev + 1) % pasos.length);
      setClave((k) => k + 1);
    }, 3500);
    //Limpiamos el intervalo para que se vaya ejecutando perfectamente
    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, []);

  const handleDevices = useCallback((mediaDevices: MediaDeviceInfo[]) => {
    setDispositivos(mediaDevices.filter(({ kind }) => kind === "videoinput"));
  }, []);

  useEffect(() => {
    const comprobarSesion = async () => {
      //Verificamos si existe sesion
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setSession(true);
      }
    };
    comprobarSesion();
  }, []);

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
                  Camara bloqueada,
                  <br />
                  Por favor inicia sesión
                  <i className="bi bi-lock" />
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
                    deviceId: selectedDevice,
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
                  onClick={() => setCamaraActiva(!camaraActiva)}>
                  {camaraActiva ? "Desactivar Camara" : "Activar Camara"}
                </button>

                {dispositivos.length > 0 && (
                  <select
                    className="btn-cam"
                    value={selectedDevice}
                    onChange={(e) => setSelectedDevice(e.target.value)}>
                    <option value="">Seleccionar Cámara</option>
                    {dispositivos.map((device, index) => (
                      <option key={index} value={device.deviceId}>
                        {device.label || `Cámara ${index + 1}`}
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
              <div className="p-3 mt-5 d-flex flex-column justify-content-center align-items-center">
                <h2 className="text-white">{transcripcion}</h2>
                <p className="text-white">
                  {!modeloListo ? "Cargando Modelo" : "Modelo de Predicción Listo"} 
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
