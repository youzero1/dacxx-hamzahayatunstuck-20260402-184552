# Calculator App

A beautiful, fully-functional calculator built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

## Features

- Basic arithmetic operations: addition, subtraction, multiplication, division
- Percentage and sign toggle (+/-) support
- Calculation history panel (last 5 entries)
- Responsive design with a sleek dark UI
- Dockerized for easy deployment

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Docker (optional)

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Docker

### Build the Docker image

```bash
docker build -t calculator-app .
```

### Run the Docker container

```bash
docker run -p 3000:3000 calculator-app
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Using Docker Compose

```bash
docker-compose up
```

## Project Structure

```
calculator-app/
├── public/                  # Static assets
│   ├── favicon.ico
│   ├── robots.txt
│   └── manifest.json
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
│       ├── Calculator.tsx   # Main calculator logic
│       ├── Display.tsx      # Display component
│       └── Button.tsx       # Button component
├── Dockerfile
├── .dockerignore
├── next.config.js
├── tailwind.config.ts
└── package.json
```

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Docker** - Containerization
