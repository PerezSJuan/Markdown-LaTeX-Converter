import { Token, TokenTypes } from '../tokenCreator.js';

export const detectItalicAt = (text, startIndex) => {
    // Detectar *texto* o _texto_ (pero no ** o __)
    const remainingText = text.substring(startIndex);
    
    // Verificar si empieza con * (pero no **)
    if (remainingText.startsWith('*') && !remainingText.startsWith('**')) {
        const endIndex = remainingText.indexOf('*', 1);
        if (endIndex !== -1 && !remainingText.startsWith('**', endIndex)) {
            const content = remainingText.substring(1, endIndex);
            return new Token(
                TokenTypes.ITALIC,
                content,
                {
                    startIndex,
                    endIndex: startIndex + endIndex + 1
                }
            );
        }
    } else if (remainingText.startsWith('_') && !remainingText.startsWith('__')) {
        const endIndex = remainingText.indexOf('_', 1);
        if (endIndex !== -1 && !remainingText.startsWith('__', endIndex)) {
            const content = remainingText.substring(1, endIndex);
            return new Token(
                TokenTypes.ITALIC,
                content,
                {
                    startIndex,
                    endIndex: startIndex + endIndex + 1
                }
            );
        }
    }
    
    return null;
};
