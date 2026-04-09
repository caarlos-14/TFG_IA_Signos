//Agregamos los estilos del componente
import '@/app/componentes/segunda_seccion/seccion2.css'

const seccion2 = () =>{
    return(
        <section className="seccion2" id="seccion2">
            <div className="container-fluid p-0 m-0">
        {/**Video de la camara sección 2 */}
        <video className="video_seccion2 col-12" autoPlay muted loop playsInline>
            <source src="/Imagenes/Seccion_Inicio/Seccion2/camara_video.mp4" type="video/mp4"/>
        </video>
        {/**Texto Informativo de la sección2*/}
    <div className="row justify-content-center align-items-center mt-5">
        <div className="texto col-12 col-md-6">
        <p className="ms-3">Capturamos todos los <span className="destacado">movimientos de la mano</span> en tiempo real, 
            Escribimos tus letras de forma dinámica y <span className="destacado">hacemos que tu comunicación sea mas fluida.</span></p>
        </div>
        {/**Imagen de la cámara de fotos*/}
        <div className="imagen col-md-6"></div>
    </div>
</div>
</section>
    )
}
export default seccion2;