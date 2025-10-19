import { Token, TokenTypes } from '../tokenCreator.js';

// Detector para ecuaciones de bloque ($$...$$)
export const detectEquationAt = (lines, index) => {
    const line = lines[index];
    
    // Verificar si comienza con $$
    if (!line.trim().startsWith('$$')) {
        return null;
    }
    
    let endIndex = index;
    let content = '';
    
    // Buscar el cierre $$
    for (let i = index; i < lines.length; i++) {
        const currentLine = lines[i];
        content += (i > index ? '\n' : '') + currentLine;
        
        // Verificar si termina en esta línea
        if (i > index && currentLine.trim().endsWith('$$')) {
            endIndex = i;
            break;
        }
        
        // Si es la misma línea y tiene $$ al inicio y al final
        if (i === index && currentLine.trim().endsWith('$$') && currentLine.trim().length > 4) {
            endIndex = i;
            break;
        }
    }
    
    // Si no encontramos el cierre, no es una ecuación válida
    if (endIndex === index && !lines[index].trim().endsWith('$$')) {
        return null;
    }
    
    // Eliminar los delimitadores $$
    content = content.trim().replace(/^\$\$/, '').replace(/\$\$$/, '').trim();
    
    return {
        token: new Token(
            TokenTypes.EQUATION,
            content,
            { isBlock: true }
        ),
        linesConsumed: endIndex - index + 1
    };
};
