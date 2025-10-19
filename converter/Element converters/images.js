// required the \usepackage{graphicx}

const image = (markdown, options) =>{
    const info = extractMarkdownLink(markdown);
    if (info.url.beginsWith('http') || info.url.beginswith('www')) {
        return `
        \\begin{figure}[h]\n
            \\centering\n
            \\includegraphics[width=1\\linewidth]{${info.url}}\n
            \\caption{${info.alt}}\n
            \\label{fig:placeholder2}\n
        \\end{figure}\n
        `;
    } else {
        return `
        \\begin{figure}[h]\n
            \\centering\n
            \\includegraphics[width=1\\linewidth]{${options.imageRoutes}/${info.url}}\n
            \\caption{${info.alt}}\n
            \\label{fig:placeholder2}\n
        \\end{figure}\n
        `;
    }
}

const extractMarkdownLink = (image) => {
    const regex = /!\[([^\]]*)\]\(([^)]*)\)/;
    const match = image.match(regex);
    if (match) {
        return {
            alt: match[1],
            url: match[2]
        };
    }
}

export default image;