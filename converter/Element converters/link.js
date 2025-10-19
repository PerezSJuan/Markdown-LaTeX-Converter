const link = (markdown) => {
    const info = extractMarkdownLink(markdown);
    return `\\href{${info.url}}{${info.text}}`;
}

const extractMarkdownLink = (link) => {
    const match = link.match(regex);
    const regex = /\[([^\]]*)\]\(([^)]*)\)/;

    if (match) {
        return {
            text: match[1],
            url: match[2]
        };
    } else {
        return null;
    }
}

export default link;