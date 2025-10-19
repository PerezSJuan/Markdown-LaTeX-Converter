import { Token, TokenTypes } from '../tokenCreator.js';

export const detectStrikethroughAt = (text, startIndex) => {
    // Detectar ~~texto~~
    const remainingText = text.substring(startIndex);
    
    const match = remainingText.match(/^~~([^~]+)~~/);
    if (!match) return null;
    
    const content = match[1];
    const matchLength = match[0].length;
    
    return new Token(
        TokenTypes.STRIKETHROUGH,
        content,
        {
            startIndex,
            endIndex: startIndex + matchLength
        }
    );
};
