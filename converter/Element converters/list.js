const list = (markdown) => {
    if (markdown.startsWith('1')) return numeratedList(markdown);
    else return itemizedList(markdown);
}

const itemizedList = (markdown) => {
    const lines = markdown.split('/\r?\n/');
    for (let line of lines) line = line.slice(2);
    return `
    \\ begin{itemize}\n
    ${lines.map(line => listItem(line))}
    \\end{itemize}\n
    `;
}

const numeratedList = (markdown) => {
    const lines = markdown.split('/\r?\n/');
    for (let line of lines) line = line.slice(3);
    return `
    \\ begin{enumerate}\n
    ${lines.map(line => listItem(line))}
    \\end{enumerate}\n
    `;
}

const listItem = (markdown) => `\\item ${markdown}\n`;

export default list;