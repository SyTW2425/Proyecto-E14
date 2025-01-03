import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

export const UserLibraryPage: React.FC = () => {
  const navigate = useNavigate();
  const [libraryBooks, setLibraryBooks] = useState<Book[]>([]);

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
          const userId = decodedToken.id; // Extrae el usuarioId del token
          console.log("User ID:", userId);
      
          const response = await fetch(`http://localhost:4200/userbooks/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          if (!response.ok) {
            throw new Error("Failed to fetch user books");
          }
      
          const data = await response.json();
          console.log("User books fetched:", data);
          setLibraryBooks(data.map((entry: { libroId: Book }) => entry.libroId));
        } catch (error) {
          console.error("Error fetching user library:", error);
        }
      };      

    fetchUserBooks();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-green-100 flex flex-col">
      <header className="py-4 bg-green1 text-white text-center text-2xl font-bold">
        My Library
      </header>

      <div className="flex-grow p-6 max-w-screen-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {libraryBooks.map((book) => (
          <div
            key={book._id}
            className="max-w-sm rounded overflow-hidden bg-white shadow-lg"
          >
            <img
              src={book.portada}
              alt={`${book.titulo} cover`}
              className="w-full h-64 object-cover"
            />
            <div className="px-6 py-4">
              <h3 className="font-bold text-xl">{book.titulo}</h3>
              <p className="text-gray-700">By {book.autor}</p>
              <p className="text-gray-700">
                <strong>Genre:</strong> {book.genero}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserLibraryPage;
