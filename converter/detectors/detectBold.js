import { Token, TokenTypes } from '../tokenCreator.js';

export const detectBoldAt = (text, startIndex) => {
    // Detectar **texto** o __texto__
    const remainingText = text.substring(startIndex);
    
    // Verificar si empieza con ** o __
    if (remainingText.startsWith('**')) {
        const endIndex = remainingText.indexOf('**', 2);
        if (endIndex !== -1) {
            const content = remainingText.substring(2, endIndex);
            return new Token(
                TokenTypes.BOLD,
                content,
                {
                    startIndex,
                    endIndex: startIndex + endIndex + 2
                }
            );
        }
    } else if (remainingText.startsWith('__')) {
        const endIndex = remainingText.indexOf('__', 2);
        if (endIndex !== -1) {
            const content = remainingText.substring(2, endIndex);
            return new Token(
                TokenTypes.BOLD,
                content,
                {
                    startIndex,
                    endIndex: startIndex + endIndex + 2
                }
            );
        }
    }
    
    return null;
};
