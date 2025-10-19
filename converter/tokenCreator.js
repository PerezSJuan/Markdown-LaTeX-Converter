import { detectParagraph } from './detectors/detectParagraph.js';
import { detectHeading } from './detectors/detectHeading.js';
import { detectBoldAt } from './detectors/detectBold.js';
import { detectItalicAt } from './detectors/detectItalic.js';
import { detectStrikethroughAt } from './detectors/detectStrikethrough.js';
import { detectImageAt } from './detectors/detectImage.js';
import { detectEquationAt } from './detectors/detectEquation.js';
import { detectTableAt } from './detectors/detectTable.js';
import { detectListItemAt } from './detectors/detectListItem.js';
import { detectHorizontalRuleAt } from './detectors/detectHorizontalRule.js';
import { detectHorizontalSpaceAt } from './detectors/detectHorizontalSpace.js';
import { detectLinkAt } from './detectors/detectLink.js';
import { detectCodeAt, detectCodeBlockAt } from './detectors/detectCode.js';

const TokenTypes = {
    TEXT: 'TEXT',
    PARAGRAPH: 'PARAGRAPH',
    HEADING: 'HEADING',
    BOLD: 'BOLD',
    ITALIC: 'ITALIC',
    STRIKETHROUGH: 'STRIKETHROUGH',
    IMAGE: 'IMAGE',
    EQUATION: 'EQUATION',
    TABLE: 'TABLE',
    LIST_ITEM: 'LIST_ITEM',
    HORIZONTAL_RULE: 'HORIZONTAL_RULE',
    HORIZONTAL_SPACE: 'HORIZONTAL_SPACE',
    LINK: 'LINK',
    CODE: 'CODE'
};

// Clase para representar un token con su tipo y contenido
class Token {
    constructor(type, content, metadata = {}) {
        this.type = type;
        this.content = content;
        this.metadata = metadata;
        this.children = [];
    }

    addChild(token) {
        this.children.push(token);
    }
}

// Helper function to process inline content
const processInlineContent = (content) => {
    if (!content) return [];
    
    const inlineDetectors = [
        detectImageAt,
        detectLinkAt,
        detectCodeAt,  // Código inline
        detectBoldAt,  // Debe ir antes de italic para priorizar **
        detectItalicAt,
        detectStrikethroughAt,
    ];
    
    const inlineTokens = [];
    let i = 0;
    
    while (i < content.length) {
        let bestMatch = null;
        let bestMatchStartIndex = content.length;
        
        // Buscar en posiciones desde i en adelante
        for (let searchPos = i; searchPos < content.length && !bestMatch; searchPos++) {
            for (const detector of inlineDetectors) {
                const result = detector(content, searchPos);
                if (result && result.metadata.startIndex === searchPos) {
                    // Encontramos un match, usarlo
                    bestMatch = result;
                    bestMatchStartIndex = searchPos;
                    break;  // Usar el primero que coincida (prioridad por orden)
                }
            }
        }
        
        if (bestMatch) {
            if (bestMatchStartIndex > i) {
                // Hay texto antes del match
                inlineTokens.push(new Token(TokenTypes.TEXT, content.substring(i, bestMatchStartIndex)));
            }
            bestMatch.children = processInlineContent(bestMatch.content);
            inlineTokens.push(bestMatch);
            i = bestMatch.metadata.endIndex;
        } else {
            // No hay más matches, el resto es texto
            inlineTokens.push(new Token(TokenTypes.TEXT, content.substring(i)));
            break;
        }
    }
    
    return inlineTokens;
};

// Main exported tokenize function - line by line approach
const tokenize = (markdown) => {
    // Normalizar saltos de línea
    markdown = String(markdown).replace(/\r\n/g, '\n');
    
    // Dividir en líneas
    const lines = markdown.split('\n');
    const tokens = [];
    let paragraphBuffer = [];
    let i = 0;
    
    // Función auxiliar para vaciar el buffer de párrafo
    const flushParagraph = () => {
        if (paragraphBuffer.length > 0) {
            const paragraphContent = paragraphBuffer.join('\n');
            const paragraphToken = detectParagraph(paragraphContent);
            if (paragraphToken) {
                // Procesar contenido inline del párrafo
                paragraphToken.children = processInlineContent(paragraphToken.content);
                tokens.push(paragraphToken);
            }
            paragraphBuffer = [];
        }
    };
    
    while (i < lines.length) {
        const line = lines[i];
        let blockDetected = null;
        
        // Detectar bloques en orden de prioridad
        
        // 1. Espacio horizontal (líneas vacías)
        blockDetected = detectHorizontalSpaceAt(line);
        if (blockDetected) {
            flushParagraph();
            tokens.push(blockDetected);
            i++;
            continue;
        }
        
        // 2. Encabezado
        blockDetected = detectHeading(line);
        if (blockDetected) {
            flushParagraph();
            tokens.push(blockDetected);
            i++;
            continue;
        }
        
        // 3. Regla horizontal
        blockDetected = detectHorizontalRuleAt(line);
        if (blockDetected) {
            flushParagraph();
            tokens.push(blockDetected);
            i++;
            continue;
        }
        
        // 4. Ecuación (bloques $$)
        const equationResult = detectEquationAt(lines, i);
        if (equationResult) {
            flushParagraph();
            tokens.push(equationResult.token);
            i += equationResult.linesConsumed;
            continue;
        }
        
        // 5. Bloque de código (```)
        const codeResult = detectCodeBlockAt(lines, i);
        if (codeResult) {
            flushParagraph();
            tokens.push(codeResult.token);
            i += codeResult.linesConsumed;
            continue;
        }
        
        // 6. Tabla
        const tableResult = detectTableAt(lines, i);
        if (tableResult) {
            flushParagraph();
            // Procesar contenido inline en las celdas de la tabla
            if (tableResult.token.metadata.structure) {
                tableResult.token.metadata.structure.headers = tableResult.token.metadata.structure.headers.map(processInlineContent);
                tableResult.token.metadata.structure.rows = tableResult.token.metadata.structure.rows.map(row => row.map(processInlineContent));
            }
            tokens.push(tableResult.token);
            i += tableResult.linesConsumed;
            continue;
        }
        
        // 7. Item de lista
        const listResult = detectListItemAt(lines, i);
        if (listResult) {
            flushParagraph();
            // Procesar contenido inline del item de lista
            listResult.token.children = processInlineContent(listResult.token.content);
            tokens.push(listResult.token);
            i += listResult.linesConsumed;
            continue;
        }
        
        // Si no se detectó nada, agregar al buffer de párrafo
        paragraphBuffer.push(line);
        i++;
    }
    
    // Vaciar el buffer pendiente al final
    flushParagraph();
    
    return tokens;
};

export { TokenTypes, Token, tokenize };