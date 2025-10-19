import { Token, TokenTypes } from '../tokenCreator.js';

export const detectHorizontalSpaceAt = (line) => {
    // Detecta líneas vacías o con solo espacios
    if (line.trim() === '') {
        return new Token(
            TokenTypes.HORIZONTAL_SPACE,
            '',
            {}
        );
    }
    return null;
};
