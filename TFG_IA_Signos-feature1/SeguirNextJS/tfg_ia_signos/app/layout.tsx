
//Importamos Estilos Globales de la página
import "@/app/globals.css";
//Importamos lo necesario para cargar los estilos de boostrap
import 'bootstrap/dist/css/bootstrap.min.css';
//Importamos Fuente Principal de la página
import {Science_Gothic} from 'next/font/google'
//Importamos Footer para añadirlo al final de la página
import Footer from '@/app/componentes/Footer/Footer'
/*Creamos una variable para poder utilizarla en nuestro css para aplicar
  el tipo de letra a nuestra página web
  
  Mediante el contenido del párametro ´variable´ podremos hacer referencia al tipo de letra */
const scienceGothic = Science_Gothic({
  subsets:['latin'],
  variable:'--font-sciencegothic',
  fallback:['sans-serif']
})
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  //Estructura de nuestro layout base para todas las páginas de la app
  return (
    <html lang="es">
      <head>
        <link rel="icon" type="image/png" href="Imagenes/Seccion_Inicio/Logo.png" />
      </head>
      <body className={`${scienceGothic.variable}`}>
        <main>
          <div className="contenido"></div>
          {children}
        </main>
        <Footer/>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossOrigin="anonymous"></script>
      </body>
    </html>
  );
}
