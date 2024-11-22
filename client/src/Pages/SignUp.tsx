import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSession } from "../slices/sessionSlice";
import { AppDispatch } from "../redux/store";

const BACKEND_LOGIN_URL = `${process.env.REACT_APP_BACKEND_URL}/auth/signin`;
const LOCAL_STORAGE_NAME = process.env.REACT_APP_LOCAL_STORAGE_NAME || "token";
const BACKEND_REGISTER_URL = `${process.env.REACT_APP_BACKEND_URL}/auth/signup`;

export const SignUp: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [lecturePreferences, setLecturePreferences] = useState("");
  const [error, setError] = useState("");

  const validateInputs = () => {
    if (!name.trim()) return "Name is required.";
    if (!username.trim()) return "Username is required.";
    if (!email.trim()) return "Email is required.";
    if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email format.";
    if (!password.trim()) return "Password is required.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (password !== confirmPassword) return "Passwords do not match.";
    if (!lecturePreferences.trim()) return "Lecture preferences are required.";
    return null;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(BACKEND_REGISTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: name,
          username,
          correo: email,
          password,
          preferencias_lectura: lecturePreferences,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "An error occurred trying to sign up."
        );
      }

      const data = await response.json();
      localStorage.setItem(LOCAL_STORAGE_NAME, data.token);
      dispatch(setSession({ token: data.token, userObject: data.user }));

      navigate("/");
    } catch (err: any) {
      setError(err.message || "An error occurred, try again later.");
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
      await handleSignUp(e);
    } catch (err: any) {
      setError(err.message || "An error occurred, try again later.");
    }
  };

  return <h1>Sign Up</h1>;
};

export default SignUp;
