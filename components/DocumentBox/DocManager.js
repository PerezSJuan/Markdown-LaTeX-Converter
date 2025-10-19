const moveUpDoc = (docs, setDocs, index) => {
    if (index === 0) return;
    const newDocs = [...docs];
    [newDocs[index - 1], newDocs[index]] = [newDocs[index], newDocs[index - 1]];
    setDocs(newDocs);
}

const moveDownDoc = (docs, setDocs, index) => {
    if (index === docs.length - 1) return;
    const newDocs = [...docs];
    [newDocs[index + 1], newDocs[index]] = [newDocs[index], newDocs[index + 1]];
    setDocs(newDocs);
}

const deleteDoc = (docs, setDocs, index) => {
    const newDocs = docs.filter((_, i) => i !== index);
    setDocs(newDocs);
}

const addDocs = async (docs, setDocs, setAlert, files) => {
    // Asegurarnos de que files es un FileList o un array
    const newFilesArray = files instanceof FileList ? Array.from(files) : [files];

    // Creamos una promesa para leer cada archivo
    const readFilePromises = newFilesArray.map(file => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                resolve({
                    name: file.name,
                    content: e.target.result.split('\n')
                });
            };
            reader.readAsText(file);
        });
    });

    try {
        // Esperamos a que se lean todos los archivos
        const readFiles = await Promise.all(readFilePromises);

        // Verificamos duplicados
        const currentFileNames = new Set(docs.map(doc => doc.name));
        const filesToAdd = [];
        let hasDuplicates = false;

        readFiles.forEach(file => {
            if (currentFileNames.has(file.name)) {
                hasDuplicates = true;
                console.warn(`File with name ${file.name} already exists and will be skipped.`);
            } else {
                filesToAdd.push(file);
                currentFileNames.add(file.name);
            }
        });

        if (hasDuplicates) {
            setAlert(true);
            setTimeout(() => setAlert(false), 3000);
        }

        // Actualizamos el estado con todos los archivos nuevos de una vez
        if (filesToAdd.length > 0) {
            setDocs(prevDocs => [...prevDocs, ...filesToAdd]);
        }
    } catch (error) {
        console.error('Error reading files:', error);
    }
};

export { moveUpDoc, moveDownDoc, deleteDoc, addDocs };