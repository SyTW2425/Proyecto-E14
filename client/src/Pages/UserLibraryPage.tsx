// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// interface Book {
//   _id: string;
//   titulo: string;
//   autor: string;
//   genero: string;
//   paginas: number;
//   sinopsis: string;
//   portada: string;
// }

// export const UserLibraryPage: React.FC = () => {
//   const navigate = useNavigate();
//   const [libraryBooks, setLibraryBooks] = useState<Book[]>([]);

//   useEffect(() => {
//     const fetchUserBooks = async () => {
//         const token = localStorage.getItem("token");
      
//         if (!token) {
//           console.error("Token not found. Redirecting to Sign In...");
//           navigate("/signin");
//           return;
//         }
      
//         try {
//           const decodedToken = jwtDecode<{ id: string }>(token || "");
//           const userId = decodedToken.id; // Extrae el usuarioId del token
//           console.log("User ID:", userId);
      
//           const response = await fetch(`http://localhost:4200/userbooks/${userId}`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
      
//           if (!response.ok) {
//             throw new Error("Failed to fetch user books");
//           }
      
//           const data = await response.json();
//           console.log("User books fetched:", data);
//           setLibraryBooks(data.map((entry: { libroId: Book }) => entry.libroId));
//         } catch (error) {
//           console.error("Error fetching user library:", error);
//         }
//       };      

//     fetchUserBooks();
//   }, [navigate]);

//   return (
//     <div className="min-h-screen bg-green-100 flex flex-col">
//       <header className="py-4 bg-green1 text-white text-center text-2xl font-bold">
//         My Library
//       </header>

//       <div className="flex-grow p-6 max-w-screen-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {libraryBooks.map((book) => (
//           <div
//             key={book._id}
//             className="max-w-sm rounded overflow-hidden bg-white shadow-lg"
//           >
//             <img
//               src={book.portada}
//               alt={`${book.titulo} cover`}
//               className="w-full h-64 object-cover"
//             />
//             <div className="px-6 py-4">
//               <h3 className="font-bold text-xl">{book.titulo}</h3>
//               <p className="text-gray-700">By {book.autor}</p>
//               <p className="text-gray-700">
//                 <strong>Genre:</strong> {book.genero}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UserLibraryPage;



import React, { useEffect, useState } from "react";
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
        const userId = decodedToken.id;
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
    <div className="min-h-screen bg-green-100 flex">
      {/* Sidebar */}
      <nav className="fixed top-0 left-0 h-screen w-16 bg-green1 text-white flex flex-col justify-center items-center">
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

      {/* Main Content */}
      <div className="flex-grow ml-16">
        <header className="sticky top-0 z-20 bg-green-100 shadow-md py-4">
          <h1 className="text-green1 text-3xl font-bold text-center">My Library</h1>
        </header>

        <main className="py-6 px-4">
          <div className="max-w-screen-2xl mx-auto space-y-4">
            {libraryBooks.map((book) => (
              <div
                key={book._id}
                className="flex items-start bg-white rounded-lg shadow-md overflow-hidden"
              >
                {/* Book Cover */}
                <img
                  src={book.portada}
                  alt={`${book.titulo} cover`}
                  className="w-32 h-40 object-cover"
                />

                {/* Book Details */}
                <div className="p-4 flex-grow">
                  <h2 className="text-xl font-bold mb-2">{book.titulo}</h2>
                  <p className="text-gray-700 mb-1">
                    <strong>Author:</strong> {book.autor}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <strong>Genre:</strong> {book.genero}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <strong>Pages:</strong> {book.paginas}
                  </p>
                  <p className="text-gray-700">
                    <strong>Synopsis:</strong> {book.sinopsis}
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
