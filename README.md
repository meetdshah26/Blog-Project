# Blog Application API

This is a simple Blog Application API built using Express, Node.js, and MongoDB. It allows users to create, view, edit, delete, and search for articles.

## Features

- Create an article
- View a list of all articles
- Edit an article
- Delete an article
- Search for articles
- Sort articles by date

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
  
## Project Setup

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/meetdshah26/Blog-Project.git
    ```

2. **Navigate to the project directory:**
    ```bash
    cd Blog-Project-main
    ```

3. **Install dependencies:**
    ```bash
    npm install
    ```

4. **Set up environment variables:**

    Create a `.env` file in the root of the project and add the following variables:
    ```plaintext
    DATABASE=mongodb+srv://<username>:<password>@cluster0.mongodb.net/test?retryWrites=true&w=majority
    DATABASE_PASSWORD=<your-database-password>
    PORT=3000
    ```

### Running the Application

1. **Start the server:**
    ```bash
    npm start
    ```

2. **The API will be running at:**
    ```
    http://localhost:3000
    ```
