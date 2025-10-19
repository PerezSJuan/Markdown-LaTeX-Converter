import "./ConvertButton.css";
import { useState, useEffect } from "react";

import downloadFile from "./downloadFile";
import Converter from "./ConverterFunction";


const CanConvert = (docs) => {
    if (docs.length === 0) return false;
    for (let i = 0; i < docs.length; i++) {
        if (!docs[i].name.endsWith(".md")) return false;
    }
    return true;
}

const ConvertButton = ({ docs, config }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("document.tex");

    const [error, setError] = useState(true);



    // Reset states when docs or config changes
    useEffect(() => {
        setIsLoaded(false);
        setFile(null);
        if (CanConvert(docs)) setError(false);
        else setError(true);
    }, [docs, config]);

    const handleConvert = () => {
        console.log("converting...");
        if (!CanConvert(docs)) return;
        if (config.filename !== '') setFileName(config.filename + ".tex");
        else setFileName("document.tex");

        const result = Converter(docs.map(d => d.content.join('\n')), config);
        setFile(result);
        setIsLoaded(true);
        console.log("loaded");
    }

    return (
        <div className="ConvertButtonContainer">
            {isLoaded ? (
                <>
                    <div>
                        <button
                            className="DownloadButton"
                            onClick={() => {
                                try {
                                    if (!file || !fileName) {
                                        console.error("No hay contenido para descargar");
                                        setIsLoaded(false);
                                        return;
                                    }
                                    downloadFile(fileName, file);
                                } catch (error) {
                                    console.error("Error al descargar:", error);
                                    setIsLoaded(false);
                                }
                            }}
                        >
                            Converted. Click to download
                        </button>
                    </div>
                </>
            ) : (
                <button className="ConvertButton" onClick={handleConvert} disabled={error}>
                    Convert to LaTeX
                </button>
            )}
        </div>
    )
}

export default ConvertButton;