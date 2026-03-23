// script_analisis_css.js
const fs = require("fs");
const path = require("path");

// Carpeta de tu proyecto donde está el CSS/SCSS
const APP_DIR = path.join(__dirname, "app");

// Función para leer todos los archivos .css y .scss recursivamente
function leerArchivosCSS(dir) {
  let archivos = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  items.forEach(item => {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      archivos = archivos.concat(leerArchivosCSS(fullPath));
    } else if (item.name.endsWith(".css") || item.name.endsWith(".scss")) {
      const contenido = fs.readFileSync(fullPath, "utf8");
      archivos.push({ path: fullPath, contenido });
    }
  });

  return archivos;
}

// Combina todos los archivos en bloques de texto separados por comentarios
const archivosCSS = leerArchivosCSS(APP_DIR);

let bloques = archivosCSS.map(file => {
  return `/* ==== Archivo: ${file.path} ==== */\n${file.contenido}\n`;
}).join("\n\n");

// Guardamos en un solo archivo listo para pegar
fs.writeFileSync("proyecto_css_para_IA.txt", bloques, "utf8");
console.log("Archivo listo: proyecto_css_para_IA.txt");