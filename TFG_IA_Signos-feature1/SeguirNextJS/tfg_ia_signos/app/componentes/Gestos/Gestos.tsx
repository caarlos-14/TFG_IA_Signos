//Importamos el css del componente 
import '@/app/componentes/Gestos/gestos.css'
//Importamos el componente image
import Image from 'next/image'
const Gestos = () => {

    
//Agregamos array de imágenes de la a-z
        let imagenes = [
            {letra: 'A', url: '/Imagenes/Seccion_inicio/Signos/a.png'},
            {letra: 'B', url: '/Imagenes/Seccion_inicio/Signos/b.png'},
            {letra: 'C', url: '/Imagenes/Seccion_inicio/Signos/c.png'},
            {letra: 'D', url: '/Imagenes/Seccion_inicio/Signos/d.png'},
            {letra: 'E', url: '/Imagenes/Seccion_inicio/Signos/e.png'},
            {letra: 'F', url: '/Imagenes/Seccion_inicio/Signos/f.png'},
            {letra: 'G', url: '/Imagenes/Seccion_inicio/Signos/g.png'},
            {letra: 'H', url: '/Imagenes/Seccion_inicio/Signos/h.png'},
            {letra: 'I', url: '/Imagenes/Seccion_inicio/Signos/i.png'},
            {letra: 'J', url: '/Imagenes/Seccion_inicio/Signos/j.png'},
            {letra: 'K', url: '/Imagenes/Seccion_inicio/Signos/k.png'},
            {letra: 'L', url: '/Imagenes/Seccion_inicio/Signos/l.png'},
            {letra: 'LL', url: '/Imagenes/Seccion_inicio/Signos/ll.png'},
            {letra: 'M', url: '/Imagenes/Seccion_inicio/Signos/m.png'},
            {letra: 'N', url: '/Imagenes/Seccion_inicio/Signos/n.png'},
            {letra: 'Ñ', url: '/Imagenes/Seccion_inicio/Signos/enie.png'},
            {letra: 'O', url: '/Imagenes/Seccion_inicio/Signos/o.png'},
            {letra: 'P', url: '/Imagenes/Seccion_inicio/Signos/p.png'},
            {letra: 'Q', url: '/Imagenes/Seccion_inicio/Signos/q.png'},
            {letra: 'R', url: '/Imagenes/Seccion_inicio/Signos/r.png'},
            {letra: 'RR', url: '/Imagenes/Seccion_inicio/Signos/rr.png'},
            {letra: 'S', url: '/Imagenes/Seccion_inicio/Signos/s.png'},
            {letra: 'T', url: '/Imagenes/Seccion_inicio/Signos/t.png'},
            {letra: 'U', url: '/Imagenes/Seccion_inicio/Signos/u.png'},
            {letra: 'V', url: '/Imagenes/Seccion_inicio/Signos/v.png'},
            {letra: 'W', url: '/Imagenes/Seccion_inicio/Signos/w.png'},
            {letra: 'X', url: '/Imagenes/Seccion_inicio/Signos/x.png'},
            {letra: 'Y', url: '/Imagenes/Seccion_inicio/Signos/y.png'},
            {letra: 'Z', url: '/Imagenes/Seccion_inicio/Signos/z.png'},
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
                            title={imagen.letra}
                        />
                    ))}
             </div>
         </div>
        </>
    )
}
export default Gestos;