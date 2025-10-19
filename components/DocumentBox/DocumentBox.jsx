import { useState, useEffect } from "react";
import "./DocumentBox.css";
import { useDarkMode } from '../../src/contexts/DarkModeContext';
import { moveUpDoc, moveDownDoc, deleteDoc, addDocs } from "./DocManager";

import upArrow from "/images/UpArrow.webp";
import upArrowDark from "/images/UpArrowDark.webp";
import downArrow from "/images/DownArrow.webp";
import downArrowDark from "/images/DownArrowDark.webp";
import deleteIcon from "/images/X.webp";
import deleteIconDark from "/images/XDark.webp";

const DocumentBox = ({ docs, setDocs }) => {
    const [error, setError] = useState([]);
    const [alert, setAlert] = useState(false);

    const { isDarkMode } = useDarkMode();
    useEffect(() => {
        setError([]);
        for (let i = 0; i < docs.length; i++) if (!docs[i].name.endsWith(".md")) setError(prev => [...prev, docs[i].name]);
    }, [docs]);

    return (
        <>
            <div className="documentBox">
                <input
                    type="file"
                    id="file"
                    className="inputFile"
                    onChange={e => {
                        if (e.target.files.length > 0) {
                            void addDocs(docs, setDocs, setAlert, e.target.files);
                        }
                    }}
                    multiple
                />
                <label htmlFor="file" className="inputLabel">Choose a file</label>
                <div className="FileBox">
                    {docs.length > 0 ? docs.map((doc, i) => (
                        <div key={i} className="fileElement">
                            <h3 className="fileName">{i + 1}). {doc.name}</h3>
                            <button className="upButton" onClick={() => moveUpDoc(docs, setDocs, i)}>
                                <img className="upLogo" src={isDarkMode ? upArrowDark : upArrow} />
                            </button>
                            <button className="downButton" onClick={() => moveDownDoc(docs, setDocs, i)}>
                                <img className="downLogo" src={isDarkMode ? downArrowDark :downArrow} />
                            </button>
                            <button className="deleteButton" onClick={() => deleteDoc(docs, setDocs, i)}>
                                <img className="deleteLogo" src={isDarkMode ? deleteIconDark : deleteIcon} />
                            </button>
                        </div>
                    )) : null}
                </div>
                {error.length > 0 &&
                    <div className="errorBox">
                        <h3 className="errorTitle">These files are not in .md format:</h3>
                        {error.map((err, index) => <p key={index} className="errorText">{err}</p>)}
                    </div>
                }
            </div>
            <div className="alertContainer">
                {alert && <div className="alertBox">
                    <h2 className="alertText">Some file names were repeated and have been skipped.</h2>
                </div>}
            </div>
        </>
    )
}

export default DocumentBox;