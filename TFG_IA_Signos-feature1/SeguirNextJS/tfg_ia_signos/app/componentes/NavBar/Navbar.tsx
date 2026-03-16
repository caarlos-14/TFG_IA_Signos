"use client";
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import { supabase } from '@/supabase';
import { useEffect,useState } from 'react';
import '@/app/componentes/NavBar/navbar.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Navbar = () => {
const [usuario,setUsuario] = useState<string | null>(null);
const [activar,setActivar] = useState<boolean>(false);
const path = usePathname();

useEffect(() =>{
    const comprobarSesion = async () =>{
        const {data:{session}} = await supabase.auth.getSession();

        if (session){
            var nombre = session.user.user_metadata.name;
            setUsuario(nombre || "Invitado");
        }
    }
    comprobarSesion();
},[]);

    const toggleMenu = () =>{
        setActivar(!activar)
    }

    return (
        <div className="col-12 p-0 contenedor-video"> 

            {/*Ancho del navbar puesto para que ocupe todo el ancho de la página*/}
                <nav className="navegacion navbar navbar-expand-lg py-2"> {/*La pagina colapsa en pantallas ≥992px*/}
                    {/*Contenedor fluido ocupando todo el ancho*/}
                    <div className="container-fluid d-flex flex-nowrap">

                    {/*Del logo situado a la parte izquierda*/}
                    <div className="navbar-left">
                        <div className="btn navbar-brand logo"></div>
                    </div>
                    {/*Boton hambuerguesa*/}
                    <button className="navbar-toggler navbar-dark" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu">
                            <span className="navbar-toggler-icon"></span>
                    </button>

                     <div className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvasMenu">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title text-center w-100">Menu</h5>
                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Cerrar"></button>
                        </div>
                    <div className="enlaces offcanvas-body" id="menuNav">
                        <div className="navbar-nav ms-auto gap-3 me-3">
                            <Link href="/" className={`nav-link ${path == '/' ? 'active':''}`}>
                            <i className="bi bi-house-door-fill me-2 fs-5"></i>Inicio
                            </Link>
                            <Link href="/Traduccion" className={`nav-link ${path == '/Traduccion' ? 'active':''}`}>
                            <i className="bi bi-translate me-2 fs-5"></i>Traducción
                            </Link>
                            <Link href="/Quienes-Somos" className={`nav-link ${path == '/Quienes-Somos' ? 'active':''}`}>
                            <i className="bi bi-people-fill me-2 fs-5"></i>Quiénes Somos
                            </Link>
                            <div className="d-flex align-items-center">
                            <div className="login">
                            {usuario ? (
                            <>
                            <a onClick={toggleMenu} className="nav-link log px-4">
                            <span id="usuario">{usuario}</span>
                            <i className="bi bi-caret-down-fill ms-2"></i>
                            </a>
                            {activar && 
                            <ul className="lista-opciones-perfil">
                            <li className="opcion-sesion">
                            <a
                            onClick={async () =>{
                            await supabase.auth.signOut();
                            setUsuario(null);
                            }}
                            >Cerrar Sesión
                            </a>
                            </li>       
                            </ul>
                            }
                            </>
                            ):(
                            <>
                            <Link href="/Login" className="nav-link log px-4">
                            <span className="me-1">Iniciar Sesión</span>
                            <i className="bi bi-person-circle me-2"></i>
                            </Link>
                            </>
                            )}
                            
                            </div></div>
                            <div className="d-lg-none mt-4 text-center text-white ">
                                <small>Proyecto Amadeus | Lenguaje de Señas en tiempo real 2026</small>

                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
  
);
};

export default Navbar;