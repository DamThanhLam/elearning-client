# elearning-client

Frontend application for the **E‑Learning Platform**, responsible for providing the user interface and interacting with the backend microservices.

This project focuses on usability, performance, and clean UI/UX, supporting students and administrators in accessing learning resources.

---

## Overview

The **elearning-client** project is the frontend layer of the E‑Learning system. It communicates with the backend services (authentication, user management, courses, etc.) via REST APIs.

Main features:

* User authentication (login / register)
* Course browsing and learning interface
* User profile management
* Responsive layout (desktop & mobile)
* API integration with `elearning-backend`

---

## Tech Stack

* **TypeScript**
* **Modern JavaScript (ES6+)**
* **Frontend framework**: React
* **CSS / SCSS**
* **Node.js & npm / yarn**

> Update this section if you want to specify the exact framework used in the project.

---

## Project Structure

```
.
├── apps
│   └── web        # Main frontend application
├── packages       # Shared components / utilities
├── .vscode
├── package.json
├── tsconfig.json
└── README.md
```

---

## Prerequisites

Before running the project, make sure you have:

* **Node.js v16+**
* **npm** or **yarn**
* Backend services running (`elearning-backend`)

---

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/DamThanhLam/elearning-client.git
cd elearning-client
npm install
# or
yarn install
```

---

## Running the Project (Development)

Start the development server:

```bash
npm start
# or
yarn start
```

The application will usually be available at:

```
http://localhost:3000
```

(Port may vary depending on the framework configuration.)

---

## Environment Variables

Create a `.env` file at the root of the project (example):

```env
VITE_API_BASE_URL=http://localhost:8080
```

Common variables:

* `VITE_API_BASE_URL` – Base URL of backend APIs

---

## Build for Production

To build the project for production:

```bash
npm run build
# or
yarn build
```

The optimized output will be generated in the `dist/` or `build/` directory.

---

## API Integration

The frontend consumes REST APIs provided by `elearning-backend`. Make sure:

* Backend services are running
* API base URL is correctly configured
* CORS is enabled on the backend

---

## Development Guidelines

* Keep components small and reusable
* Centralize API calls
* Use TypeScript strictly
* Follow consistent naming conventions

---

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes
4. Push to your fork
5. Open a Pull Request

---

## Future Improvements

* Improve UI/UX
* Add unit & e2e tests
* Add role-based access control on UI
* Add CI/CD pipeline
* Improve performance and accessibility

---

## Author

**DamThanhLam**
GitHub: [https://github.com/DamThanhLam](https://github.com/DamThanhLam)
