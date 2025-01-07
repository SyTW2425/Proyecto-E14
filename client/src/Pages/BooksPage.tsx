import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaBook, FaUser, FaSearchPlus } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";

interface Book {
  _id: string;
  titulo: string;
  autor: string;
  genero: string;
  paginas: number;
  sinopsis: string;
  portada: string;
}

const FilterDropdown: React.FC<{
  options: string[];
  selectedOption: string;
  onSelect: (value: string) => void;
}> = ({ options, selectedOption, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

    useEffect(() => {
      document.title = "Book Searching"; // Cambia el título de la pestaña
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative inline-block text-left w-full sm:w-1/6 shadow-sm rounded-md"
    >
      <button
        onClick={toggleDropdown}
        className="w-full p-2 border border-green1 rounded bg-white text-gray-700 flex justify-between items-center"
      >
        {selectedOption || "All genres"}
        <span className="ml-2">&#9662;</span>
      </button>
      {isOpen && (
        <ul className="absolute z-10 mt-2 w-full bg-white border border-green1 rounded shadow">
          <li
            className="cursor-pointer px-4 py-2 hover:bg-green2 hover:text-white"
            onClick={() => handleSelect("")}
          >
            All genres
          </li>
          {options.map((option) => (
            <li
              key={option}
              className="cursor-pointer px-4 py-2 hover:bg-green2 hover:text-white"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const BooksPage: React.FC = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [hasShadow, setHasShadow] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const addBookToLibrary = async (bookId: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("User is not authenticated");
      return;
    }

    try {
      const decoded: { id: string } = jwtDecode(token);
      const usuarioId = decoded.id;

      const response = await fetch("http://localhost:4200/userbooks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ usuarioId, libroId: bookId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error === "Book already exists in user library") {
          setErrorMessage("This book is already in your library!");
        } else {
          setErrorMessage("Failed to add book. Please try again.");
        }
        setTimeout(() => setErrorMessage(null), 5000); // Hide error after 5 seconds
      } else {
        setSuccessMessage("Book added to library successfully!");
        setTimeout(() => setSuccessMessage(null), 5000); // Hide success after 5 seconds
      }
    } catch (error) {
      console.error("Error adding book to library:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:4200/libros", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }

        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.titulo
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre
      ? book.genero.toLowerCase() === selectedGenre.toLowerCase()
      : true;

    return matchesSearch && matchesGenre;
  });

  const genres = Array.from(new Set(books.map((book) => book.genero)));

  return (
    <div className="min-h-screen bg-green-100 flex">
      {/* Navbar */}
        <nav>
        {/* Navbar para pantallas grandes */}
        <div className="hidden sm:flex fixed top-0 left-0 h-screen w-16 bg-green1 text-white flex-col justify-center items-center rounded-r-xl z-50">
            <button
            className="mb-6 hover:bg-green2 p-2 rounded -mt-4"
            onClick={() => navigate("/books")}
            >
            <FaSearchPlus size={24} />
            </button>
            <button
            className="mb-6 hover:bg-green2 p-2 rounded"
            onClick={() => navigate("/library")}
            >
            <FaBook size={24} />
            </button>
            <button
            className="hover:bg-green2 p-2 rounded"
            onClick={() => navigate("/profile")}
            >
            <FaUser size={24} />
            </button>
        </div>

        {/* Navbar para móviles */}
        <div className="sm:hidden fixed bottom-0 left-0 w-full bg-green1 text-white flex justify-around items-center py-2 z-50">
            <button
            className="hover:bg-green2 p-2 rounded"
            onClick={() => navigate("/books")}
            >
            <FaSearchPlus size={24} />
            </button>
            <button
            className="hover:bg-green2 p-2 rounded"
            onClick={() => navigate("/library")}
            >
            <FaBook size={24} />
            </button>
            <button
            className="hover:bg-green2 p-2 rounded"
            onClick={() => navigate("/profile")}
            >
            <FaUser size={24} />
            </button>
        </div>
        </nav>

      {/* Main Content */}
      <div className="flex-grow sm:ml-16 pb-8">
        <main className="py-2">
          <div
            className={`sticky top-0 z-20 bg-green-100 transition-shadow duration-300 rounded-b-md ${
              hasShadow ? "shadow-md" : ""
            }`}
          >
            <div className="max-w-screen-2xl mx-auto text-center">
              <h1 className="text-green1 text-3xl font-bold">Bookies.</h1>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-3 space-y-4 sm:space-y-0 max-w-screen-2xl mx-auto">
              <input
                type="text"
                placeholder="Search by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-1/2 sm:mb-0 sm:mr-4 p-2 border border-green1 rounded focus:outline-none focus:ring-1 focus:ring-green2 shadow-sm"
              />
              <FilterDropdown
                options={genres}
                selectedOption={selectedGenre}
                onSelect={setSelectedGenre}
              />
            </div>
          </div>

          <div className="max-w-screen-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 rounded-lg p-6 bg-green-100">
            {filteredBooks.map((book) => (
              <div
                key={book._id}
                className="relative max-w-sm rounded-xl overflow-hidden bg-green-50 shadow-md"
              >
                <div className="relative group">
                  <img
                    className="w-47 h-96 object-cover rounded-lg mt-4 mx-auto transition-all duration-300 group-hover:blur-[2px]"
                    src={book.portada}
                    alt={`${book.titulo} cover`}
                  />
                  <button
                    onClick={() => addBookToLibrary(book._id)}
                    className="absolute inset-0 flex items-center justify-center bg-transparent text-green1 opacity-[0.01] transition-opacity duration-300 group-hover:opacity-100"
                  >
                    <div className="bg-green1 p-3 rounded-full">
                      <FaPlus size={30} className="text-white" />
                    </div>
                  </button>
                </div>
                <div className="relative group">
                  <div className="px-6 py-4 transition-opacity duration-300 group-hover:opacity-0">
                    <h3 className="font-bold text-xl mb-2">{book.titulo}</h3>
                    <p className="text-gray-700 text-base">By {book.autor}</p>
                    <p className="text-gray-700 text-base">
                      <strong>Genre:</strong> {book.genero}
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-green1 bg-opacity-75 text-white flex items-center justify-center text-center px-4 p-2 rounded-lg opacity-[0.01] transition-opacity duration-150 group-hover:opacity-100 m-3">
                    <p className="text-sm">{book.sinopsis}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Success Alert */}
      {successMessage && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center p-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 shadow-lg">
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M16.707 4.293a1 1 0 0 0-1.414 0L10 9.586 8.707 8.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l6-6a1 1 0 0 0 0-1.414Z" />
          </svg>
          <div>
            <span className="font-medium">Success:</span> {successMessage}
          </div>
        </div>
      )}

      {/* Error Alert */}
      {errorMessage && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center p-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 shadow-lg">
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <div>
            <span className="font-medium">Error:</span> {errorMessage}
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksPage;

