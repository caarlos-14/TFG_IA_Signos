"use client";
import Link from "next/link";
import '@/app/componentes/paginaerror502/error.css';

const ErrorPage = () => {
  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"/>

      <div className="contenedorPadre min-vh-100 d-flex align-items-center justify-content-center px-3">
        <div className="text-center contenedorCard p-4 p-md-5 rounded-4 shadow-lg w-100" style={{ maxWidth: '560px' }}>

          {/* Código de error */}
          <div className="codigoError display-1 fw-bold mb-2">504</div>

          {/* Título */}
          <h1 className="nombreError fs-2 fs-md-1 fw-semibold mb-3">
            Tiempo de espera superado
          </h1>

          {/* Separador */}
          <div className="separador mx-auto mb-4" />

          {/* Descripción */}
          <p className="explicacionError fs-6 fs-md-5 mb-4 px-2">
            Nuestro servidor no es capaz de atenderle correctamente en este momento.
            Estamos trabajando para solucionar la situación lo antes posible.
          </p>

          {/* Botón de vuelta */}
          <Link href="/" className="btn btnVolver px-4 py-2 rounded-pill fw-medium">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </>
  );
}

export default ErrorPage;