const tables = (markdown) => {
    const lines = markdown
        .trim()
        .split("\n")
        .filter((line) => line.trim() !== "");
    if (lines.length < 3) {
        return ""; // Tabla inválida: necesita al menos header, separator y una fila
    }

    // Línea 1: Headers
    const headerLine = lines[0].trim();
    if (!headerLine.startsWith("|") || !headerLine.endsWith("|")) {
        return ""; // No es una tabla Markdown válida
    }
    const headers = headerLine
        .split("|")
        .slice(1, -1)
        .map((h) => h.trim())
        .filter((h) => h !== "");

    // Línea 2: Separator para alineamientos
    const separatorLine = lines[1].trim();
    const alignments = separatorLine
        .split("|")
        .slice(1, -1)
        .map((cell) => {
            const trimmed = cell.trim();
            if (trimmed.startsWith(":") && trimmed.endsWith(":")) {
                return "c"; // Centrado
            } else if (trimmed.startsWith(":")) {
                return "l"; // Izquierda
            } else if (trimmed.endsWith(":")) {
                return "r"; // Derecha
            } else {
                return "l"; // Por defecto izquierda
            }
        });

    // Resto de líneas: Rows de datos
    const rows = lines
        .slice(2)
        .map((line) => {
            if (!line.startsWith("|") || !line.endsWith("|")) {
                return null; // Ignorar líneas inválidas
            }
            return line
                .split("|")
                .slice(1, -1)
                .map((cell) => cell.trim())
                .filter((cell) => cell !== "");
        })
        .filter((row) => row.length > 0 && row.length === headers.length);

    if (rows.length === 0 || headers.length === 0) {
        return ""; // Sin datos válidos
    }

    // Construir el preamble de tabular
    const tabularPreamble =
        "{" + alignments.map((align) => `|${align}`).join("") + "|}";

    // Headers en LaTeX
    const headerRow = headers
        .map((h) =>
            h.replace(/&/g, "\\&").replace(/%/g, "\\%").replace(/$/g, "\\$")
        )
        .join(" & ");

    // Rows en LaTeX
    const dataRows = rows.map((row) =>
        row
            .map((cell) =>
                cell.replace(/&/g, "\\&").replace(/%/g, "\\%").replace(/$/g, "\\$")
            )
            .join(" & ")
    );

    // Ensamblar la tabla LaTeX
    let latex = "\\begin{tabular}" + tabularPreamble + "\n";
    latex += "\\hline\n";
    latex += headerRow + " \\\\\n";
    latex += "\\hline\n";
    dataRows.forEach((row) => {
        latex += row + " \\\\\n";
    });
    latex += "\\hline\n";
    latex += "\\end{tabular}";

    return latex;
}

export default tables;