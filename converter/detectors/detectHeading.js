import { Token, TokenTypes } from '../tokenCreator.js';

export const detectHeading = (line) => {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (!match) return null;
    
    const level = match[1].length;
    const content = match[2];
    
    return new Token(
        TokenTypes.HEADING,
        content,
        { level }
    );
};
