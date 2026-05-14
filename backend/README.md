# ⚙️ The Backend (Express API)

**Welcome to the engine room!**

Hey, it's Dammika. This folder holds the Express.js REST API that powers the Library Admin Panel. While the frontend handles the looks, this is where the actual work happens—saving books, managing users, and keeping everything secure in our MongoDB database.

## 🏗️ How I Built This

I structured this backend using the **MVC (Model-View-Controller)** pattern. It's an industry standard for a reason: it keeps things sane. 

If you poke around the folders, here is my thought process:
- `config/`: Just the database connection (`db.js`). I like to keep connection logic out of the main server file.
- `models/`: The blueprints. This is where I used Mongoose to define exactly what a "Book" or a "User" should look like.
- `controllers/`: The brains. When a request comes in, the functions in here decide what to do with the database.
- `routes/`: The traffic cops. They just say "Oh, an HTTP GET request to `/api/books`? Send that over to the Book Controller."

## 🔌 The Endpoints

If you are building a new frontend feature or testing with Postman, here is what the API can do:

**Books (`/api/books`)**
- `GET /` -> Grabs the whole library catalog.
- `POST /` -> Adds a brand new book.
- `PUT /:id` -> Fixes a typo in a book's details.
- `DELETE /:id` -> Removes a book from the system.

**Users (`/api/users`)**
- `GET /` -> Gets the list of members and staff.
- `POST /` -> Registers a new user.
- `PUT /:id` -> Updates a user's role or status.
- `DELETE /:id` -> Removes a user.

## 🚀 Running the Engine

Make sure you have your `.env` file set up first (you need `MONGO_URI` and `PORT`). Then:
- Run `npm run dev` to start it up with Nodemon (my personal favorite, it auto-restarts when you save a file).
- Or `npm start` if you're pushing this to a production server.

*Let me know if you run into any weird database bugs! - Dammika*
