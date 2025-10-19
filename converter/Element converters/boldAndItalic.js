const bold = (markdown) => `\\textbf{${markdown.substring(2, markdown.length - 2)}}`;
const italic = (markdown) => `\\textit{${markdown.substring(1, markdown.length - 1)}}`;

export { bold, italic };