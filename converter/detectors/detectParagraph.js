import { Token, TokenTypes } from '../tokenCreator.js';

export const detectParagraph = (content) => {
    if (!content || content.trim() === '') return null;
    
    return new Token(
        TokenTypes.PARAGRAPH,
        content.trim(),
        {}
    );
};
