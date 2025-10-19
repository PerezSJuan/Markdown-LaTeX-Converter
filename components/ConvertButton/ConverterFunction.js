import convertMDtoLaTex from "/converter/converter";
import headingPlaceholder from "../ConversionConfig/headingPlaceholder";

const Converter = (markdown, config) => {
    const latexBody = convertMDtoLaTex(markdown, {
        textWithChapters: config.textWithChapters,
        divideBigEquations: config.divideBigEquations,
        imageRoutes: config.imageRoutes,
        spaceBetweenElements: config.spaceBetweenElements
    })

    let latexHeading = '';
    if (config.heading === '') latexHeading = headingPlaceholder;
    else latexHeading = config.heading;


    const latexEnd = `\\end {document}`;
    const latex = latexHeading + `\n` + latexBody + `\n` + latexEnd;
    return latex;
}

export default Converter;