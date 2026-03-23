// script_analisis.js
const fs = require("fs");
const path = require("path");

// Carpeta de tu proyecto (ahora es 'app')
const APP_DIR = path.join(__dirname, "app");

// Función para leer todos los archivos .tsx recursivamente
function leerArchivosTSX(dir) {
  let archivos = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  items.forEach(item => {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      archivos = archivos.concat(leerArchivosTSX(fullPath));
    } else if (item.name.endsWith(".tsx")) {
      const contenido = fs.readFileSync(fullPath, "utf8");
      archivos.push({ path: fullPath, contenido });
    }
  });

  return archivos;
}

// Combina todos los archivos en bloques de texto separados por comentarios
const archivosTSX = leerArchivosTSX(APP_DIR);

let bloques = archivosTSX.map(file => {
  return `// ==== Archivo: ${file.path} ==== \n${file.contenido}\n`;
}).join("\n\n");

// Guardamos en un solo archivo listo para pegar
fs.writeFileSync("proyecto_para_IA.txt", bloques, "utf8");
console.log("Archivo listo: proyecto_para_IA.txt");