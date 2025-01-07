import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSession } from "../slices/sessionSlice";
import { AppDispatch } from "../redux/store";

//const BACKEND_LOGIN_URL = `${process.env.REACT_APP_BACKEND_URL}/auth/signin`;
const LOCAL_STORAGE_NAME = process.env.REACT_APP_LOCAL_STORAGE_NAME || "token";
const BACKEND_REGISTER_URL = `${process.env.REACT_APP_BACKEND_URL}/auth/signup`;
const BACKEND_GENRES_URL = `${process.env.REACT_APP_BACKEND_URL}/genres`;

export const SignUp: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [availableGenres, setAvailableGenres] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<
    Record<string, string> | string
  >("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

    useEffect(() => {
      document.title = "Sign Up"; // Cambia el título de la pestaña
  }, []);

  // Fetch genres from the backend
  useEffect(() => {
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
        setGeneralError("Could not load genres. Please try again later.");
      }
    };
    fetchGenres();
  }, []);

  const validateInputs = () => {
    const errors: Record<string, string> = {};

    if (!username.trim()) errors.username = "Username is required.";
    if (!email.trim()) errors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email))
      errors.email = "Invalid email format.";
    if (!password.trim()) errors.password = "Password is required.";
    else if (password.length < 6)
      errors.password = "Password must be at least 6 characters.";
    if (password !== confirmPassword)
      errors.confirmPassword = "Passwords do not match.";
    //if (selectedGenres.length === 0)
    //  errors.selectedGenres = "At least one genre must be selected.";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleSignUp = async () => {
    setGeneralError("");

    try {
      const response = await fetch(BACKEND_REGISTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          correo: email,
          password,
          preferenciasLectura: selectedGenres,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "An error occurred.");
      }

      const data = await response.json();

      // Save token and user session
      localStorage.setItem(LOCAL_STORAGE_NAME, data.token);
      dispatch(setSession({ token: data.token, userObject: data.userObject }));

      // Limpia los campos
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setSelectedGenres([]);

      navigate("/signin");
    } catch (err: any) {
      setGeneralError(err.message || "An unexpected error occurred.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const error = validateInputs();
    if (error) {
      setGeneralError(error);
      return;
    }

    try {
      await handleSignUp();
    } catch (err: any) {
      setGeneralError(err.message || "An error occurred, try again later.");
    }
  };

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genre)
        ? prevGenres.filter((g) => g !== genre)
        : [...prevGenres, genre]
    );
  };

  // function setPasswordConfirmation(value: string): void {
  //   throw new Error("Function not implemented.");
  // }


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex w-screen flex-wrap text-slate-800">
      <div className="relative hidden h-screen select-none flex-col justify-center bg-green2 text-center md:flex md:w-1/2">
        <div className="mx-auto py-16 px-8 text-white xl:w-[40rem]"></div>
      </div>
      <div className="flex w-full flex-col md:w-1/2 -mt-1 mt-28 lg:mt-0">
        <div className="flex justify-center pt-8 md:justify-start md:pl-12">
          <button className="text-2xl font-bold text-green1 hover:text-green2 sm:-ml-8">
            {" "}
            Bookies .{" "}
          </button>
        </div>
        <div className="my-20 mx-auto flex flex-col justify-center px-6 md:justify-start lg:w-[28rem]  ">
          <p className="text-center text-3xl font-bold md:text-left md:leading-tight">
            Create your account
          </p>
          <p className="mt-6 text-center font-medium md:text-left text-gray-500">
            Already have an account? {""}
            <button
              className="whitespace-nowrap font-bold text-green1 hover:text-green2 hover:underline"
              onClick={() => navigate("/signin")}
            >
              Login here
            </button>
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-stretch pt-3 md:pt-8"
          >
            {/* Username */}
            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border transition focus-within:border-blue-600">
                <input
                  type="text"
                  id="user-name"
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {fieldErrors.username && (
                  <p className="text-red-600 text-sm">{fieldErrors.username}</p>
                )}
              </div>
            </div>
            {/* email */}
            <div className="flex flex-col pt-4 -mt-2">
              <div className="relative flex overflow-hidden rounded-md border transition focus-within:border-blue-600">
                <input
                  type="email"
                  id="login-email"
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {fieldErrors.email && (
                  <p className="text-red-600 text-sm">{fieldErrors.email}</p>
                )}
              </div>
            </div>
            {/* Password */}
            <div className="mb-3 flex flex-col pt-4 -mt-2">
              <div className="relative flex overflow-hidden rounded-md border transition focus-within:border-blue-600">
                <input
                  type="password"
                  id="login-password"
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Password (minimum 6 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {fieldErrors.password && (
                  <p className="text-red-600 text-sm">{fieldErrors.password}</p>
                )}
              </div>
            </div>
            {/* Confirm Password */}
            <div className="mb-3 flex flex-col pt-4 -mt-6">
              <div className="relative flex overflow-hidden rounded-md border transition focus-within:border-blue-600">
                <input
                  type="password"
                  id="confirm-password"
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {fieldErrors.confirmPassword && (
                  <p className="text-red-600 text-sm">
                    {fieldErrors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* Dropdown Preferences */}
          {/* Dropdown Preferences */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownVisible(!dropdownVisible)}
              className="w-full py-2 px-4 border rounded-md text-left bg-white text-gray-400"
            >
              {selectedGenres.length > 0
                ? `Selected: ${selectedGenres.join(", ")}`
                : "Select Preferences"}
            </button>
            {dropdownVisible && (
              <div
                ref={dropdownRef}
                className="absolute w-full bg-white border rounded-md shadow-lg max-h-48 overflow-y-auto mt-2 z-10"
              >
                {availableGenres.map((genre) => (
                  <div
                    key={genre}
                    className="flex items-center px-4 py-2 hover:bg-green2 hover:text-white cursor-pointer"
                    onClick={() => toggleGenre(genre)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedGenres.includes(genre)}
                      readOnly
                      className="mr-2"
                    />
                    <span>{genre}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

            {fieldErrors.selectedGenres && (
              <p className="text-red-600 text-sm mt-3 text-center">
                {fieldErrors.selectedGenres}
              </p>
            )}

            {/* General Error */}
            {generalError && (
              <p className="text-red-600 text-sm mt-3 text-center">
                {typeof generalError === "string" ? generalError : ""}
              </p>
            )}

            <button
              type="submit"
              className="mt-6 w-full rounded-lg bg-green1 px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-blue-500 ring-offset-2 transition hover:bg-green2 focus:ring-2"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;


