import TopBar from "../components/TopBar/TopBar";
import DocumentBox from "../components/DocumentBox/DocumentBox";
import Config from "../components/ConversionConfig/Config";
import Info from "../components/Info/Info";
import ConvertButton from "../components/ConvertButton/Converter";
import { LatexInfo, LatexInfoButton } from "../components/LatexInfo/LatexInfo";

import "./App.css";

import { useState } from "react";


function App() {
  const [config, setConfig] = useState({
    filename: `document.tex`,
    heading: ``,
    textWithChapters: false,
    divideBigEquations: true,
    imageRoutes: '/image',
    spaceBetweenElements: 'big'
  });

  const [docs, setDocs] = useState([]);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="App">
      {showInfo ? (
        <>
        <TopBar />
        <LatexInfo />
        <LatexInfoButton showInfo={showInfo} setShowInfo={setShowInfo} />
      </>
      ) : (
        <>
          <TopBar />
          <Info />
          <DocumentBox docs={docs} setDocs={setDocs} />
          <Config config={config} setConfig={setConfig} />
          <ConvertButton docs={docs} config={config} />
          <LatexInfoButton showInfo={showInfo} setShowInfo={setShowInfo} />
        </>
      )}

    </div>
  )
}

export default App
