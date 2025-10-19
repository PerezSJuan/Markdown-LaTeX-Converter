import { Token, TokenTypes } from '../tokenCreator.js';

export const detectListItemAt = (lines, index) => {
    const line = lines[index];
    
    // Detectar listas no ordenadas (-, *, +) y ordenadas (1., 2., etc.)
    const unorderedMatch = line.match(/^(\s*)([-*+])\s+(.+)$/);
    const orderedMatch = line.match(/^(\s*)(\d+)\.\s+(.+)$/);
    
    if (!unorderedMatch && !orderedMatch) return null;
    
    const match = unorderedMatch || orderedMatch;
    const indent = match[1].length;
    const marker = match[2];
    const content = match[3];
    const isOrdered = !!orderedMatch;
    
    // Recoger líneas adicionales que pertenecen a este item
    let fullContent = content;
    let endIndex = index;
    
    for (let i = index + 1; i < lines.length; i++) {
        const nextLine = lines[i];
        
        // Si la siguiente línea está indentada, es parte del item actual
        if (nextLine.match(/^\s{2,}.+/) && !nextLine.match(/^(\s*)([-*+])\s+/) && !nextLine.match(/^(\s*)(\d+)\.\s+/)) {
            fullContent += '\n' + nextLine.trim();
            endIndex = i;
        } else {
            break;
        }
    }
    
    return {
        token: new Token(
            TokenTypes.LIST_ITEM,
            fullContent,
            {
                indent,
                marker,
                isOrdered
            }
        ),
        linesConsumed: endIndex - index + 1
    };
};
