const titleText = (markdown, options = {}) => {
    // Normalize the input line (remove a single trailing newline if present)
    const line = typeof markdown === 'string' ? markdown.replace(/\r?\n$/, '') : '';

    // Count only leading '#' characters (ATX heading). Do not count '#' inside the text.
    let i = 0;
    while (i < line.length && line[i] === '#') i++;
    let level = i;

    // Text after the leading hashes
    let text = line.slice(level).trim();

    // Strip optional closing hashes per Markdown spec (e.g., "## Title ##")
    if (/#/.test(text)) {
        text = text.replace(/\s*#+\s*$/, '').trim();
    }

    // If there's no text after hashes, it's not a heading
    if (!text) {
        return markdown; // Return original markdown if it's not a valid heading
    }

    // Adjust level based on options
    if (options.textWithChapters) {
        level = Math.max(1, level); // Chapter is level 1
    } else {
        level = Math.max(1, level + 1); // Section is level 2 if no chapters
    }

    // Clamp to valid LaTeX heading levels
    level = Math.min(level, 6);

    switch (level) {
        case 1: return `\\chapter{${text}}\n`;
        case 2: return `\\section{${text}}\n`;
        case 3: return `\\subsection{${text}}\n`;
        case 4: return `\\subsubsection{${text}}\n`;
        case 5: return `\\paragraph{${text}}\n`;
        case 6: return `\\subparagraph{${text}}\n`;
        default: return markdown; // Return original markdown if not a heading
    }
}

export default titleText;
