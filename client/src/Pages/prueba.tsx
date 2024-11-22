import React, { useState } from "react";

export const SignIn = () => {
  //const [formData];
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add your form submission logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-beige-100 dark:bg-beige-200">
      <div className="flex w-full max-w-5xl mx-auto overflow-hidden bg-beige-50 rounded-xl shadow-lg dark:bg-beige-300">
        {/* Imagen */}
        <div
          className="hidden bg-cover lg:block lg:basis-3/5"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1483736624420-dd3c4c0f12c4?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div>

        {/* Formulario */}
        <div className="w-full px-12 py-12 md:px-16 lg:w-3/5">
          <div className="flex justify-center mx-auto">
            <img
              className="w-auto h-12 sm:h-14"
              src="http://logobook.com/wp-content/uploads/2017/04/Get_London_Reading_logo.svg"
              alt="Logo"
            />
          </div>

          <p className="mt-6 text-2xl text-center text-green-800 dark:text-green-900">
            Welcome back!
          </p>

          <div className="flex items-center justify-between mt-8">
            <span className="w-1/5 border-b border-green-700 dark:border-green-900 lg:w-1/4"></span>

            <p className="text-sm text-center text-green-800 uppercase dark:text-green-900">
              Log in to your account
            </p>

            <span className="w-1/5 border-b border-green-700 dark:border-green-900 lg:w-1/4"></span>
          </div>

          <div className="mt-8">
            <label
              className="block mb-3 text-sm font-medium text-green-800 dark:text-green-900"
              htmlFor="LoggingEmailAddress"
            >
              Email Address
            </label>
            <input
              id="LoggingEmailAddress"
              className="block w-full px-5 py-3 text-green-800 bg-beige-50 border border-green-700 rounded-lg dark:bg-beige-300 dark:text-green-900 dark:border-green-800 focus:border-green-900 focus:ring-opacity-40 dark:focus:border-green-900 focus:outline-none focus:ring focus:ring-green-800"
              type="email"
            />
          </div>

          <div className="mt-6">
            <label
              className="block mb-3 text-sm font-medium text-green-800 dark:text-green-900"
              htmlFor="loggingPassword"
            >
              Password
            </label>
            <input
              id="loggingPassword"
              className="block w-full px-5 py-3 text-green-800 bg-beige-50 border border-green-700 rounded-lg dark:bg-beige-300 dark:text-green-900 dark:border-green-800 focus:border-green-900 focus:ring-opacity-40 dark:focus:border-green-900 focus:outline-none focus:ring focus:ring-green-800"
              type="password"
            />
          </div>

          <div className="mt-8">
            <button className="w-full px-6 py-3 text-base font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-800 rounded-lg hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-50">
              Sign In
            </button>
          </div>

          <div className="flex items-center justify-between mt-8">
            <span className="w-1/5 border-b border-green-700 dark:border-green-900 md:w-1/4"></span>

            <button
              className="text-sm text-green-800 uppercase dark:text-green-900 hover:underline"
              onClick={() => {
                /* Add your click handler logic here */
              }}
            >
              or sign up
            </button>

            <span className="w-1/5 border-b border-green-700 dark:border-green-900 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
