export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
/*Definimos el mismo layout quitando el video ya que en el 
  registro no nos interesa que aparezca el video
  
  Habilitamos children para poder añadir contenido*/
  return (
    <>
        <>
          {children}
        </>
      </>
  );
}
