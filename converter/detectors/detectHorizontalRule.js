import { Token, TokenTypes } from '../tokenCreator.js';

export const detectHorizontalRuleAt = (line) => {
    // Detecta ---, ***, o ___
    const match = line.match(/^(\*{3,}|-{3,}|_{3,})$/);
    if (!match) return null;
    
    return new Token(
        TokenTypes.HORIZONTAL_RULE,
        line,
        {}
    );
};
