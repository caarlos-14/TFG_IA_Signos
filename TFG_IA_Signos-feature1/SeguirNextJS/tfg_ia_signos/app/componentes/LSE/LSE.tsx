"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import "@/app/componentes/LSE/LSE.css"


const LSE = () =>{
    {/**Hooks*/}
    const [pagina,setPagina] = useState(0);
    const [valor,setValor] = useState(0);
    const [recursos,setRecursos] = useState(false);


    {/**Alternar entre abierto y cerrado*/}
    const toggleRecursos = () =>{
        setRecursos(!recursos);
    }

    {/**Enlaces de recursos para aprender LSE*/}
    const enlaces =[
        {enlace:"https://www.emagister.com/"},
        {enlace:"https://ielse.es/"},
        {enlace:"https://signame.es/"}
    ]

    {/**Array de objetos para mostrar información cada 5 segundos*/}
        const items = [
        {
            titulo:"¿Qué es el LSE?",
            texto:`Es la lengua natural de las personas con discapacidad auditiva en España. 
                        Es un idioma completo ,con gramática y estructura propias, que se comunican
                        a través del canal visual y gestual.`
        },
        {
            titulo:"LSE VS Lengua Natural",
            texto:`Ambos son idiomas completos, pero utilizan medios diferentes para la comunicación
                        Español - Auditivo - Hablado y oído.
                        LSE - Visual - Gestos/Expresiones`
        },
        {
            titulo:"Sabías qué...",
            texto:"El LSE no sigue el mismo orden gramatical que el español normal"
        },

    ]

    {/**Manejo del interrvalo del cambio de informacion*/}
    useEffect(() =>{
      const interval = setInterval(() =>{
        setValor((prev) => (prev+1) % items.length)
      },5000)

      {/**Limpiamos el intervalo cuando el componente se desmonta*/}
      return () => clearInterval(interval)
    },[])

    //Manejo de los botones para anterior y siguiente
    const handleAfter = () =>{
        setPagina((prev) => (prev + 1) % enlaces.length)
    }

    const handleBefore = () =>{
        setPagina((prev) => (prev - 1 + enlaces.length) % enlaces.length)
    }

    return(
        <div className="container-fluid g-0">
            <div className="row g-0">
                <div className=" d-lg-none position-relative">
                    <img className="position-absolute banner-img" width="100%" alt="banner de separación de sección" src="https://capsule-render.vercel.app/api?type=waving&height=100&color=86D597&reversal=true"/>
                </div>

            <div className="texto_LSE col-12 col-md-12 col-lg-5 border-top border-4">
                    <div className="mb-5">
                        <h3 className="text-left">¿Quieres Aprender LSE?</h3>
                    </div>
                <div>
                    <p>Por nuestra parte queremos facilitar <span className="destacado">sitios externos y recursos que os pueden facilitar el aprendizaje
                        del LSE (Lenguaje de señas española)</span>.<strong> A tráves del recuadro se tendrá accesos a varios recursos</strong>
                    </p>
                    <button className="btn btn-primary" onClick={toggleRecursos}>{recursos ? "Ocultar Recursos":"Mostrar Recursos"}</button>
                </div>
            </div>

            {!recursos ? (
            <div className="LSE_card col-12 col-md-12 col-lg-12 recursos-container" >
                <h3 className="text-center">Información Recursos (Lenguaje de Señas Española)</h3>
                <div className="accordion w-100" id="accordionExample">
                    <div className="accordion-item">
                            <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Emagister
                            </button>
                            </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                <strong>Emagister es un comparador de cursos de LSE formativo que conecta a miles de estudiantes con diferentes: cursos,grados y másteres</strong> Aquí podrás buscar en diferentes lugares, donde imparten el curso que te hará aprender y mediante sus filtros, obtener una búsqueda precisa.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        IELSE
                        </button>
                        </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong>Instituto de Enseñanza de la Lengua de Signos Española</strong> centro especializado en la formación y ensañanza práctica de la LSE. Ofrece cursos desde nivel básico hasta avanzado, con un enfoque en la comunicación efectiva y la comprensión cultural. Además, cuenta con un equipo de instructores altamente capacitados y recursos didácticos para facilitar el aprendizaje de la lengua de signos.
                        </div>
                    </div>
                    </div>
                <div className="accordion-item">
                        <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Signame
                        </button>
                        </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                        <strong>Plataforma Educativa que ofece espacio virtual de aprendizaje</strong> Mediante sus recursos digitales imparten diferentes recursos para aquellas personas que desean y estan interesadas en aprender el LSE .
                        </div>
                    </div>
                </div>
            </div>
        </div>
            ):(
            <div className="LSE_card col-12 col-md-12 col-lg-5" >
                <div className="LSE_header">
                    <h4>Recursos Recomendados</h4>
                </div>
                <div className="LSE_body">
                    {enlaces[pagina] &&(
                        <iframe key={pagina} src={enlaces[pagina].enlace}  title="Paginas de aprendizaje"></iframe>
                    )}
                    
                </div>
                 <div className="LSE_controles">
                    <button onClick={handleBefore} className="btn">Anterior</button>
                    {enlaces[pagina] &&(
                        <a href={enlaces[pagina].enlace} target="_blank" className="btn">Acceder</a>
                    )}
                    <button onClick={handleAfter} className="btn">Siguiente</button>
                </div>
            </div>
            )}

            <div className="LSE_window col-12">
                <Image
                src={"/Imagenes/LSE/Imagenes/LSE.png"}
                alt="LSE Imagen"
                width={50}
                height={50}
                className="img-fluid foto_LSE"
                />
            <div className="LSE_item">
    
            <h3>{items[valor].titulo}</h3>
            <p>{items[valor].texto}</p>
            </div>
        </div>
    </div>
</div>
)
}
export default LSE



 