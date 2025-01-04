import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaSearchPlus, FaBook, FaUser } from "react-icons/fa";

interface Book {
  _id: string;
  titulo: string;
  autor: string;
  genero: string;
  paginas: number;
  sinopsis: string;
  portada: string;
}

export const BookProgressPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [currentPageInput, setCurrentPageInput] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      const token = localStorage.getItem("token");
      const usuarioId = localStorage.getItem("usuarioId");

      if (!token || !usuarioId) {
        console.error("Authentication error: Token or User ID not found.");
        navigate("/signin");
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:4200/userbooks/${usuarioId}/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch book details");
        }

        const data = await response.json();
        setBook(data.libroId);
        setCurrentPage(data.paginasLeidas || 0);
        setCurrentPageInput((data.paginasLeidas || 0).toString());
        setError(null);
      } catch (err) {
        console.error("Error fetching book details:", err);
        setError("Failed to load book details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookDetails();
  }, [id, navigate]);

  const updateProgressInBackend = async (page: number) => {
    const token = localStorage.getItem("token");
    const usuarioId = localStorage.getItem("usuarioId");

    if (!token || !usuarioId) {
      setError("Authentication error: Token or User ID not found.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:4200/userbooks/progress", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          usuarioId,
          libroId: id,
          paginasLeidas: page,
          totalPaginas: book?.paginas,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update progress");
      }

      const updatedDetails = await response.json();
      setCurrentPage(updatedDetails.userBook.paginasLeidas || 0);
      setError(null);
    } catch (err) {
      console.error("Error updating progress:", err);
      setError("Error updating progress. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const pageNumber = parseInt(currentPageInput, 10);

      if (isNaN(pageNumber) || pageNumber < 0 || pageNumber > (book?.paginas || 0)) {
        setError(
          `Please enter a number between 0 and ${book?.paginas || "the total pages"}`
        );
        return;
      }

      setCurrentPage(pageNumber);
      updateProgressInBackend(pageNumber);
    }
  };

  const calculateProgress = (): number => {
    if (!book || currentPage < 0) return 0;
    return Math.min((currentPage / book.paginas) * 100, 100);
  };

  const getProgressColor = (progress: number): string => {
    if (progress === 100) return "bg-purple-500";
    if (progress < 33) return "bg-red-500";
    if (progress < 66) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getReadingStatus = (): string => {
    if (currentPage === 0) return "Pending";
    if (currentPage === book?.paginas) return "Completed";
    return "In Progress";
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <nav className="fixed top-0 left-0 h-screen w-16 bg-green1 text-white flex flex-col justify-center items-center rounded-r-xl z-50">
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
      </nav>

      {/* Main content */}
      <div className="ml-16 w-full min-h-screen bg-green-100 py-8 px-4 sm:px-8">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {isLoading && (
          <div className="flex justify-center items-center mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-green1"></div>
          </div>
        )}
        {book && (
          <div className="max-w-screen-lg mx-auto space-y-8">
            {/* Book Details Card */}
            <div className="bg-white shadow-md rounded-lg p-6 flex flex-col sm:flex-row">
              <img
                src={book.portada}
                alt={`${book.titulo} cover`}
                className="w-full sm:w-48 h-auto object-cover rounded-lg"
              />
              <div className="sm:ml-6 flex flex-col justify-center sm:mt-0">
                <h2 className="text-2xl font-bold mb-2 mt-2">{book.titulo}</h2>
                <p className="text-lg text-gray-700 mb-1">
                  <strong>Author:</strong> {book.autor}
                </p>
                <p className="text-lg text-gray-700 mb-1">
                  <strong>Genre:</strong> {book.genero}
                </p>
                <p className="text-lg text-gray-700 mb-1">
                  <strong>Pages:</strong> {book.paginas}
                </p>
                <p className="text-lg text-gray-700 mb-1">
                  <strong>Status:</strong> {getReadingStatus()}
                </p>
                <p className="text-lg text-gray-700">
                  <strong>Synopsis:</strong> {book.sinopsis}
                </p>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex items-center mb-6">
                <h3 className="text-xl font-bold text-gray-700 flex-shrink-0 mr-6">
                  Reading Progress
                </h3>
                {/* Progress Bar */}
                <div className="flex-grow bg-gray-300 h-6 rounded-full overflow-hidden shadow-inner">
                  <div
                    className={`h-full ${getProgressColor(
                      calculateProgress()
                    )} transition-all duration-300`}
                    style={{ width: `${calculateProgress()}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex flex-col items-start sm:flex-row sm:justify-between sm:items-center">
                <p className="text-gray-700 text-base sm:text-lg">
                  <strong>Progress:</strong> {currentPage} / {book.paginas} pages read (
                  {calculateProgress().toFixed(2)}%)
                </p>
                {/* Page Input */}
                <div className="sm:mt-0 flex items-center">
                  <p className="text-gray-700 text-base sm:text-lg mr-4">
                    <strong>Pages read:</strong>
                  </p>
                  <input
                    type="number"
                    id="currentPage"
                    value={currentPageInput}
                    onChange={(e) => setCurrentPageInput(e.target.value)}
                    onKeyDown={handlePageInputKeyPress}
                    disabled={isLoading}
                    className="p-2 border border-green-300 rounded-md shadow-sm focus:ring focus:ring-green-200 focus:border-green-400 w-24 items-center"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookProgressPage;
