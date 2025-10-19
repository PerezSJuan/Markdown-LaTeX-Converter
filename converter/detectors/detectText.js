import { Token, TokenTypes } from '../tokenCreator.js';

export const detectText = (text, startIndex) => {
    if (startIndex >= text.length) return null;
    
    return new Token(
        TokenTypes.TEXT,
        text.substring(startIndex),
        {
            startIndex,
            endIndex: text.length
        }
    );
};
