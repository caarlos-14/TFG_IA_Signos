/**Importamos tanto el next/image como el Link para poder utilizarlo en nuestra página
 * y aprovecharnos de la navegación y lo que nos ofrece image aparte del css del componente
 */
import '@/app/componentes/ContenidoInicio/ContenidoInicio.css'
import Image from 'next/image'
const ContenidoInicio = () => {
    return(
        <div className="inicio_seccion">
            {/*Seccion frase del contenido de inicio*/}
            <div className="col-12 col-md-6 frase ">
            <h1>De la mano a la palabra</h1>
            <p>Lleva tu habla a otro nivel y comunícate con quién desees.</p>
            <a className="w-10 btn_frase" href="#seccion2" >Ver más</a>
        </div>
            <div className="col-12 col-md-6">
                {/*Seccion de la imagen dentro del contenido de inicio*/}
                <div>
                    <Image
                    src="/Imagenes/Seccion_Inicio/mano_inicio.png"
                    alt="mano de inicio"
                    className="image"
                    width={500}
                    height={500}
                    />
                </div>
            </div>
        </div>
    );
}
export default ContenidoInicio;