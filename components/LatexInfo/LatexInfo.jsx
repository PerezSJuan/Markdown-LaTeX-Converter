import React from 'react';
import "./LatexInfo.css";

const LatexInfo = () => {
    return (
        <div className="latex-info-container">
            <h1>What is LaTeX?</h1>
            <p>
                LaTeX is a high-quality typesetting system, specifically designed for creating scientific, technical, and academic documents. Unlike "What You See Is What You Get" (WYSIWYG) word processors like Word, LaTeX is based on a markup language where you define the structure and content of your document, and the system handles the presentation.
            </p>

            <h2>Advantages of LaTeX vs. Markdown</h2>
            <ul>
                <li>
                    <strong>Superior typographic quality:</strong> LaTeX produces documents with a professional aesthetic and typographic quality, ideal for publications.
                </li>
                <li>
                    <strong>Handling complex mathematics:</strong> Its strength lies in typesetting mathematical, scientific, and technical equations and formulas in an elegant and precise manner.
                </li>
                <li>
                    <strong>Structure and consistency:</strong> Facilitates the creation of documents with complex structures (chapters, sections, indexes, cross-references) while maintaining impeccable consistency.
                </li>
                <li>
                    <strong>Task automation:</strong> Automatically generates tables of contents, lists of figures, bibliographies, and citations, saving time and reducing errors.
                </li>
                <li>
                    <strong>Portability and stability:</strong> LaTeX files are plain text, making them highly portable and stable over time.
                </li>
                <li>
                    <strong>Total control:</strong> Offers granular control over every aspect of the document's design, from margins to fonts.
                </li>
            </ul>

            <h2>How to Use and Export Documents with LaTeX</h2>
            <h3>1. Write the document (.tex)</h3>
            <p>
                A LaTeX document is written in a plain text file with the <code>.tex</code> extension. You use specific commands to format text, insert images, create equations, etc.
            </p>
            <pre><code>{`\\documentclass{article}
\\title{My First LaTeX Document}
\\author{Your Name}
\\date{October 2025}

\\begin{document}
    \\maketitle
    \\section{Introduction}
    This is an example of a simple LaTeX document.
    Here is an equation:
    \\[ E=mc^2 \\]
    \\subsection{Subsection}
    You can add more content here.
\\end{document}`}</code></pre>

            <h3>2. Compile the document</h3>
            <p>
                To convert your <code>.tex</code> file into a readable document (usually PDF), you need a LaTeX compiler (such as pdfLaTeX, XeLaTeX, or LuaLaTeX). You can use tools like TeX Live or MiKTeX on your local system, or online editors like Overleaf.
            </p>
            <p>
                The compilation process generates several auxiliary files and, finally, the PDF file.
            </p>

            <h3>3. Export the document (PDF)</h3>
            <p>
                Once compiled, the main result is a PDF file. This PDF is the final document that you can share, print, or publish. In local environments, the compiler saves it in the same folder as your <code>.tex</code> file. In online editors, there are options to download the PDF directly.
            </p>

            <h3>Example workflow:</h3>
            <ol>
                <li>Write your content in <code>my_document.tex</code>.</li>
                <li>Open a terminal and navigate to the folder where you saved the file.</li>
                <li>Run the compilation command, for example: <code>pdflatex my_document.tex</code>.</li>
                <li>If there are references or a bibliography, you might need to compile multiple times or use <code>bibtex</code>/<code>biber</code>.</li>
                <li>Open the generated <code>my_document.pdf</code> file.</li>
            </ol>
        </div>
    );
};

const LatexInfoButton = ({ showInfo, setShowInfo }) => {
    return (
        showInfo ? (
            <button className="hideInfo" onClick={() => setShowInfo(false)}>
                Return to converter
            </button>
        ) : (
            <button className="infoButton" onClick={() => setShowInfo(true)}>
                What is LaTeX?
            </button>
        )
    )
}

export { LatexInfo, LatexInfoButton };