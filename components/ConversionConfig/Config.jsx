import { useState } from "react";
import "./Config.css";
import headingPlaceholder from "../ConversionConfig/headingPlaceholder";

const Config = ({ config, setConfig }) => {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <>
            {collapsed ? (
                <button className="CollapsedConfig" onClick={() => setCollapsed(false)}>Configuration</button>
            ) : (
                <>
                    <button className="Collapse" onClick={() => setCollapsed(true)}>Configuration</button>
                    <div className="Config">
                        <h2 className="ConfigTitle">Configuration</h2>
                        <div className="FileName">
                            <label className="ConfigLabel">File name (do not include .tex)</label>
                            <input
                                type="text"
                                placeholder="Title"
                                onChange={(e) => setConfig(prev => ({ ...prev, filename: e.target.value }))}
                            ></input>
                        </div>
                        <div className="Heading">
                            <label className="ConfigLabel">Heading</label>
                            <textarea
                                type="text"
                                className="HeadingEditor"
                                placeholder={headingPlaceholder}
                                onChange={(e) => setConfig(prev => ({ ...prev, heading: e.target.value }))}
                            ></textarea>
                        </div>
                        <div className="TextWithChapters">
                            <label className="ConfigLabel">Text with chapters</label>
                            <input
                                type="checkbox"
                                checked={config.textWithChapters}
                                onChange={(e) => setConfig(prev => ({ ...prev, textWithChapters: e.target.checked }))}
                            ></input>
                        </div>
                        <div className="divideBigEquations">
                            <label className="ConfigLabel">Divide big equations in multiple lines</label>
                            <input
                                type="checkbox"
                                checked={config.divideBigEquations}
                                onChange={(e) => setConfig(prev => ({ ...prev, divideBigEquations: e.target.checked }))}
                            ></input>
                        </div>
                        <div className="imageRoutes">
                            <label className="ConfigLabel">Configure the main route for images</label>
                            <input
                                type="text"
                                placeholder="/image"
                                onChange={(e) => setConfig(prev => ({ ...prev, imageRoutes: e.target.value }))}
                            ></input>
                        </div>
                        <div className="spaceBetweenElements">
                            <label className="ConfigLabel">Choose the separation between elements</label>
                            <select
                                value={config.spaceBetweenElements}
                                onChange={(e) => setConfig(prev => ({ ...prev, spaceBetweenElements: e.target.value }))}
                            >
                                <option value="small">Small</option>
                                <option value="medium">Medium</option>
                                <option value="big">Big</option>
                            </select>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Config;