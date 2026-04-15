//Importamos el css del componente 
import '@/app/componentes/Gestos/gestos.css'
//Importamos el componente image
import Image from 'next/image'
const Gestos = () => {

    
//Agregamos array de imágenes de la a-z
        let imagenes = [
            {letra: 'A', url: '/Imagenes/Seccion_Inicio/Signos/a.png'},
            {letra: 'B', url: '/Imagenes/Seccion_Inicio/Signos/b.png'},
            {letra: 'C', url: '/Imagenes/Seccion_Inicio/Signos/c.png'},
            {letra: 'D', url: '/Imagenes/Seccion_Inicio/Signos/d.png'},
            {letra: 'E', url: '/Imagenes/Seccion_Inicio/Signos/e.png'},
            {letra: 'C', url: '/Imagenes/Seccion_Inicio/Signos/f.png'},
            {letra: 'C', url: '/Imagenes/Seccion_Inicio/Signos/g.png'},
            {letra: 'C', url: '/Imagenes/Seccion_Inicio/Signos/h.png'},
            {letra: 'C', url: '/Imagenes/Seccion_Inicio/Signos/i.png'},
            {letra: 'C', url: '/Imagenes/Seccion_Inicio/Signos/j.png'},
            {letra: 'C', url: '/Imagenes/Seccion_Inicio/Signos/k.png'},
            {letra: 'C', url: '/Imagenes/Seccion_Inicio/Signos/l.png'},
            {letra: 'C', url: '/Imagenes/Seccion_Inicio/Signos/ll.png'},
            {letra: 'C', url: '/Imagenes/Seccion_Inicio/Signos/m.png'},
            {letra: 'C', url: '/Imagenes/Seccion_Inicio/Signos/n.png'},
            {letra: 'C', url: '/Imagenes/Seccion_Inicio/Signos/enie.png'},
            {letra: 'C', url: '/Imagenes/Seccion_Inicio/Signos/o.png'},
            {letra: 'C', url: '/Imagenes/Seccion_Inicio/Signos/p.png'},
            {letra: 'C', url: '/Imagenes/Seccion_Inicio/Signos/q.png'},
            {letra: 'C', url: '/Imagenes/Seccion_Inicio/Signos/r.png'},
            {letra: 'C', url: '/Imagenes/Seccion_Inicio/Signos/rr.png'},
            {letra: 'C', url: '/Imagenes/Seccion_Inicio/Signos/s.png'},
            {letra: 'C', url: '/Imagenes/Seccion_Inicio/Signos/t.png'},
            {letra: 'C', url: '/Imagenes/Seccion_Inicio/Signos/u.png'},
            {letra: 'C', url: '/Imagenes/Seccion_Inicio/Signos/v.png'},
            {letra: 'C', url: '/Imagenes/Seccion_Inicio/Signos/w.png'},
            {letra: 'C', url: '/Imagenes/Seccion_Inicio/Signos/x.png'},
            {letra: 'C', url: '/Imagenes/Seccion_Inicio/Signos/y.png'},
            {letra: 'C', url: '/Imagenes/Seccion_Inicio/Signos/z.png'},
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
                            width={110}
                            height={110}
                            style={{width: 'auto', height: 'auto'}}
                            title={imagen.letra}
                        />
                    ))}
             </div>
         </div>
        </>
    )
}
export default Gestos;