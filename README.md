# Movie Hub

Movie Hub is a web application that allows users to manage their movie library, view movie lists, and maintain user profiles. It includes authentication, role-based access control, and an interactive UI.

## 🚀 Features
- User authentication (JWT, bcrypt for password hashing)
- Role-based access control (Admin, Standard User)
- Movie list management
- User profile management
- API with CRUD operations for movies and users
- Dark/Light mode toggle

## 📌 Setup Instructions

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or later)
- [MongoDB](https://www.mongodb.com/) (Atlas or local instance)

### Installation
1. **Clone the repository**
   ```sh
   git clone https://github.com/suyundykovv/movie-hub.git
   cd movie-hub
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Create a `.env` file** in the root directory and add:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://oraz:admin@cluster0.nrfls.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=your_secret_key
   ```

4. **Start the server**
   ```sh
   npm start
   ```

The server will run at `http://localhost:3000`.

## 📡 API Documentation

### Authentication
#### 1️⃣ Register a User
```http
POST /api/auth/register
```
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### 2️⃣ Login
```http
POST /api/auth/login
```
**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### 3️⃣ Get User Profile
```http
GET /api/users/profile
```
**Headers:**
```json
{
  "Authorization": "Bearer <your_token>"
}
```

### Movies
#### 4️⃣ Get All Movies
```http
GET /api/movies
```

#### 5️⃣ Add a New Movie (Admin Only)
```http
POST /api/movies
```
**Request Body:**
```json
{
  "title": "Inception",
  "genre": "Sci-Fi",
  "year": 2010
}
```

### Users
#### 6️⃣ Get All Users (Admin Only)
```http
GET /api/users
```


