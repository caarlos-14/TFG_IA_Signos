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
        titulo1:`¿Donde nace `,
        titulo1_span:"Amadeus?",
        texto1:`Somos una iniciativa dedicada a la creación de soluciones basadas en`,
        texto1_parte2:"y enfocados a derribar la barrera de comunicación entre todas las personas",
        texto1_strong:"inteligencia artificial(IA),",
        imagen:`/Imagenes/Seccion_Inicio/logo_blanco.png`,
        titulo2:`¿Cual es `,
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
                <p>{slide[indice].texto1}<strong> {slide[indice].texto1_strong}</strong>, 
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
                    src="/Imagenes/Quienes_Somos/Imagenes/Desarrolladores/Carlos_desarrollador.png"
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



    <div className="Conatiner-fluid seccion-odiseIA min-vh-100">
        <div className="row">
            <div className="">
                <h3>Ganadores del 3 Premio OdiseIA</h3>

            </div>
        </div>
    </div> 
    </>
    
)
}
export default Parte1;
