const equations = (markdown, options) => {
    for (let letter of markdown) if (letter === '$') letter = '';
    if (options.divideBigEquations)
    {
        const substring = markdown.split('=') + `= \\\\`;
        let ecuacionSeparada = '';
        for (let part of substring) ecuacionSeparada += part; 
        return `
            \\begin{equation}\n
            \\begin{multline}\n
                ${ecuacionSeparada}\n
            \\end{multline}\n
            \\end{equation}\n
        `;
    }else return `$$${markdown}$$`;
}

export default equations;