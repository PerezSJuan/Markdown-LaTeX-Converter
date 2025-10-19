const downloadFile = (filename, content) => {
    // Asegurarse de que hay contenido para descargar
    if (!content || content.length === 0 || filename.length === 0) {
        console.error("Error: el contenido del archivo está vacío.");
        return;
    }

    // Crear un objeto Blob con el contenido
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });

    // Crear una URL para el Blob
    const url = URL.createObjectURL(blob);

    // Crear un enlace temporal para iniciar la descarga
    const element = document.createElement('a');
    element.href = url;
    element.download = filename;

    // Añadirlo al DOM, simular un clic y eliminarlo
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    // Liberar la URL del objeto para limpiar la memoria
    URL.revokeObjectURL(url);
}

export default downloadFile;