import { Token, TokenTypes } from '../tokenCreator.js';

export const detectLinkAt = (text, startIndex) => {
    // Detectar [texto](url)
    const remainingText = text.substring(startIndex);
    
    const match = remainingText.match(/^\[([^\]]+)\]\(([^\)]+)\)/);
    if (!match) return null;
    
    const linkText = match[1];
    const url = match[2];
    const matchLength = match[0].length;
    
    return new Token(
        TokenTypes.LINK,
        linkText,
        {
            startIndex,
            endIndex: startIndex + matchLength,
            url
        }
    );
};
