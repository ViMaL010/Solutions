# 📚 Bookstore Web Application  

A full-stack bookstore web application built with **React (Frontend)** and **Node.js with Express (Backend)**.  

## 🚀 Getting Started  

Follow the steps below to set up and run the project locally.  

### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/your-username/bookstore.git
cd bookstore
```

## 🖥️ Frontend Setup  

1. Navigate to the frontend directory:  
   ```sh
   cd frontend
   ```
2. Install dependencies:  
   ```sh
   npm install
   ```
3. Start the development server:  
   ```sh
   npm run dev
   ```
4. The frontend will be available at `http://localhost:5173` (or as specified in your project).  

## 🛠 Backend Setup  

1. Navigate to the backend directory:  
   ```sh
   cd backend
   ```
2. Install dependencies:  
   ```sh
   npm install
   ```
3. Importing Books Data to MongoDB:

   The books data is stored in a JSON file named `Books.json` within the backend folder.
   To run the project locally, you need to import this `Books.json` file into your own MongoDB database.
   You can use MongoDB Compass or any other MongoDB tool to import the Books.json file.
   After importing, you should use your own MongoDB connection URL.
   
5. Update MongoDB URL:

   In the backend folder, open the index.js file.
   Update the MongoDB connection URL with your own MongoDB URL where you imported the
   Books.json data.
   
6. Start the backend server:  
   ```sh
   node index.js
   ```
7. The backend will be running at `http://localhost:3000` (or your configured port).  

## 📌 Features  

- Browse books  
- Search for books  
- Add books to cart  
- User authentication  


