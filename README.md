# Node.js HTTP Server with Docker

This project implements a simple HTTP server in Node.js that responds to GET requests on the `/data` endpoint. The server accepts query parameters (`n` for file name and `m` for line number) and returns the content of files accordingly.

### Prerequisites

- Docker installed on your machine.

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/Rimpi246/headout-assignment.git
   ```
2. Open git bash or cmd
   ```
   cd node-http-server
   ```
3. Build the Docker image:
   ```
   docker build -t <my-http-server> .
   ```
4. Run the Docker container:
   ```
   docker run -p 8080:8080 <my-http-server-container> <my-http-server>
   ```
5. The server will be accessible at `http://localhost:8080`.

### API Endpoint

#### `/data`

#### Parameters:

- n: File name (required)
- m: Line number (optional)

#### Sample Requests:

Entire content of file 1.txt:

```
http://localhost:8080/data?n=1
```

Content of line 30 in file 1.txt:

```
http://localhost:8080/data?n=1&m=30
```

#### Responses:

Content of the requested file or line.

### Optimizations:

- Used the readline module to efficiently read lines from files, improving the performance of reading specific lines from large files.
- In the Dockerfile, data files are generated before copying the package.json and application code for faster builds and smaller images.
- The Dockerfile uses multi-stage builds to separate the build environment from the runtime environment minimizing the size of the final Docker image.
