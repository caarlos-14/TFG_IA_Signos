'use client'
import Link from 'next/link';
import Image from 'next/image';

const Footer = () =>{

    return(
        <footer className="bg-dark text-white py-5 px-4 mt-auto border-top border-3 border-light">
            {/**Seccion footer que se agrega a todas las páginas*/}
            <div className="container-fluid mt-5">
                {/*Alineamos al centro*/}
                <div className="row text-center">
                
                
                {/**Información sobre el TFG */}
                <div className="col-12 col-md-4 mb-5 mb-md-0">
                    <Image
                    src="/Imagenes/Seccion_Inicio/logo_blanco.png"
                    alt="Logo Principal"
                    width={200}
                    height={200}
                    className="img-fluid"
                    
                    />
                    {/*Titulo del trabajo*/}
                    <h4 className="mt-3">Título del trabajo:Amadeus Transcripción Lenguaje de Señas</h4>
                    <p>Desarrollo de Aplicaciones Web | Davante Medac | 2026</p>

                    {/*Indicamos la url del github donde estará alojado nuestro proyecto*/}
                    <div className="d-flex flex-row justify-content-center gap-3">
                    <Image
                    src="/Imagenes/footer/Imagenes/github.png"
                    alt="Logo Github"
                    width={30}
                    height={30}
                    className="img-fluid"
                    />
                    <a href="https://github.com/caarlos-14/TFG_IA_Signos.git" target="_blank" className="text-white text-decoration-none">Proyecto en Github</a>
                    </div>
                </div>

                {/**Información sobre los alumnos*/}
                <div className="col-12 col-md-4 mt-5  mb-5 mb-md-0">
                <div className="d-flex flex-column gap-4">


                    {/*Información sobre los alumnos*/}
                    <div className="d-flex flex-column">
                        <h5>Carlos Sánchez</h5>
                        <small>(Alumno y Creador de Amadeus)</small>
                        <small><a href="mailto:csg0037@alu.medac.es">csg0037@alu.medac.es</a></small>
                        <div className="d-flex justify-content-center align-items-center gap-2 mt-1">
                        <Image
                        src="/Imagenes/footer/Imagenes/Linkedin.png"
                        alt="Logo Linkedin"
                        width={30}
                        height={30}
                        className="img-fluid"
                        />
                        {/*Indicamos el linkedin*/}
                        <small><a href="https://www.linkedin.com/in/carlos-s%C3%A1nchez-garc%C3%ADa/" target="_blank" className="text-white text-decoration-none">Linkedln Carlos Sánchez</a></small>
                        </div>
                    </div>


                    {/*Información sobre los alumnos*/}
                    <div className="d-flex flex-column">
                        <h5>Jorge Valverde</h5>
                        <small>(Alumno y Creador de Amadeus)</small>
                        <small><a href="mailto:csg0037@alu.medac.es">jvb0017@alu.medac.es</a></small>
                        <div className="d-flex justify-content-center align-items-center gap-2 mt-1">
                        <Image
                        src="/Imagenes/footer/Imagenes/Linkedin.png"
                        alt="Logo Linkedin"
                        width={30}
                        height={30}
                        className="img-fluid"
                        />
                        <small><a href="https://www.linkedin.com/in/carlos-s%C3%A1nchez-garc%C3%ADa/" target="_blank" className="text-white text-decoration-none">Linkedln Jorge Valverde</a></small>
                        </div>
                    </div>



                    {/*Información sobre los alumnos*/}
                    <div className="d-flex flex-column">
                        <h5>Ángel Sebastián</h5>
                        <small>(Alumno y Creador de Amadeus)</small>
                        <small><a href="mailto:csg0037@alu.medac.es">avc003@alu.medac.es</a></small>
                        <div className="d-flex justify-content-center align-items-center gap-2 mt-1">
                        <Image
                        src="/Imagenes/footer/Imagenes/Linkedin.png"
                        alt="Logo Linkedin"
                        width={30}
                        height={30}
                        className="img-fluid"
                        />
                        <small><a href="https://www.linkedin.com/in/carlos-s%C3%A1nchez-garc%C3%ADa/" target="_blank" className="text-white text-decoration-none">Linkedln Ángel Sebastián</a></small>
                        </div>
                    </div>
                </div>
                </div>
                {/*Navegación mini*/}
                <div className="col-12 col-md-4 mt-5  mb-5 mb-md-0">
                    <h6>Navegación</h6>
                     <div className="d-flex flex-column justify-content-between gap-4 mt-5">
                        <Link href="/" className="nav-link">Inicio</Link>
                        <Link href="/Traduccion"  className="nav-link">Traducción</Link>
                        <Link href="/Quienes-Somos" className="nav-link">Quiénes Somos</Link>
                        <Link href="/Registro" className="nav-link log">Iniciar Sesión</Link>     
                     </div>
                </div>
            </div>
                <div className="text-center mt-5">
                <br/>
                <small>2026 | Todos los derechos reservados</small>
                </div>
            </div>
    </footer>
    )
}
export default Footer