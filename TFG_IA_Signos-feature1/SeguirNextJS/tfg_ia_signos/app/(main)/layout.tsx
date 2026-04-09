import Navbar from '@/app/componentes/NavBar/Navbar'
import "bootstrap-icons/font/bootstrap-icons.css";
export default function PaginasLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
        {/*Video aplicado al fondo de las páginas*/}
        <video className="video_inicio" autoPlay muted loop playsInline>
                <source src="/Imagenes/Seccion_Inicio/video_fondo.mp4" type="video/mp4"/>
        </video>
        {/*Agregamos el navbar a todas las página dentro de la carpeta main*/}
        <Navbar></Navbar>
        <>
          {children}
        </>
      </>
  );
}
