//Importamos el css del componente 
import '@/app/componentes/Gestos/gestos.css'
//Importamos el componente image
import Image from 'next/image'
const Gestos = () => {

    
//Agregamos array de imágenes de la a-z
        let imagenes = [
            {letra: 'A', url: '/Imagenes/Seccion_Inicio/Signos/A.png'},
            {letra: 'B', url: '/Imagenes/Seccion_Inicio/Signos/B.png'},
            {letra: 'C', url: '/Imagenes/Seccion_Inicio/Signos/C.png'},
            {letra: 'D', url: '/Imagenes/Seccion_Inicio/Signos/C.png'},
            {letra: 'E', url: '/Imagenes/Seccion_Inicio/Signos/C.png'},
            {letra: 'C', url: '/Imagenes/Seccion_Inicio/Signos/C.png'},
            {letra: 'C', url: '/Imagenes/Seccion_Inicio/Signos/C.png'},
            {letra: 'C', url: '/Imagenes/Seccion_Inicio/Signos/C.png'},
            {letra: 'C', url: '/Imagenes/Seccion_Inicio/Signos/C.png'},
            {letra: 'C', url: '/Imagenes/Seccion_Inicio/Signos/C.png'},
            {letra: 'C', url: '/Imagenes/Seccion_Inicio/Signos/C.png'},
            {letra: 'C', url: '/Imagenes/Seccion_Inicio/Signos/C.png'},
            {letra: 'C', url: '/Imagenes/Seccion_Inicio/Signos/C.png'},
            {letra: 'C', url: '/Imagenes/Seccion_Inicio/Signos/C.png'},
            {letra: 'C', url: '/Imagenes/Seccion_Inicio/Signos/C.png'},
            {letra: 'C', url: '/Imagenes/Seccion_Inicio/Signos/C.png'},
            {letra: 'C', url: '/Imagenes/Seccion_Inicio/Signos/C.png'},
            {letra: 'C', url: '/Imagenes/Seccion_Inicio/Signos/C.png'},
            {letra: 'C', url: '/Imagenes/Seccion_Inicio/Signos/C.png'},
            {letra: 'C', url: '/Imagenes/Seccion_Inicio/Signos/C.png'},
            {letra: 'C', url: '/Imagenes/Seccion_Inicio/Signos/C.png'},
        ]

        imagenes = [...imagenes,...imagenes]
    
    return (
        <>
        {/*Sección con la información de los tipos de manos que hay disponibles*/}
        <div className="carusel">
            <div className="grupo">
                {/*Hacemos un map para agregar todas las imágenes y mejorar la escalabilidad */}
                    {imagenes.map((imagen,index) => (
                        <Image
                            key={index}
                            className="carta"
                            src={imagen.url}
                            alt="Imagen Gesto"
                            width={100}
                            height={100}
                            title={imagen.letra}
                        />
                    ))}
             </div>
         </div>
        </>
    )
}
export default Gestos;