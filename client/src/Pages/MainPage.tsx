import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaBook, FaUser } from "react-icons/fa";

// Define the book type
interface Book {
  _id: string;
  titulo: string;
  autor: string;
  genero: string;
  paginas: number;
  sinopsis: string;
  portada: string;
}

export const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);

  // Fetch books from the API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token
        const response = await fetch("http://localhost:4200/libros", {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }

        const data = await response.json();
        console.log("Fetched Books:", data); // Debugging: log fetched books
        setBooks(data); // Update state with fetched books
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="font-roboto h-screen flex">
      {/* Sidebar */}
      <nav className="fixed top-0 left-0 h-screen w-16 bg-green1 text-white flex flex-col justify-center items-center">
        <button
          className="mb-6 hover:bg-green2 p-2 rounded -mt-4"
          onClick={() => navigate("/add")}
        >
          <FaPlus size={24} />
        </button>
        <button
          className="mb-6 hover:bg-green2 p-2 rounded"
          onClick={() => navigate("/shelf")}
        >
          <FaBook size={24} />
        </button>
        <button
          className="hover:bg-green2 p-2 rounded"
          onClick={() => navigate("/profile")}
        >
          <FaUser size={24} />
        </button>
      </nav>

      {/* Main content */}
      <div className="ml-16 flex-grow flex flex-col">
        {/* Top bar */}
        <header className="fixed w-full h-14 bg-green1 text-white flex items-center justify-between p-3">
          <h1 className="text-2xl font-bold">Welcome to Bookies!</h1>
        </header>

        {/* Main content */}
        <main className="flex-grow p-4 mt-14">
          {/* <h2 className="text-2xl font-bold mb-6 text-center">
            Book Collection
          </h2> */}
          {/* Book Grid */}
          <div className="max-w-screen-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 rounded-lg bg-gray-100 p-6">
            {books.map((book) => (
              <div
                key={book._id}
                className="max-w-sm rounded overflow-hidden shadow-lg bg-white"
              >
                <img
                  className="w-47 h-64 object-cover mt-4 mx-auto rounded-lg"
                  src={book.portada}
                  alt={`${book.titulo} cover`}
                />
                <div className="px-6 py-4">
                  <h3 className="font-bold text-xl mb-2">{book.titulo}</h3>
                  <p className="text-gray-700 text-base">By {book.autor}</p>
                  <p className="text-gray-700 text-base">
                    <strong>Genre:</strong> {book.genero}
                  </p>
                </div>
              </div>
            ))}
          </div>
          ;
        </main>
      </div>
    </div>
  );
};

export default MainPage;
