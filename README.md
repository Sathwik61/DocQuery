# DocQuery

**DocQuery** is a powerful Node.js API designed for handling PDF files with advanced features for text extraction and interactive responses. It allows users to upload PDF documents, extract textual content, and interact with a language model to generate insightful responses based on the extracted data. Leveraging modern technologies, DocQuery ensures efficient processing and integration with cutting-edge AI tools.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Components](#components)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Features

- **PDF Upload**: Seamlessly upload PDF files to the server with robust handling for various file types and sizes.
- **Text Extraction**: Efficiently extract and process text content from the uploaded PDFs using advanced parsing techniques.
- **GROQ Integration**: Utilize GROQ's GPT integration to send extracted text and prompts for generating accurate and relevant responses.
- **Multi-core Processing**: Enhance performance and scalability with multi-core processing through clustering, ensuring efficient handling of multiple concurrent requests.
- **Dynamic Query Handling**: Customize queries to interact with the extracted content, providing versatile use cases for various applications.

## Installation

1. **Clone the repository:**

    ```bash
    git clone [https://github.com/yourusername/your-repo.git](https://github.com/Sathwik61/DocQuery.git)
    cd your-repo
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Create a `.env` file in the root directory and add your environment variables:**

    ```env
    PORT=8080
    apiKey=YOUR_GROQ_API_KEY
    ```

4. **Run the application:**

    ```bash
    npm start
    ```

    For development with live reloading:

    ```bash
    npm run dev
    ```

## Usage

1. **Start the server:**

    ```bash
    npm start
    ```

    The server will be running at `http://localhost:8080`.

2. **Upload a PDF file:**

    Send a POST request to `/upload` with the PDF file attached in the `pdfFile` field.

    ```bash
    curl -X POST http://localhost:8080/upload -F "pdfFile=@path/to/your/file.pdf"
    ```

    On successful upload, the server will extract the text from the PDF and return relevant information along with the file details.

3. **Get a response from GPT:**

    Send a POST request to `/prompt` with a JSON body containing `prompt` and `FileName`.

    ```bash
    curl -X POST http://localhost:8080/prompt -H "Content-Type: application/json" -d '{"prompt": "Your question?", "FileName": "file.pdf"}'
    ```

    The server will process the prompt with the extracted text from the specified file and return a GPT-generated response.

## API Endpoints

### `GET /`

Returns a simple "hello" message to confirm the server is running and responsive.

### `POST /upload`

- **Request:** `multipart/form-data` with `pdfFile` field.
- **Response:** JSON with status and file information if successful, or an error message if the upload fails. Includes extracted text content for further use.

### `POST /prompt`

- **Request:** JSON body with `prompt` (string) and `FileName` (string).
- **Response:** JSON with GPT-generated response based on the provided prompt and extracted text. Includes the original prompt and file details for reference.

## Dependencies

- `dotenv`: To manage environment variables.
- `express`: For building the API server.
- `groq-sdk`: For interacting with the GPT model.
- `multer`: For handling file uploads.
- `nodemon`: For development with live reloading.
- `pdf-parse`: For parsing and extracting text from PDF files.

