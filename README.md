# Markdown-LaTeX-Converter
Markdown LaTeX Converter is a powerful web application that bridges the gap between Markdown and LaTeX. This intuitive tool allows users to write content using easy Markdown syntax while incorporating complex mathematical equations and scientific notation through LaTeX, providing real-time preview and conversion capabilities.

## Features

*   **Real-time Conversion**: Instantly see your Markdown and LaTeX combined output.
*   **Bi-directional Editing**: Edit in Markdown and see the LaTeX equivalent, or vice-versa.
*   **LaTeX Support**: Seamlessly integrate complex mathematical expressions.
*   **Export Options**: Download your converted document in various formats (e.g., PDF, HTML).
*   **User-friendly Interface**: Clean and intuitive design for a smooth user experience.

## Installation

To set up the Markdown-LaTeX Converter locally, follow these steps:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/Markdown-LaTeX-Converter.git
    cd Markdown-LaTeX-Converter
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```

## Usage

1.  **Start the development server**:
    ```bash
    npm run dev
    ```
2.  Open your browser and navigate to `http://localhost:3000` (or the port indicated in your terminal).
3.  Start typing in the Markdown editor on the left.
4.  View the real-time preview on the right, including rendered LaTeX.

## Contributing

We welcome contributions! If you'd like to improve this project, please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

## Cómo funciona

Este proyecto convierte archivos Markdown (`.md`) a documentos LaTeX (`.tex`) a través de una aplicación web interactiva. A continuación, se detalla el flujo de trabajo:

1.  **Carga de archivos Markdown**:
    *   Los usuarios suben uno o varios archivos `.md` a través del componente `DocumentBox`.
    *   La función `addDocs` en `components/DocumentBox/DocManager.js` lee el contenido de cada archivo, lo valida (asegurándose de que sea `.md`) y lo almacena en el estado de la aplicación como un array de objetos, donde cada objeto contiene el nombre y el contenido del archivo.

2.  **Configuración de la conversión**:
    *   El usuario puede ajustar diversas opciones de conversión (como el nombre del archivo de salida, la inclusión de capítulos, el manejo de ecuaciones grandes o las rutas de las imágenes) a través de la sección de configuración. Estas opciones se almacenan en el estado `config` de la aplicación.

3.  **Tokenización del Markdown**:
    *   Cuando el usuario hace clic en "Convertir a LaTeX", la función `tokenize` en `converter/tokenCreator.js` toma el contenido Markdown de todos los archivos subidos.
    *   Utiliza una serie de "detectores" (ubicados en `converter/detectors/`) para identificar y dividir el Markdown en una secuencia estructurada de "tokens". Cada token representa un elemento Markdown (por ejemplo, un encabezado, una ecuación, texto en negrita, un enlace, etc.) y puede contener "children" para elementos anidados.
    *   Este proceso transforma el texto plano de Markdown en un árbol de tokens comprensible para la conversión.

4.  **Conversión a LaTeX**:
    *   La función `convertMDtoLaTex` en `converter/converter.js` procesa cada uno de estos tokens.
    *   Para cada tipo de token, se invoca una función de conversión específica (ubicadas en `converter/Element converters/`) que genera el código LaTeX correspondiente. Por ejemplo, `titles.js` para encabezados, `equations.js` para ecuaciones, `boldAndItalic.js` para texto con formato, etc.
    *   Esta etapa construye el cuerpo principal del documento LaTeX.

5.  **Ensamblaje del documento LaTeX final**:
    *   La función `Converter` en `components/ConvertButton/ConverterFunction.js` toma el cuerpo LaTeX generado.
    *   Añade un encabezado de documento LaTeX. Si el usuario no ha especificado un encabezado personalizado, se utiliza un `headingPlaceholder` predefinido (definido en `components/ConversionConfig/headingPlaceholder.js`) que incluye la configuración básica de un documento LaTeX (clase de documento, paquetes, título, autor, etc.).
    *   Finalmente, se agrega la instrucción `\end{document}` para completar el archivo LaTeX.

6.  **Descarga del archivo LaTeX**:
    *   Una vez que la conversión se completa, el usuario ve un botón para descargar el archivo.
    *   La función `downloadFile` en `components/ConvertButton/downloadFile.js` crea un `Blob` con el contenido LaTeX generado y utiliza un enlace temporal para iniciar la descarga del archivo `.tex` en el navegador del usuario.