import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSession } from "../slices/sessionSlice";
import { AppDispatch } from "../redux/store";

const BACKEND_LOGIN_URL = `${process.env.REACT_APP_BACKEND_URL}/auth/signin`;
const LOCAL_STORAGE_NAME = process.env.REACT_APP_LOCAL_STORAGE_NAME || "token";

export const SignIn: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateInputs = () => {
    if (!email.trim()) {
      return "Email is required";
    }
    if (!/\S+@\S+\.\S+/.test(email)) return "Email format is invalid";
    if (!password.trim()) {
      return "Password is required";
    }
    return null;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(BACKEND_LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo: email, password }), // Enviar email y contraseña al backend
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "An error occurred tryinh to sign in"
        );
      }

      const data = await response.json();
      // Guardar el token en el localStorage
      localStorage.setItem(LOCAL_STORAGE_NAME, data.token);
      //Actualizar el estado global de la sesión
      dispatch(setSession({ token: data.token, userObject: data.user }));

      navigate("/main"); // Redirigir a la página principal
    } catch (err: any) {
      setError(err.message || "An error occurred try again later");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const error = validateInputs();
    if (error) {
      setError(error);
      return;
    }

    try {
      await handleSignIn(e);
    } catch (err: any) {
      setError(err.message || "An error occurred try again later");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 font-roboto">
      <div className="flex justify-center h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1483736624420-dd3c4c0f12c4?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            backgroundPosition: "center",
            backgroundSize: "cover",
            borderRadius: "0 20px 20px 0",
          }}
        >
          <div
            className="flex items-center h-full px-20 bg-gray-900 bg-opacity-20"
            style={{
              borderTopRightRadius: "20px",
              borderBottomRightRadius: "20px",
            }}
          ></div>
        </div>

        <div className="flex items-center w-full max-w-md px-4 mx-auto lg:w-3/6">
          <div className="flex-1">
            <div className="text-center">
              <div className="flex justify-center mx-auto -mt-5">
                <img
                  className="w-auto h-7 sm:h-48 relative -top-10"
                  src="https://i.pinimg.com/enabled_lo_mid/736x/3e/d7/0f/3ed70fa19051210022aa846872c8f335.jpg"
                  alt="Logo Bookies"
                />
              </div>

              <p className="mt-3 block text-xl font-bold text-gray-900 relative -top-20">
                Sign in to access your account
              </p>
            </div>

            <div className="mt-8 -mt-7">
              <form onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm/6 font-medium text-gray-600"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    //placeholder="example@example.com"
                    onChange={(e) => setEmail(e.target.value)} // Actualizar el estado del email
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-green1 dark:focus:border-green1 focus:ring-green1 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <label
                      htmlFor="password"
                      className="block text-sm/6 font-medium text-gray-600"
                    >
                      Password
                    </label>
                  </div>

                  <input
                    type="password"
                    name="password"
                    id="password"
                    //placeholder="Your Password"
                    onChange={(e) => setPassword(e.target.value)} // Actualizar el estado de la contraseña
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-green1 dark:focus:border-green2 focus:ring-green2 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                {error && (
                  <p className="mt-4 text-sm text-center text-red-600">
                    {error}
                  </p>
                )}

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-green1 rounded-lg hover:bg-green2 focus:outline-none focus:bg-green1 focus:ring focus:ring-green2 focus:ring-opacity-50"
                  >
                    Sign in
                  </button>
                </div>
              </form>

              <p className="mt-6 text-sm text-center text-gray-400">
                Don&#x27;t have an account yet?{" "}
                <button
                  className="text-green1 focus:outline-none focus:underline hover:text-green2 hover:underline"
                  onClick={() => navigate("/signup")} // Navega a /signup
                >
                  Sign up
                </button>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
