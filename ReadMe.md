# Kuziko Safety Story API

## Description

The **Safety Story API** is part of the Safety Story App, designed to help parents create personalized safety stories for their children. This API allows parents to manage child profiles, select relevant safety topics, and generate stories that teach children important safety lessons. These stories are generated using the Google Gemini API.

---

### Table of Contents

1. [Features](#features)
2. [Technology Stack](#technology-stack)
3. [Getting Started](#getting-started)
4. [Environment Variables](#environment-variables)
5. [API Endpoints](#api-endpoints)
6. [Testing](#testing)
7. [Project Structure](#project-structure)

---

### Features

- **Authentication**: Google OAuth 2.0 Sign-In for parents to securely log in.
- **Child Profiles**: Create and manage child profiles with personal information such as name, age, and interests.
- **Safety Topics**: Predefined safety topics for parents to select, including topics like "Stranger Danger" and "Fire Safety."
- **Story Generation**: Personalized safety stories generated using the Google Gemini API, based on the child’s profile and selected safety topics.
- **Story Overwriting**: Existing stories for a child and topic are overwritten when new stories are generated.
- **Story Retrieval**: Retrieve previously generated stories for each child.

---

### Technology Stack

- **Node.js**: Backend runtime environment.
- **Express**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database to store child profiles, safety topics, and stories.
- **TypeScript**: Type-safe language used for the backend API.
- **Google Gemini API**: API used to generate AI-powered personalized stories.
- **Mongoose**: MongoDB ODM for managing database operations.
- **JWT**: Used for securing API requests via token-based authentication.

---

### Getting Started

#### Prerequisites

- **Node.js** and **npm**: Ensure you have Node.js and npm installed.

  ```bash
  node -v
  npm -v
  ```

- **MongoDB**: Set up a MongoDB instance (locally or via MongoDB Atlas).

- **Google API Key**: Obtain a Google Gemini API key for generating AI-powered stories.

#### Installation

1. Clone the repository

2. Navigate to the project directory:

   ```bash
   cd safety-story-app
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Set up the environment variables in `.env` file (see below).

5. Run the server:

   ```bash
   npm run dev
   ```

---

### Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
PORT=2526
MONGO_URI=mongodb://localhost:27017/safety-story-db
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GEMINI_API_KEY=your_google_gemini_api_key
JWT_SECRET=your_jwt_secret
```

---

### API Endpoints

#### **Authentication**

- `POST /auth/google/callback`: Handle Google Sign-In and return a JWT token.

#### **Child Profiles**

- `PUT /auth/profile/child:`: Create a new child profile.
- `GET /auth/profile/child/:childId`: Retrieve a child profile by ID.

#### **Safety Topics**

- `GET /auth/safety-topic`: Get all available safety topics.
- `POST /auth/safety-topics/seed`: Seed safety topics to the database.

#### **Story Management**

- `POST /auth/story/generate`: Generate a new story for a specific child and safety topic.
- `GET /auth/stories/:childProfileId`: Retrieve all stories for a particular child profile.

---

### Testing

To test the API endpoints, you can use Postman or another API client.

1. Make sure the server is running:

   ```bash
   npm run dev
   ```

2. Open **Postman** and use the provided endpoints to interact with the API.
3. Set the **Authorization Header** with the JWT token after logging in via Google Sign-In.

---

### Project Structure

```├── src
│   ├── config
│   │   ├── db.ts
│   ├── controllers
│   │   ├── auth.controller.ts
│   │   ├── child.controller.ts
│   │   ├── safetyTopic.controller.ts
│   │   └── story.controller.ts
│   ├── middlewares
│   │   └── auth.middleware.ts
│   ├── models
│   │   ├── child.model.ts
│   │   ├── story.model.ts
│   │   ├── topic.model.ts
│   │   └── user.model.ts
│   ├── routes
│   │   ├── auth.routes.ts
│   │   ├── child.routes.ts
│   │   ├── safetyTopic.routes.ts
│   │   └── story.routes.ts
│   └── index.ts
├── tests
├── .env
├── package.json
├── tsconfig.json
└── .gitignore
```
