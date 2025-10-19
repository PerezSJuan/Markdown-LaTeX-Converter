// Converter para tokens de código (tanto inline como bloques)
// Requiere el paquete minted para bloques de código
const codeConverter = (token) => {
    // Verificar si es código inline
    if (token.metadata.isInline) {
        // Para código inline usar \texttt{} o \verb||
        const content = token.content;
        // Escapar caracteres especiales de LaTeX
        const escapedContent = content
            .replace(/\\/g, '\\textbackslash{}')
            .replace(/{/g, '\\{')
            .replace(/}/g, '\\}')
            .replace(/\$/g, '\\$')
            .replace(/%/g, '\\%')
            .replace(/&/g, '\\&')
            .replace(/#/g, '\\#')
            .replace(/\^/g, '\\textasciicircum{}')
            .replace(/_/g, '\\_')
            .replace(/~/g, '\\textasciitilde{}');
        
        return `\\texttt{${escapedContent}}`;
    }
    
    // Para bloques de código
    const language = token.metadata.language || 'text';
    const content = token.content;
    
    // Si no hay contenido, retornar bloque vacío
    if (!content.trim()) {
        return `\n\\begin{minted}{${language}}\n\n\\end{minted}\n`;
    }
    
    return `\n\\begin{minted}{${language}}\n${content}\n\\end{minted}\n`;
};

export default codeConverter;
