import equations from "./Element converters/equations.js";
import titleText from "./Element converters/titles.js";
import { TokenTypes, tokenize } from "./tokenCreator.js";
import { bold, italic } from "./Element converters/boldAndItalic.js";
import paragraph from "./Element converters/paragraph.js";
import strikethrough from "./Element converters/strikethrough.js";
import link from "./Element converters/link.js";
import image from "./Element converters/images.js";
import tables from "./Element converters/tables.js";
import listItem from "./Element converters/list.js";
import horizontalRule from "./Element converters/horizontalRule.js"
import horizontalSpace from "./Element converters/horizontalSpace.js";
import codeConverter from "./Element converters/codeConverter.js";

/*
Options  model
{
    textWithChapters = false,
    divideBigEquations = true,
    imageRoutes = '/image',
    spaceBetweenElements = 'big' (small, medium, big)
}
*/

// Función recursiva para procesar tokens y sus children
const processToken = (token, options) => {
    let result = '';
    
    switch (token.type) {
        case TokenTypes.HEADING:
            result += titleText(token.content, options);
            break;
        case TokenTypes.EQUATION:
            result += equations(token.content, options);
            break;
        case TokenTypes.BOLD:
            // Procesar children si existen, sino usar contenido directo
            if (token.children && token.children.length > 0) {
                const childrenContent = token.children.map(child => processToken(child, options)).join('');
                result += bold(childrenContent);
            } else {
                result += bold(token.content);
            }
            break;
        case TokenTypes.ITALIC:
            if (token.children && token.children.length > 0) {
                const childrenContent = token.children.map(child => processToken(child, options)).join('');
                result += italic(childrenContent);
            } else {
                result += italic(token.content);
            }
            break;
        case TokenTypes.PARAGRAPH:
            if (token.children && token.children.length > 0) {
                const childrenContent = token.children.map(child => processToken(child, options)).join('');
                result += paragraph(childrenContent);
            } else {
                result += paragraph(token.content);
            }
            break;
        case TokenTypes.TEXT:
            result += token.content;
            break;
        case TokenTypes.STRIKETHROUGH:
            if (token.children && token.children.length > 0) {
                const childrenContent = token.children.map(child => processToken(child, options)).join('');
                result += strikethrough(childrenContent);
            } else {
                result += strikethrough(token.content);
            }
            break;
        case TokenTypes.LINK:
            result += link(token.content);
            break;
        case TokenTypes.IMAGE:
            result += image(token.content, options);
            break;
        case TokenTypes.TABLE:
            result += tables(token.content);
            break;
        case TokenTypes.LIST_ITEM:
            if (token.children && token.children.length > 0) {
                const childrenContent = token.children.map(child => processToken(child, options)).join('');
                result += listItem(childrenContent);
            } else {
                result += listItem(token.content);
            }
            break;
        case TokenTypes.HORIZONTAL_RULE:
            result += horizontalRule();
            break;
        case TokenTypes.HORIZONTAL_SPACE:
            result += horizontalSpace(options);
            break;
        case TokenTypes.CODE:
            result += codeConverter(token);
            break;
        default:
            console.warn("Token no reconocido");
            console.log(`ver token ${token}`)
            break;
    }
    
    return result;
};

const convertMDtoLaTex = (markdown, options = {}) => {
    const defaultOptions = {
        textWithChapters: false,
        divideBigEquations: true,
        imageRoutes: '/image',
        spaceBetweenElements: 'big' 
    }

    options = { ...defaultOptions, ...options };

    const tokens = tokenize(markdown);
    let result = '';

    tokens.forEach(token => {
        result += processToken(token, options);
    });

    return result;
}


export default convertMDtoLaTex;