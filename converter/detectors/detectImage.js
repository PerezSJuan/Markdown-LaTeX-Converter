import { Token, TokenTypes } from '../tokenCreator.js';

export const detectImageAt = (text, startIndex) => {
    // Detectar ![alt](url)
    const remainingText = text.substring(startIndex);
    
    const match = remainingText.match(/^!\[([^\]]*)\]\(([^\)]+)\)/);
    if (!match) return null;
    
    const alt = match[1];
    const url = match[2];
    const matchLength = match[0].length;
    
    return new Token(
        TokenTypes.IMAGE,
        url,
        {
            startIndex,
            endIndex: startIndex + matchLength,
            alt
        }
    );
};
