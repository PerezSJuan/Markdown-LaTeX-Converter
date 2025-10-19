import { Token, TokenTypes } from '../tokenCreator.js';

// Detector para código inline (`código`)
export const detectCodeAt = (text, startIndex) => {
    const remainingText = text.substring(startIndex);
    
    // Verificar si empieza con `
    if (remainingText.startsWith('`')) {
        const endIndex = remainingText.indexOf('`', 1);
        if (endIndex !== -1) {
            const content = remainingText.substring(1, endIndex);
            return new Token(
                TokenTypes.CODE,
                content,
                {
                    startIndex,
                    endIndex: startIndex + endIndex + 1,
                    isInline: true
                }
            );
        }
    }
    
    return null;
};

// Detector para bloques de código (```)
export const detectCodeBlockAt = (lines, index) => {
    const line = lines[index];
    
    // Verificar si comienza con ```
    if (!line.trim().startsWith('```')) {
        return null;
    }
    
    let endIndex = index;
    let content = [];
    let language = '';
    
    // Obtener el lenguaje (si está especificado)
    const firstLine = line.trim();
    if (firstLine.length > 3) {
        language = firstLine.substring(3).trim();
    }
    
    // Buscar el cierre ```
    let foundEnd = false;
    for (let i = index + 1; i < lines.length; i++) {
        const currentLine = lines[i];
        
        // Verificar si es la línea de cierre
        if (currentLine.trim() === '```') {
            endIndex = i;
            foundEnd = true;
            break;
        }
        
        content.push(currentLine);
    }
    
    // Si no encontramos el cierre, no es un bloque de código válido
    if (!foundEnd) {
        return null;
    }
    
    return {
        token: new Token(
            TokenTypes.CODE,
            content.join('\n'),
            { 
                isBlock: true,
                language: language || 'text'
            }
        ),
        linesConsumed: endIndex - index + 1
    };
};