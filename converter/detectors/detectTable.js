import { Token, TokenTypes } from '../tokenCreator.js';

export const detectTableAt = (lines, index) => {
    const line = lines[index];
    
    // Verificar si la línea parece ser una tabla (contiene |)
    if (!line.includes('|')) {
        return null;
    }
    
    const tableLines = [];
    let endIndex = index;
    
    // Recoger todas las líneas de la tabla
    for (let i = index; i < lines.length; i++) {
        const currentLine = lines[i];
        
        // Si la línea no contiene | y no es la línea separadora, la tabla ha terminado
        if (!currentLine.includes('|') && !currentLine.includes('-')) {
            break;
        }
        
        tableLines.push(currentLine);
        endIndex = i;
        
        // Si esta fue la línea separadora, verificar que la siguiente línea tenga |
        if (currentLine.includes('-') && !currentLine.includes('|')) {
            if (i + 1 < lines.length && !lines[i + 1].includes('|')) {
                // No es una tabla, es solo texto con guiones
                return null;
            }
        }
    }
    
    if (tableLines.length < 3) { // Necesitamos al menos: header, separator, data
        return null;
    }
    
    // Procesar la estructura de la tabla
    const tableContent = tableLines.join('\n');
    const cells = tableLines.map(line => 
        line.split('|')
            .filter(cell => cell.length > 0) // Eliminar células vacías del principio/final
            .map(cell => cell.trim())
    );
    
    return {
        token: new Token(
            TokenTypes.TABLE,
            tableContent,
            {
                structure: {
                    headers: cells[0],
                    alignments: cells[1].map(cell => {
                        if (cell.startsWith(':') && cell.endsWith(':')) return 'center';
                        if (cell.endsWith(':')) return 'right';
                        return 'left';
                    }),
                    rows: cells.slice(2)
                }
            }
        ),
        linesConsumed: endIndex - index + 1
    };
};
