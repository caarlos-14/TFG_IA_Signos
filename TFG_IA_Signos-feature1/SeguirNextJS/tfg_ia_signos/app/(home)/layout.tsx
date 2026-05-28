import 'bootstrap-icons/font/bootstrap-icons.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
        {/*Video aplicado al fondo de la página FONDO INICIO*/}
        <video className="video_inicio" autoPlay muted loop playsInline>
                <source src="/Imagenes/Seccion_Inicio/video_fondo.mp4" type="video/mp4"/>
        </video>
      {/*Habilitamos children para poder integrar los elementos desde el page.tsx habilitando 
      el video en la página principal
      
      La estructura html no la definimos ya que en el layout principal ya la definimos*/}
          {children}
    </>
  );
}
