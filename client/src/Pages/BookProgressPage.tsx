import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
  const [readingStatus, setReadingStatus] = useState<string>("Pending");
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    const fetchBook = async () => {
      const token = localStorage.getItem("token");
  
      if (!token) {
        console.error("Token not found. Redirecting to Sign In...");
        navigate("/signin");
        return;
      }
  
      try {
        const response = await fetch(`http://localhost:4200/libros/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Incluye el token en la cabecera
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch book details");
        }
  
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };
  
    fetchBook();
  }, [id, navigate]);
  

  const updateProgress = (page: number) => {
    setCurrentPage(page);
  };

  const calculateProgress = (): number => {
    if (!book) return 0;
    return Math.min((currentPage / book.paginas) * 100, 100);
  };

  const getProgressColor = (progress: number): string => {
    if (progress < 33) return "bg-red-500";
    if (progress < 66) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="min-h-screen bg-green-100 py-8 px-4 sm:px-8">
      {book && (
        <div className="max-w-screen-lg mx-auto space-y-8">
          {/* Book Details Card */}
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col sm:flex-row">
            <img
              src={book.portada}
              alt={`${book.titulo} cover`}
              className="w-full sm:w-48 h-auto object-cover rounded-lg"
            />
            <div className="sm:ml-6 flex flex-col justify-center mt-4 sm:mt-0">
              <h2 className="text-2xl font-bold mb-2">{book.titulo}</h2>
              <p className="text-lg text-gray-700 mb-1">
                <strong>Author:</strong> {book.autor}
              </p>
              <p className="text-lg text-gray-700 mb-1">
                <strong>Genre:</strong> {book.genero}
              </p>
              <p className="text-lg text-gray-700 mb-3">
                <strong>Pages:</strong> {book.paginas}
              </p>

              {/* Reading Status */}
              <div className="flex items-center space-x-4">
                <p className="text-lg">
                  <strong>Status:</strong>
                </p>
                <select
                  value={readingStatus}
                  onChange={(e) => setReadingStatus(e.target.value)}
                  className="p-2 border border-green1 rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="Reading">Reading</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Synopsis Card */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Synopsis</h3>
            <p className="text-gray-700">{book.sinopsis}</p>
          </div>

          {/* Progress Card */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Reading Progress</h3>

            {/* Progress Bar */}
            <div className="w-full bg-gray-300 h-6 rounded-full overflow-hidden mb-4">
              <div
                className={`h-full ${getProgressColor(
                  calculateProgress()
                )} transition-all duration-300`}
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
            <p className="text-gray-700 mb-4">
              {currentPage} / {book.paginas} pages read ({calculateProgress().toFixed(2)}%)
            </p>

            {/* Page Input */}
            <label htmlFor="currentPage" className="block text-gray-700 mb-2">
              Mark your current page:
            </label>
            <input
              type="number"
              id="currentPage"
              value={currentPage}
              onChange={(e) => updateProgress(Number(e.target.value))}
              min={0}
              max={book.paginas}
              className="p-2 border border-green1 rounded w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookProgressPage;
