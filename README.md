# Argent Bank App

Argent Bank is a banking web application built using Vite, React, and Redux Toolkit. The backend for this project is hosted in a separate repository.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Setting Up the Backend](#setting-up-the-backend)
  - [Setting Up the Frontend](#setting-up-the-frontend)
- [Running the Application](#running-the-application)

## Features
The application includes:
1. User Authentication with Login and Logout functionality.
2. Profile management, including viewing and editing user information.
3. Display of user account details.

## Prerequisites
Before you begin, ensure you have met the following requirements:
- Node.js (version 16 or later)
- npm (version 7 or later) or yarn

## Installation

### Setting Up the Backend
1. Clone the backend repository from [Argent Bank API](https://github.com/OpenClassrooms-Student-Center/Project-10-Bank-API.git).
2. Follow backend README installing instructions
5. Run the backend server:
   ```bash
   npm run dev:server
   ```

### Setting Up the Frontend
1. Clone this repository.
2. Navigate to the project directory:
   ```bash
   cd argent-bank
   ```
3. Install dependencies with npm or yarn:
   ```bash
   npm install
   # or
   yarn install
   ```

## Running the Application

### Backend
Ensure the backend server is running on `http://localhost:3001`. If you have not set up the backend, refer to the [Setting Up the Backend](#setting-up-the-backend) section.

### Frontend
Start the development server:
```bash
npm run dev
# or
yarn dev
```
Open your web browser and navigate to `http://localhost:5173` (or whatever port Vite is using).
