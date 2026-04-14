"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import "@/app/componentes/LSE/LSE.css"


const LSE = () =>{
    const [pagina,setPagina] = useState(0);
    const [valor,setValor] = useState(0);
    const [utilizado,setUtilizado] = useState(false);

    const enlaces =[
        {enlace:"https://www.emagister.com/"},
        {enlace:"https://ielse.es/"},
        {enlace:"https://www.canalcursos.com/masformacion/cursos_y_cursos_fp_educacion_lenguaje_de_signos_espanola_online_online-opc22pc720p101t2/?campaignid=18800930355&adgroupid=144014671398&matchtype=&network=g&device=c&devicemodel=&keyword=&creative=684588770564&adposition=&placement=&clase2=sinfiltroprecio&gad_source=1&gad_campaignid=18800930355&gbraid=0AAAAADe2SwA_V4jffRrL4yvjWFF97uT3e&gclid=Cj0KCQiA49XMBhDRARIsAOOKJHaRL-x3B6NnToezzs-7Ob6ByqoFlbp3NSBeu8PXHxSf6scMJs4EtV0aAow6EALw_wcB#/subcategorias"}
    ]

        const items = [
        {
            titulo:"¿Qué es el LSE?",
            texto:`Es la lengua natural de las personas con discapacidad auditiva en España. 
                        Es un idioma completo ,con grámatica y estructura propias, que se comunican
                        a tráves del canal visual y gestual.`
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

    useEffect(() =>{
    setUtilizado(true)
      const interval = setInterval(() =>{
        setValor((prev) => (prev+1) % items.length)
      },5000)

      return () => clearInterval(interval)
    },[])

    const handleAfter = () =>{
        setPagina((prev) => (prev + 1) % enlaces.length)
    }

    const handleBefore = () =>{
        setPagina((prev) => (prev - 1 + enlaces.length) % enlaces.length)
    }

    if(!utilizado) return null;
    return(
        <div className="container-fluid g-0">
            <div className="row g-0">
            <div className=" d-lg-none position-relative">
                    <img className="position-absolute banner-img" width="100%" alt="banner de separación de sección" src="https://capsule-render.vercel.app/api?type=waving&height=100&color=86D597&reversal=true"/>
            </div>

            <div className="texto_LSE col-12 col-md-12 col-lg-5 border-top border-4">
            <div className="mb-5">
            <h3>¿Quieres Aprender LSE?</h3>
            </div>
            <div>
                <p>Por nuestra parte queremos facilitar <span className="destacado">sitios externos y recursos que os pueden facilitar el aprendizaje
                    del LSE (Lenguaje de señas española)</span>.<strong> A tráves del recuadro se tendrá accesos a varios recursos</strong>
                </p>
            </div>
            </div>

                
            <div className="LSE_card col-12 col-md-12 col-lg-5">
                <div className="LSE_header">
                    <h4>Recursos Recomendados</h4>
                </div>
                <div className="LSE_body">
                    {enlaces[pagina] &&(
                        <iframe key={pagina} src={enlaces[pagina].enlace}  title="Paginas de aprendizaje" ></iframe>
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



 