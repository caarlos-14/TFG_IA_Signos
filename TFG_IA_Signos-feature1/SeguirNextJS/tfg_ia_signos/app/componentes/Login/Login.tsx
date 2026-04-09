"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import '@/app/componentes/Login/estiloslogin.css'
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase";

const Login = () => {
    const [usuario, setUsuario] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [mensaje, setMensaje] = useState<string>("");
    const [exito, setExito] = useState<boolean>(false);
    const [cargando, setCargando] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const datos = {
            email: usuario,
            password: password
        }
        setCargando(true);
        setMensaje("");
        try {
            const res = await fetch(`https://api.carlos-sanchez.dev/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos)
            });
            const data = await res.json();

            if (data.status === "success") {
                
                await supabase.auth.setSession({
                    access_token:data.session.access_token,
                    refresh_token:data.session.refresh_token
                })

                setExito(true);
                setMensaje("¡Inicio de sesión exitoso!");
                
                setTimeout(() =>{
                    setCargando(true);
                router.push("/");
                },2000)
            } else {
                setExito(false);
                setMensaje(data.message || "Usuario o contraseña incorrectos");
            }
        } catch (error) {
            setExito(false);
            setMensaje("Error al conectar con el servidor");
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="login-page">

            {/* BARRA SUPERIOR */}
            <div className=" volver-inicio d-flex flex-column flex-md-row align-items-center ">

                {/* VOLVER — izquierda */}
                <Link href="/">
                    <i className="bi bi-chevron-left "></i>
                    <span>Volver al inicio</span>
                </Link>

                {/* LOGO — derecha */}
                <div className="ms-md-auto logo-header">
                    <Image
                        src="/Imagenes/Seccion_Inicio/logo_blanco.png"
                        alt="Logo"
                        width={200}
                        height={100}
                    />
                </div>

            </div>

            {/* CONTENEDOR PRINCIPAL */}
            <div className="container-fluid p-0">
                <div className="row g-0 h-100">

                    {/* PANEL IMAGEN */}
                    <div className="col-12 col-md-5 d-none d-md-flex imagen-login">
                        <Image
                            src="/Imagenes/Login/mano.jpeg"
                            alt="Imagen Login"
                            width={900}
                            height={900}
                        />
                    </div>

                    {/* PANEL FORMULARIO */}
                    <div className="col-12 col-md-7 d-flex justify-content-center align-items-end align-items-md-center" id="sesion">
                        <div id="sombreado" className="w-100">
                            <h1>Inicia Sesión</h1>
                            <br />
                            <form onSubmit={handleSubmit}>
                                <div className="input-group mb-3">
                                    <input
                                        id="username"
                                        type="text"
                                        name="username"
                                        className="input-box"
                                        placeholder="Nombre de usuario"
                                        required
                                        onChange={(e) => setUsuario(e.target.value)}
                                    />
                                </div>

                                <div className="input-group mb-3">
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        className="input-box"
                                        placeholder="Contraseña"
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <button type="submit" id="ingreso" className="w-100" disabled={cargando}>
                                    {cargando ? "Verificando..." : "Ingresar"}
                                </button>

                                <p className="mt-3">
                                    ¿No tienes cuenta?{" "}
                                    <Link id="link" href="/Registro">Regístrate</Link>
                                </p>

                                {mensaje && (
                                    <p style={{
                                        color: exito ? "green" : "red",
                                        marginTop: "8px",
                                        fontWeight: "500"
                                    }}>
                                        {mensaje}
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;