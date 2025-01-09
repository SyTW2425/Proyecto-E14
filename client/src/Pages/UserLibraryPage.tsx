import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaBook, FaUser, FaSearchPlus } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";

interface Book {
  _id: string;
  titulo: string;
  autor: string;
  genero: string;
  paginas: number;
  sinopsis: string;
  portada: string;
  estadoLectura: "Pending" | "Reading" | "Completed";
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
    document.title = "User Library"; // Cambia el título de la pestaña
}, []);

  return (
    <div
      ref={dropdownRef}
      className="relative inline-block text-left w-full sm:w-1/6 shadow-sm rounded-md"
    >
      <button
        onClick={toggleDropdown}
        className="w-full p-2 border border-green1 rounded bg-white text-gray-500 flex justify-between items-center"
      >
        {selectedOption || "All States"}
        <span className="ml-2">&#9662;</span>
      </button>
      {isOpen && (
        <ul className="absolute z-10 mt-2 w-full bg-white border border-green1 rounded shadow">
          <li
            className="cursor-pointer px-4 py-2 hover:bg-green2 hover:text-white"
            onClick={() => handleSelect("")}
          >
            All States
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

export const UserLibraryPage: React.FC = () => {
  const navigate = useNavigate();
  const [libraryBooks, setLibraryBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>(""); // Filtro por estado
  const [hasShadow, setHasShadow] = useState(false);

  // Detectar scroll y actualizar el estado
  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchUserBooks = async () => {
      const token = localStorage.getItem("token");
  
      if (!token) {
        console.error("Token not found. Redirecting to Sign In...");
        navigate("/signin");
        return;
      }
  
      try {
        const decodedToken = jwtDecode<{ id: string }>(token || "");
        const userId = decodedToken.id;
  
        const response = await fetch(`http://localhost:4200/userbooks/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          if (response.status === 403) {
            navigate("/signin");
          } else {
            throw new Error("Failed to fetch user books.");
          }
          return;
        }
  
        const data = await response.json();
  
        // Combina `libroId` con `estadoLectura`
        const formattedData = data.map((entry: { libroId: Book; estadoLectura: string }) => ({
          ...entry.libroId, // Extraemos la información del libro
          estadoLectura: entry.estadoLectura, // Añadimos el estado de lectura
        }));
  
        setLibraryBooks(formattedData); // Actualizamos el estado con los datos combinados
      } catch (error) {
        console.error("Error fetching user library:", error);
      }
    };
  
    fetchUserBooks();
  }, [navigate]);
  

  const handleDeleteBook = async (bookId: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token not found. Redirecting to Sign In...");
      navigate("/signin");
      return;
    }

    try {
      const decodedToken = jwtDecode<{ id: string }>(token || "");
      const userId = decodedToken.id;
      const response = await fetch(`http://localhost:4200/userbooks/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          usuarioId: userId,
          libroId: bookId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete book");
      }

      setLibraryBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
      console.log(`Book with ID ${bookId} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const filteredBooks = libraryBooks.filter((book) => {
    const matchesSearch = book.titulo
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesState = selectedState
      ? book.estadoLectura === selectedState
      : true;

    return matchesSearch && matchesState;
  });

  const states = ["Pending", "Reading", "Completed"]; // Opciones de estados

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
      <div className="flex-grow sm:ml-16 md:ml-16">
        {/* Sticky Header with Shadow */}
        <header
          className={`sticky top-0 z-20 bg-green-100 transition-shadow duration-300 ${
            hasShadow ? "shadow-md" : ""
          }`}
        >
          <h1 className="text-green1 text-3xl font-bold text-center mt-2">
            My Library
          </h1>
          <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-3 space-y-4 sm:space-y-0 max-w-screen-2xl mx-auto">
            <input
              type="text"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-1/2 sm:mb-0 sm:mr-4 p-2 border border-green1 rounded focus:outline-none focus:ring-1 focus:ring-green2 shadow-sm"
            />
            <FilterDropdown
              options={states}
              selectedOption={selectedState}
              onSelect={setSelectedState}
            />
          </div>
        </header>
        <main className="py-6 px-4 pb-16">
          <div className="max-w-screen-2xl mx-auto space-y-4">
            {filteredBooks.map((book) => (
              <div
                key={book._id}
                className="relative group flex flex-col sm:flex-row items-center bg-white rounded-lg shadow-md p-3 hover:scale-[103%] transition-transform duration-200 overflow-hidden"
              >
                {/* Overlay Blur */}
                <div className="absolute inset-0 backdrop-blur-sm rounded-lg opacity-[0.01] group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                {/* Botones centrados */}
                <div className="absolute inset-0 flex flex-col sm:flex-row justify-center items-center gap-4 opacity-[0.001] group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/library/${book._id}`);
                    }}
                    className="bg-green1 text-white px-6 py-2 rounded-lg font-bold text-md hover:bg-green2"
                  >
                    Visualize Progress
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteBook(book._id);
                    }}
                    className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold text-md hover:bg-red-700"
                  >
                    Delete Book
                  </button>
                </div>

                {/* Content */}
                <img
                  src={book.portada}
                  alt={`${book.titulo} cover`}
                  className="w-full sm:w-40 h-auto object-cover rounded-md sm:mb-0"
                />

                <div className="w-150 sm:ml-4 flex flex-col items-start sm:text-left">
                  <h2 className="text-xl sm:text-2xl font-bold mb-2">
                    {book.titulo}
                  </h2>
                  <p className="text-sm sm:text-lg text-gray-700 mb-1">
                    <strong>Author:</strong> {book.autor}
                  </p>
                  <p className="text-sm sm:text-lg text-gray-700 mb-1">
                    <strong>Genre:</strong> {book.genero}
                  </p>
                  <p className="text-sm sm:text-lg text-gray-700 mb-1">
                    <strong>Status:</strong> {book.estadoLectura}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserLibraryPage;
