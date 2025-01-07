import React, { useState, useEffect, useRef } from "react";
import { FaSearchPlus, FaBook, FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface User {
  _id: string;
  username: string;
  correo: string;
  preferenciasLectura: string[];
}

const BACKEND_GENRES_URL = `${process.env.REACT_APP_BACKEND_URL}/genres`;

const UserProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [preferences, setPreferences] = useState<string[]>([]);
  const [availableGenres, setAvailableGenres] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Editing states for username and email
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [isEditingemail, setIsEditingemail] = useState(false);
  const [newemail, setNewemail] = useState("");

  // Password editing states
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      document.title = "Profile"; // Cambia el título de la pestaña
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      const usuarioId = localStorage.getItem("usuarioId");

      if (!token || !usuarioId) {
        setError("Authentication error: Token or User ID not found.");
        navigate("/signin");
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:4200/usuarios/${usuarioId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const data = await response.json();
        setUser(data);
        setPreferences(data.preferenciasLectura || []);
        setNewUsername(data.username);
        setNewemail(data.correo);
        setError(null);
      } catch (err) {
        setError("Failed to load user details.");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchGenres = async () => {
      try {
        const response = await fetch(BACKEND_GENRES_URL);
        if (!response.ok) {
          throw new Error("Failed to load genres");
        }
        const data = await response.json();
        setAvailableGenres(data.genres || []);
      } catch (err) {
        console.error("Error fetching genres:", err);
        setError("Could not load genres. Please try again later.");
      }
    };

    fetchUserDetails();
    fetchGenres();
  }, [navigate]);

  const toggleGenre = async (genre: string) => {
    const updatedPreferences = preferences.includes(genre)
      ? preferences.filter((g) => g !== genre)
      : [...preferences, genre];

    setPreferences(updatedPreferences);

    try {
      const token = localStorage.getItem("token");
      const usuarioId = localStorage.getItem("usuarioId");

      if (!token || !usuarioId) {
        setError("Authentication error.");
        return;
      }

      const response = await fetch(`http://localhost:4200/usuarios/${usuarioId}/preferences`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ preferenciasLectura: updatedPreferences }),
      });

      if (!response.ok) {
        throw new Error("Failed to update preferences");
      }

      setUser((prevUser) => {
        if (!prevUser) return prevUser;
        return {
          ...prevUser,
          preferenciasLectura: updatedPreferences,
        };
      });

      setError(null);
    } catch (err) {
      console.error("Error updating preferences:", err);
      setError("Failed to update preferences.");
    }
  };

  const handleUsernameSave = async () => {
    if (!user) return;

    try {
      const token = localStorage.getItem("token");
      const usuarioId = localStorage.getItem("usuarioId");

      const response = await fetch(`http://localhost:4200/usuarios/${usuarioId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username: newUsername }),
      });

      if (!response.ok) {
        throw new Error("Failed to update username");
      }

      setUser((prevUser) =>
        prevUser ? { ...prevUser, username: newUsername } : prevUser
      );
      setIsEditingUsername(false);
      setError(null);
    } catch (err) {
      console.error("Error updating username:", err);
      setError("Failed to update username.");
    }
  };

  const handleemailSave = async () => {
    if (!user) return;

    try {
      const token = localStorage.getItem("token");
      const usuarioId = localStorage.getItem("usuarioId");

      const response = await fetch(`http://localhost:4200/usuarios/${usuarioId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ correo: newemail }),
      });

      if (!response.ok) {
        throw new Error("Failed to update email");
      }

      setUser((prevUser) =>
        prevUser ? { ...prevUser, correo: newemail } : prevUser
      );
      setIsEditingemail(false);
      setError(null);
    } catch (err) {
      console.error("Error updating email:", err);
      setError("Failed to update email.");
    }
  };

  const handlePasswordSave = async () => {
    if (!user) return;

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const usuarioId = localStorage.getItem("usuarioId");

      const response = await fetch(`http://localhost:4200/usuarios/${usuarioId}/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!response.ok) {
        throw new Error("Failed to update password");
      }

      setIsEditingPassword(false);
      setError(null);
      alert("Password updated successfully!");
    } catch (err) {
      setError("Failed to update password.");
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    // Remove token and user ID from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("usuarioId");
    // Redirect to the sign-in page
    navigate("/signin");
  };


  return (
    <div className="flex bg-green-100 min-h-screen overflow-hidden">
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

        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 px-4 py-2 bg-green1 text-white rounded-lg hover:bg-green2"
        >
          Log Out
        </button>

      {/* Main Content */}
      <div className="sm:ml-16 w-full min-h-screen bg-green-100 py-8 flex justify-center items-center">
        {isLoading && (
          <div className="flex justify-center items-center mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-green1"></div>
          </div>
        )}
        {user && (
          <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-xl mx-2">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 text-center">
              User Profile
            </h3>

            {/* Username */}
            <div className="flex flex-wrap items-center gap-2 mb-3 text-lg text-gray-700">
              <strong>Username:</strong>
              {isEditingUsername ? (
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  onBlur={handleUsernameSave}
                  className="bg-gray-100 border rounded px-2 py-1 text-sm"
                  autoFocus
                />
              ) : (
                <span
                  className="bg-blue-200 text-blue-800 px-2 py-1 rounded text-sm cursor-pointer"
                  onClick={() => setIsEditingUsername(true)}
                >
                  {user.username}
                </span>
              )}
            </div>

            {/* email */}
            <div className="flex flex-wrap items-center gap-2 mb-3 text-lg text-gray-700 ">
              <strong>Email:</strong>
              {isEditingemail ? (
                <input
                  type="email"
                  value={newemail}
                  onChange={(e) => setNewemail(e.target.value)}
                  onBlur={handleemailSave}
                  className="bg-gray-100 border rounded px-2 py-1 text-sm"
                  autoFocus
                />
              ) : (
                <span
                  className="bg-blue-200 text-blue-800 px-2 py-1 rounded text-sm cursor-pointer ml-10"
                  onClick={() => setIsEditingemail(true)}
                >
                  {user.correo}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mt-4 flex-wrap text-lg text-gray-700">
                <strong>Password:</strong>
                {isEditingPassword ? (
                    <div className="flex flex-col gap-2 w-full">
                    <input
                        type="password"
                        placeholder="Current Password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="bg-gray-100 border rounded px-2 py-1 text-sm w-full"
                    />
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="bg-gray-100 border rounded px-2 py-1 text-sm w-full"
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="bg-gray-100 border rounded px-2 py-1 text-sm w-full"
                    />
                    <div className="flex gap-2 w-full">
                        <button
                        onClick={handlePasswordSave}
                        className="bg-green1 hover:bg-green2 text-white px-4 py-2 rounded w-full"
                        >
                        Save Password
                        </button>
                        <button
                        onClick={() => {
                            // Reset editing state and fields
                            setIsEditingPassword(false);
                            setCurrentPassword("");
                            setNewPassword("");
                            setConfirmPassword("");
                        }}
                        className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded w-full"
                        >
                        Cancel
                        </button>
                    </div>
                    </div>
                ) : (
                    <button
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-2 py-1 rounded flex items-center gap-2 ml-1"
                    onClick={() => setIsEditingPassword(true)}
                    >
                    <FaLock />
                    Change Password
                    </button>
                )}
            </div>


            {/* Reading Preferences */}
            <div className="text-gray-700 text-lg mt-4">
              <div className="flex flex-wrap items-center gap-2">
                <strong>Reading Preferences:</strong>
                {preferences.length > 0 ? (
                  preferences.map((genre) => (
                    <span
                      key={genre}
                      className="bg-green-200 text-green-800 px-2 py-1 rounded text-sm"
                    >
                      {genre}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500">No preferences selected</span>
                )}
              </div>
              <div className="mt-4 flex justify-center relative">
                <button
                  id="dropdownCheckboxButton"
                  onClick={toggleDropdown}
                  ref={dropdownButtonRef}
                  className="text-white bg-green1 hover:bg-green2 focus:ring-1 focus:outline-none focus:ring-green3 font-medium rounded-lg text-sm px-4 py-2 flex items-center"
                  type="button"
                >
                  Update Preferences
                  <svg
                    className="w-2.5 h-2.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                {dropdownVisible && (
                  <div
                    ref={dropdownRef}
                    className="z-50 mt-1 bg-white divide-y divide-gray-100 rounded-lg shadow absolute overflow-y-auto"
                    style={{
                      top: "100%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: dropdownButtonRef.current?.offsetWidth || "100%",
                      maxHeight: "200px",
                    }}
                  >
                    <ul className="p-3 space-y-3 text-sm text-gray-700">
                      {availableGenres.map((genre) => (
                        <li key={genre}>
                          <div className="flex items-center">
                            <input
                              id={genre}
                              type="checkbox"
                              checked={preferences.includes(genre)}
                              className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                              onChange={() => toggleGenre(genre)}
                            />
                            <label
                              htmlFor={genre}
                              className="ms-2 text-sm font-medium text-gray-900"
                            >
                              {genre}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="fixed bottom-4 right-4 z-50 flex items-center p-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 shadow-lg">
            <span className="font-medium">Error:</span> {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
