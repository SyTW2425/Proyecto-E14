import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaSearchPlus, FaBook, FaUser, FaTrash } from "react-icons/fa";

interface Book {
  _id: string;
  titulo: string;
  autor: string;
  genero: string;
  paginas: number;
  sinopsis: string;
  portada: string;
}

interface Note {
  _id: string;
  content: string;
}

export const BookProgressPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<string>("");
  const [editNoteId, setEditNoteId] = useState<string | null>(null);
  const [editNoteContent, setEditNoteContent] = useState<string>("");
  const [currentPageInput, setCurrentPageInput] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      const token = localStorage.getItem("token");
      const usuarioId = localStorage.getItem("usuarioId");

      if (!token || !usuarioId) {
        showError("Authentication error: Token or User ID not found.");
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
        setNotes(data.notas || []);
        setCurrentPage(data.paginasLeidas || 0);
        setCurrentPageInput((data.paginasLeidas || 0).toString());
        setError(null);
      } catch (err) {
        showError("Failed to load book details. Please try again.");
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
      showError("Authentication error: Token or User ID not found.");
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
      setCurrentPageInput(updatedDetails.userBook.paginasLeidas.toString());
      setError(null);
    } catch (err) {
      showError("Error updating progress. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const pageNumber = parseInt(currentPageInput, 10);

      if (isNaN(pageNumber) || pageNumber < 0 || pageNumber > (book?.paginas || 0)) {
        showError(
          `Please enter a number between 0 and ${book?.paginas || "the total pages"}`
        );
        return;
      }

      setCurrentPage(pageNumber);
      updateProgressInBackend(pageNumber);
    }
  };

  const addNote = async () => {
    const token = localStorage.getItem("token");
    const usuarioId = localStorage.getItem("usuarioId");

    if (!token || !usuarioId || !newNote.trim()) {
      showError("Please enter a valid note.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4200/userbooks/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ usuarioId, libroId: id, content: newNote.trim() }),
      });

      if (!response.ok) {
        throw new Error("Failed to add note");
      }

      const updatedDetails = await response.json();
      setNotes(updatedDetails.userBook.notas || []);
      setNewNote("");
    } catch (err) {
      showError("Failed to add note. Please try again.");
    }
  };

  const deleteNote = async (noteId: string) => {
    const token = localStorage.getItem("token");
    const usuarioId = localStorage.getItem("usuarioId");

    if (!token || !usuarioId) {
      showError("Authentication error.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4200/userbooks/notes", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ usuarioId, libroId: id, notaId: noteId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete note");
      }

      const updatedDetails = await response.json();
      setNotes(updatedDetails.userBook.notas || []);
    } catch (err) {
      showError("Failed to delete note. Please try again.");
    }
  };

  const editNote = async () => {
    const token = localStorage.getItem("token");
    const usuarioId = localStorage.getItem("usuarioId");

    if (!token || !usuarioId || !editNoteContent.trim()) {
      showError("Please enter a valid note.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4200/userbooks/notes", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          usuarioId,
          libroId: id,
          notaId: editNoteId,
          content: editNoteContent.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to edit note");
      }

      const updatedDetails = await response.json();
      setNotes(updatedDetails.userBook.notas || []);
      setEditNoteId(null);
      setEditNoteContent("");
    } catch (err) {
      showError("Failed to edit note. Please try again.");
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

  const showError = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  return (
    <div className="flex">
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

      {/* Main content */}
      <div className="sm:ml-16 w-full min-h-screen bg-green-100 py-8 px-4 sm:px-8 pb-16">
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

            {/* Reading Progress */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex items-center mb-6">
                <h3 className="text-xl font-bold text-gray-700 flex-shrink-0 mr-6">
                  Reading Progress
                </h3>
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
                <div className="sm:mt-0 flex items-center">
                  <p className="text-gray-700 text-base sm:text-lg mr-4">
                    <strong>How many pages have you read?</strong>
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

            {/* Notes Section */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Your Notes</h3>
              <div className="mb-4 flex gap-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a note..."
                  className="flex-grow p-2 border border-green1 rounded"
                />
                <button
                  onClick={addNote}
                  className="bg-green1 text-white px-4 py-2 rounded"
                >
                  Add Note
                </button>
              </div>

              <div className="space-y-4">
  {notes.map((note) => (
    <div
      key={note._id}
      className="bg-green-50 p-4 rounded shadow-md flex justify-between items-center"
    >
      {editNoteId === note._id ? (
        <div className="flex-grow">
          <input
            type="text"
            value={editNoteContent}
            onChange={(e) => setEditNoteContent(e.target.value)}
            className="w-full p-2 border border-green1 rounded"
          />
        </div>
      ) : (
        <p className="flex-grow mr-5">{note.content}</p>
      )}

      <div className="flex gap-2">
        {editNoteId === note._id ? (
          <>
            <button
              onClick={editNote}
              className="bg-green1 text-white px-3 py-1 rounded hover:bg-green2 transition ml-4 mr-1"
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditNoteId(null);
                setEditNoteContent("");
              }}
              className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700 transition"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                setEditNoteId(note._id);
                setEditNoteContent(note.content);
              }}
              className="bg-green1 text-white px-3 py-1 rounded hover:bg-green2 transition"
            >
              Edit
            </button>
            <button
              onClick={() => deleteNote(note._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition flex items-center gap-1"
            >
              <FaTrash />
            </button>
          </>
        )}
      </div>
    </div>
  ))}
</div>

            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
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
              <span className="font-medium">Error:</span> {error}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookProgressPage;
