"use client"

import {useState} from 'react'
import "./Parte1.css"
import Image from 'next/image';
const Parte1 = () =>{ 

const [indice,setIndice] = useState(0);

const imagenes = [
    {foto40:"1KsRwaDfmouKGtII-nZ3N9FhSaMsEFwv4"},

]


const slide = [
    {
        titulo1: `¿Cuál es `,
        titulo1_span:"nuestra visión ",
        titulo1_parte2:"acerca de este proyecto?",
        texto1:"Ser referencia líder en herramientas de transcripción y comunicación asistida eliminando barreras y conectando con los usuarios.",
        imagen:`/Imagenes/Seccion_Inicio/logo_blanco.png`,
        titulo2:"Nuestros principales",
        titulo2_span:" valores",
        valores:["Innovación","Inclusión","Precisión","Colaboración","Compromiso con la accesibilidad"]
    },
    {
        titulo1:`¿Dónde nace `,
        titulo1_span:"Amadeus?",
        texto1:`Somos una iniciativa dedicada a la creación de soluciones basadas en`,
        texto1_parte2:"y enfocados a derribar la barrera de comunicación entre todas las personas",
        texto1_strong:"inteligencia artificial(IA),",
        imagen:`/Imagenes/Seccion_Inicio/logo_blanco.png`,
        titulo2:`¿Cuál es `,
        titulo2_span:"nuestro Objetivo?",
        texto2:`Nuestro objetivo es desarrollar herramientas de transcripción automatizada que permitan agilizar el trabajo de los usuarios y
                    poder garantizar esa precisión a la hora de transcribir sus gestos.`
    }
]

return(
    <>
    <div className="container-fluid d-flex justify-content-center p-0 min-vh-90 mb-4">
        <div className="row seccion-quienes-somos">
            
            <a className="btn_flecha_izqda" onClick={() => setIndice((prev) => (prev + 1) % slide.length)}>
                <i className="bi bi-caret-left fs-1"></i>
            </a>
            <a className="btn_flecha_dcha" onClick={() => setIndice((prev) => (prev - 1 + slide.length) % slide.length)}>
                <i className="bi bi-caret-right fs-1"></i>
            </a>
        
            <div className="col-10 col-md-6 parte1_texto ">
                <h3>{slide[indice].titulo1}<span className="destacado">{slide[indice].titulo1_span}</span>{slide[indice].titulo1_parte2}</h3>
                <p>{slide[indice].texto1}<strong> {slide[indice].texto1_strong}</strong> 
                {slide[indice].texto1_parte2}
                </p>
            </div>
            <div className="col-10 col-md-5">
                <Image 
                alt="Logo Pagina"
                width={300}
                height={300}
                className="img-fluid"
                src={slide[indice].imagen}/>
            </div>
            <div className="col-12 objetivo">
                <h3>{slide[indice].titulo2}<span className="destacado">{slide[indice].titulo2_span}</span></h3>
                {slide[indice].texto2 && <p>{slide[indice].texto2}</p> }
                    
               {slide[indice].valores &&
                <ul>
                {slide[indice].valores.map((valor,i) =>(
                    <li key={i}>{valor}</li>
                ))}
                </ul>
               }
            </div>
    </div>
    </div>
<div className="container-fluid seccion_nosotros ">
    <div className="row justify-content-around align-items-center min-vh-100">
        <div className="titulo_seccion_nosotros text-center"><h2>Nuestro Equipo de Desarrollo</h2></div>
        <div className="col-12 col-md-4 developer">
            <h3 className="fw-bold fs-4">Desarrollador</h3>
            <div className="foto_container">
                <Image 
                    src="/Imagenes/Quienes_Somos/Imagenes/Desarrolladores/carlos_desarrollador.png"
                    alt="Imagen Carlos"
                    width={200}
                    height={200}
                    className="imagen_dev"
                />
            </div>
            <h5 className="mt-1">Carlos Sánchez</h5>
            <div className="descripcion">
                <p><strong>Miembro de Amadeus</strong></p>
            </div>
        </div>
        <div className="col-12 col-md-4 developer">
            <h3 className="fw-bold fs-4">Desarrollador</h3>
            <div className="foto_container">
                <Image 
                    src="/Imagenes/Quienes_Somos/Imagenes/Desarrolladores/Sebas_desarrollador.png"
                    alt="Imagen Carlos"
                    width={200}
                    height={200}
                    className="imagen_dev"
                />
            </div>
          <h5 className="mt-1">Angel Sebastián</h5>
            <div className="descripcion">
                <p><strong>Miembro de Amadeus</strong></p>
            </div>
        </div>
        <div className="col-12 col-md-4 developer">
            <h3 className="fw-bold fs-4">Desarrollador</h3>
            <div className="foto_container">
                <Image 
                    src="/Imagenes/Quienes_Somos/Imagenes/Desarrolladores/Jorge_desarrollador.png"
                    alt="Imagen Jorge"
                    width={180}
                    height={180}
                    className="imagen_dev"
                />
            </div>
            <h5 className="mt-1">Jorge Valverde</h5>
            <div className="descripcion">
                <p><strong>Miembro de Amadeus</strong></p>
            </div>
        </div>
        </div>
    </div>   



 <div className="container-fluid seccion-odiseIA min-vh-100 ">
        <div className="row d-flex align-items-center justify-content-center pb-5 py-5">
             <div className="col-12 col-md-6 col-lg-3 d-flex justify-content-center">
                <Image
                    src="/Imagenes/Quienes_Somos/Imagenes/odiseIA/odiseIA.png"
                    alt="Logo OdiseIA"
                    width={200}
                    height={500}
                />
            </div>  
            <div className="col-12 col-md-6 col-lg-9 text-center d-flex justify-content-center">
                <h2>OdiseIA | Observatorio del Impacto Social y Ético de la IA</h2>
            </div> 
        </div>
        {/* Contenedor del texto e imagen del premio */}
        <div className="row justify-content-center align-items-center card-odisea mb-5 px-4 gap-4">
            <div className="col-12 col-md-12 col-lg-5">
                <div className="col-12 titulo_seccion_nosotros">
                <h2>3er Puesto Hackaton OdiseIA</h2>
                </div>
                <p className="descripcion-odisea">
                    Al ver el potencial de nuestro proyecto, decidimos entrar al Hackaton de OdiseIA, un hackaton que como 
                    dice su nombre, busca en la inteligencia artificial formas para ayudar a gente que posea alguna discapacidad
                    u otro problema a solucionarlo. Amadeus, al proporcionar visibilidad y cercanía a la gente que posee dificultades
                    auditivas, vimos la oportunidad de hacer visible nuestro proyecto, que al final quedó en tercera posición con
                    el premio de poder mostrarlo a la empresa.
                </p>
            </div>
            <div className="col-12 col-md-12 col-lg-5 d-flex justify-content-center">
                <Image
                    src="/Imagenes/Quienes_Somos/Imagenes/odiseIA/tercero.png"
                    alt="Imagen Ganadores"
                    width={500}
                    height={600}
                    className="imagen_hackaton imagen_hackaton--principal"
                />
            </div>
        </div>

        {/* Contenedor de imagenes */}
        <div className="row row-cols-2 row-cols-md-5 justify-content-center align-items-center px-4 mb-5 gap-4">
            <div className="col-12 col-md-5 col-lg-3 d-flex justify-content-center">
                <Image
                    src="https://hylpbcmxnnlbcpiygfkq.supabase.co/storage/v1/object/public/OdiseIA/OdiseIA/ODISEIA-2026-109.jpg"
                    alt="Imagen Sebastián"
                    width={400}
                    height={500}
                    className="imagen_hackaton"
                />
            </div>
            <div className="col-12 col-md-5 col-lg-3 d-flex justify-content-center">
                <Image
                    src="https://hylpbcmxnnlbcpiygfkq.supabase.co/storage/v1/object/public/OdiseIA/OdiseIA/ODISEIA-2026-102.jpg"
                    alt="Imagen OdiseIA"
                    width={400}
                    height={500}
                    className="imagen_hackaton"
                />
            </div>
            <div className="col-12 col-md-5 col-lg-3 d-flex justify-content-center">
                <Image
                    src="https://hylpbcmxnnlbcpiygfkq.supabase.co/storage/v1/object/public/OdiseIA/OdiseIA/ODISEIA-2026-141.jpg"
                    alt="Imagen OdiseIA"
                    width={400}
                    height={500}
                    className="imagen_hackaton"
                />
            </div>
            <div className="col-12 col-md-5 col-lg-3 d-flex justify-content-center">
                <Image
                    src="https://hylpbcmxnnlbcpiygfkq.supabase.co/storage/v1/object/public/OdiseIA/OdiseIA/ODISEIA-2026-011.jpg"
                    alt="Imagen OdiseIA"
                    width={400}
                    height={500}
                    className="imagen_hackaton"
                />
            </div>
            <div className="col-12 col-md-5 col-lg-3 d-flex justify-content-center">
                <Image
                    src="https://hylpbcmxnnlbcpiygfkq.supabase.co/storage/v1/object/public/OdiseIA/OdiseIA/ODISEIA-2026-037.jpg"
                    alt="Imagen OdiseIA"
                    width={400}
                    height={500}
                    className="imagen_hackaton"
                />
            </div>
            <div className="col-12 col-md-5 col-lg-3 d-flex justify-content-center">
                <Image
                    src="https://hylpbcmxnnlbcpiygfkq.supabase.co/storage/v1/object/public/OdiseIA/OdiseIA/ODISEIA-2026-105.jpg"
                    alt="Imagen OdiseIA"
                    width={400}
                    height={500}
                    className="imagen_hackaton"
                />
            </div>
            <div className="col-12 col-md-5 col-lg-3 d-flex justify-content-center">
                <Image
                    src="https://hylpbcmxnnlbcpiygfkq.supabase.co/storage/v1/object/public/OdiseIA/OdiseIA/ODISEIA-2026-064.jpg"
                    alt="Imagen OdiseIA"
                    width={400}
                    height={500}
                    className="imagen_hackaton"
                />
            </div>
            <div className="col-12 col-md-5 col-lg-3 d-flex justify-content-center">
                <Image
                    src="https://hylpbcmxnnlbcpiygfkq.supabase.co/storage/v1/object/public/OdiseIA/OdiseIA/ODISEIA-2026-099.jpg"
                    alt="Imagen OdiseIA"
                    width={400}
                    height={500}
                    className="imagen_hackaton"
                />
            </div>
            <div className="col-12 col-md-5 col-lg-3 d-flex justify-content-center">
                <Image
                    src="https://hylpbcmxnnlbcpiygfkq.supabase.co/storage/v1/object/public/OdiseIA/OdiseIA/ODISEIA-2026-115.jpg"
                    alt="Imagen OdiseIA"
                    width={400}
                    height={500}
                    className="imagen_hackaton"
                />
            </div>
            <div className="col-12 col-md-5 col-lg-3 d-flex justify-content-center">
                <Image
                    src="https://hylpbcmxnnlbcpiygfkq.supabase.co/storage/v1/object/public/OdiseIA/OdiseIA/ODISEIA-2026-129.jpg"
                    alt="Imagen OdiseIA"
                    width={400}
                    height={500}
                    className="imagen_hackaton"
                />
            </div>
            <div className="col-12 col-md-5 col-lg-3 d-flex justify-content-center">
                <Image
                    src="https://hylpbcmxnnlbcpiygfkq.supabase.co/storage/v1/object/public/OdiseIA/OdiseIA/ODISEIA-2026-131.jpg"
                    alt="Imagen OdiseIA"
                    width={400}
                    height={500}
                    className="imagen_hackaton"
                />
            </div>
            <div className="col-12 col-md-5 col-lg-3 d-flex justify-content-center">
                <Image
                    src="https://hylpbcmxnnlbcpiygfkq.supabase.co/storage/v1/object/public/OdiseIA/OdiseIA/ODISEIA-2026-138.jpg"
                    alt="Imagen OdiseIA"
                    width={400}
                    height={500}
                    className="imagen_hackaton"
                />
            </div>
            <div className="col-12 col-md-5 col-lg-3 d-flex justify-content-center">
                <Image
                    src="https://hylpbcmxnnlbcpiygfkq.supabase.co/storage/v1/object/public/OdiseIA/OdiseIA/ODISEIA-2026-149.jpg"
                    alt="Imagen OdiseIA"
                    width={400}
                    height={500}
                    className="imagen_hackaton"
                />
            </div>
            <div className="col-12 col-md-5 col-lg-3 d-flex justify-content-center">
                <Image
                    src="https://hylpbcmxnnlbcpiygfkq.supabase.co/storage/v1/object/public/OdiseIA/OdiseIA/ODISEIA-2026-150.jpg"
                    alt="Imagen OdiseIA"
                    width={400}
                    height={500}
                    className="imagen_hackaton"
                />
            </div>
            <div className="col-12 col-md-5 col-lg-3 d-flex justify-content-center">
                <Image
                    src="https://hylpbcmxnnlbcpiygfkq.supabase.co/storage/v1/object/public/OdiseIA/OdiseIA/ODISEIA-2026-155.jpg"
                    alt="Imagen OdiseIA"
                    width={400}
                    height={500}
                    className="imagen_hackaton"
                />
            </div>
            <div className="col-12 col-md-5 col-lg-3 d-flex justify-content-center">
                <Image
                    src="https://hylpbcmxnnlbcpiygfkq.supabase.co/storage/v1/object/public/OdiseIA/OdiseIA/ODISEIA-2026-159.jpg"
                    alt="Imagen OdiseIA"
                    width={400}
                    height={500}
                    className="imagen_hackaton"
                />
            </div>
            <div className="col-12 col-md-5 col-lg-3 d-flex justify-content-center">
                <Image
                    src="https://hylpbcmxnnlbcpiygfkq.supabase.co/storage/v1/object/public/OdiseIA/OdiseIA/ODISEIA-2026-164.jpg"
                    alt="Imagen OdiseIA"
                    width={400}
                    height={500}
                    className="imagen_hackaton"
                />
            </div>
            <div className="col-12 col-md-5 col-lg-3 d-flex justify-content-center">
                <Image
                    src="https://hylpbcmxnnlbcpiygfkq.supabase.co/storage/v1/object/public/OdiseIA/OdiseIA/ODISEIA-2026-172.jpg"
                    alt="Imagen OdiseIA"
                    width={400}
                    height={500}
                    className="imagen_hackaton"
                />
            </div>
            <div className="col-12 col-md-5 col-lg-5 d-flex justify-content-center">
                <Image
                    src="https://hylpbcmxnnlbcpiygfkq.supabase.co/storage/v1/object/public/OdiseIA/OdiseIA/ODISEIA-2026-186.jpg"
                    alt="Imagen OdiseIA"
                    width={400}
                    height={500}
                    className="imagen_hackaton"
                />
            </div>
            <div className="col-12 col-md-5 col-lg-5 d-flex justify-content-center">
                <Image
                    src="https://hylpbcmxnnlbcpiygfkq.supabase.co/storage/v1/object/public/OdiseIA/OdiseIA/ODISEIA-2026-190.jpg"
                    alt="Imagen OdiseIA"
                    width={400}
                    height={500}
                    className="imagen_hackaton"
                />
            </div>
        </div>
    </div>
    </>
    
)
}
export default Parte1;
