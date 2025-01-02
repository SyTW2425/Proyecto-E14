import React from "react";
import { useNavigate } from "react-router-dom";

export const MainPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Limpia el token de sesión
    navigate("/signin"); // Redirige al usuario al inicio de sesión
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Barra superior */}
      <header className="w-full h-12 bg-gray-800 text-white flex items-center justify-between px-4">
        <h1 className="text-lg font-bold">Welcome!</h1>
        <button
          onClick={handleLogout}
          className="text-sm bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Log Out
        </button>
      </header>

      {/* Contenido principal */}
      <main className="flex-grow p-4">
        <h2 className="text-2xl font-bold">Dashboard Content Here</h2>
        {/* Aquí va el contenido de tu página */}
      </main>
    </div>
  );
};

export default MainPage;
