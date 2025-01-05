import React, { useState } from "react";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <div className="font-roboto text-gray-900">
      {/* Header */}
      <header className="header bg-transparent absolute top-0 left-0 z-40 w-full flex items-center transition sticky backdrop-filter backdrop-blur-lg bg-opacity-60">
        <div className="container mx-auto flex items-center justify-between px-3 py-4">
          <h1 className="text-4xl font-extrabold text-green2">Bookies.</h1>
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#hero"
              className="text-gray-600 hover:text-green1 font-medium transition"
            >
              Home
            </a>
            <a
              href="#features"
              className="text-gray-600 hover:text-green1 font-medium transition"
            >
              Features
            </a>
            <a
              href="#testimonial"
              className="text-gray-600 hover:text-green1 font-medium transition"
            >
              Testimonials
            </a>
            <button
              className="text-orange-300 hover:text-green1 font-medium transition"
              onClick={() => (window.location.href = "/signin")}
            >
              Sign In
            </button>
            <button
              onClick={() => (window.location.href = "/signup")}
              className="bg-green2 text-white font-medium px-4 py-2 rounded-lg shadow hover:bg-orange-300 transition"
            >
              Sign Up
            </button>
          </nav>
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl text-green2 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg absolute top-full left-0 w-full z-50 py-4">
            <nav className="flex flex-col items-center space-y-4">
              <a
                href="#hero"
                className="text-gray-600 hover:text-green1 font-medium transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#features"
                className="text-gray-600 hover:text-green1 font-medium transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#testimonial"
                className="text-gray-600 hover:text-green1 font-medium transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </a>
              <button
                className="text-orange-300 hover:text-green1 font-medium transition"
                onClick={() => {
                  window.location.href = "/signin";
                  setIsMenuOpen(false);
                }}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  window.location.href = "/signup";
                  setIsMenuOpen(false);
                }}
                className="bg-green2 text-white font-medium px-4 py-2 rounded-lg shadow hover:bg-orange-300 transition"
              >
                Sign Up
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        className="bg-gradient-to-t from-green1 to-white text-white py-44"
        id="hero"
      >
        <div className="container mx-auto px-6 text-center -mb-24">
          <h2 className="text-6xl font-bold mb-9 text-green1 -mt-24">
            Welcome to <span className="text-orange-300">Bookies.</span>
          </h2>
          <div className="flex justify-center items-center">
            <img
              src="https://i.pinimg.com/originals/6a/c5/e8/6ac5e88f1a042fc5e8a1ca4cf023be22.jpg"
              alt="Bookies Hero"
              className="rounded-lg shadow-lg w-3/5 max-w2xl"
            />
          </div>
          {/* <p className="text-xl mt-8 font-medium text-white mb-8">
            Organize your library, track your reading, and unlock the full
            potential of your literary journey.
          </p> */}
          <p className="text-xl mt-8 font-medium text-white mb-8">
            <span className="text-orange-300">Organize</span> your library,
            <span className="text-orange-300"> track</span> your reading, and
            <span className="text-orange-300"> unlock</span> the full potential
            of your literary journey.
          </p>
          <button
            onClick={() => (window.location.href = "/signup")}
            className="bg-orange-300 text-gray-100 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 hover:text-green1 transition"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="pt-[100px]">
        <div className="container">
          <div className="flex flex-wrap mx-[-16px]">
            <div className="w-full px-4">
              <div
                className="mx-auto max-w-[655px] text-center mb-20 wow fadeInUp"
                data-wow-delay=".1s"
                style={{ visibility: "visible", animationDelay: "0.1s" }}
              >
                <h2 className="text-black font-bold text-3xl sm:text-4xl md:text-[45px] mb-5">
                  Why Bookies?
                </h2>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed md:leading-relaxed max-w-[570px] mx-auto">
                  Bookies helps you organize your library and track your reading
                  progress, making your literary journey seamless and enjoyable.
                </p>
              </div>
            </div>
          </div>

          <div className="pb-12 border-b border-[#E9ECF8]">
            <div className="flex flex-wrap mx-[-16px]">
              <div className="w-full md:w-1/2 lg:w-1/3 px-4">
                <div
                  className="mb-[70px] text-center 2xl:px-5 wow fadeInUp"
                  data-wow-delay=".15s"
                  style={{ visibility: "visible", animationDelay: "0.15s" }}
                >
                  <div className="mb-9 flex justify-center">
                    <svg
                      width="50"
                      height="50"
                      viewBox="0 0 50 50"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.5"
                        d="M27.2727 0.000488281V15.9096H34.0909L25 27.2732L15.9091 15.9096H22.7273V0.000488281H27.2727Z"
                        fill="#49ab81"
                      ></path>
                      <path
                        d="M43.1818 0.000488281H34.0909V4.54594H43.1818C43.7846 4.54594 44.3627 4.78539 44.7889 5.21161C45.2151 5.63783 45.4545 6.21591 45.4545 6.81867V31.8187H31.8182V38.6369H18.1818V31.8187H4.54545V6.81867C4.54545 6.21591 4.7849 5.63783 5.21112 5.21161C5.63734 4.78539 6.21542 4.54594 6.81818 4.54594H15.9091V0.000488281H6.81818C5.00989 0.000488281 3.27566 0.71883 1.997 1.99749C0.718341 3.27614 0 5.01038 0 6.81867V43.1823C0 44.9906 0.718341 46.7248 1.997 48.0035C3.27566 49.2821 5.00989 50.0005 6.81818 50.0005H43.1818C44.9901 50.0005 46.7243 49.2821 48.003 48.0035C49.2817 46.7248 50 44.9906 50 43.1823V6.81867C50 5.01038 49.2817 3.27614 48.003 1.99749C46.7243 0.71883 44.9901 0.000488281 43.1818 0.000488281Z"
                        fill="#49ab81"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="font-bold text-black text-xl sm:text-2xl lg:text-xl xl:text-2xl mb-5">
                    Accessibility
                  </h3>
                  <p className="text-gray-700 text-base leading-relaxed">
                    Access your library from anywhere, anytime. Bookies
                    leverages SaaS technology to keep your data secure and
                    always available.
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 px-4">
                <div
                  className="mb-[70px] text-center 2xl:px-5 wow fadeInUp"
                  data-wow-delay=".15s"
                  style={{ visibility: "visible", animationDelay: "0.15s" }}
                >
                  <div className="mb-9 flex justify-center">
                    <svg
                      width="50"
                      height="50"
                      viewBox="0 0 50 50"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M27.5265 0.000488281H2.11742C0.948003 0.000488281 0 0.948491 0 2.11791V33.8793C0 35.0487 0.948003 35.9967 2.11742 35.9967H27.5265C28.6959 35.9967 29.6439 35.0487 29.6439 33.8793V2.11791C29.6439 0.948491 28.6959 0.000488281 27.5265 0.000488281Z"
                        fill="#49ab81"
                      ></path>
                      <path
                        opacity="0.5"
                        d="M48.4022 15.1783L34.5141 11.4199L33.4088 15.5087L45.2663 18.7145L38.0692 45.2839L13.541 38.6542L12.4378 42.743L39.0115 49.9274C39.2799 49.9998 39.5601 50.0187 39.8358 49.9829C40.1116 49.9471 40.3776 49.8573 40.6186 49.7187C40.8597 49.5801 41.0711 49.3953 41.2407 49.175C41.4104 48.9547 41.535 48.7031 41.6074 48.4346L49.8929 17.7743C50.0393 17.2324 49.9645 16.6545 49.685 16.1677C49.4054 15.681 48.9441 15.3251 48.4022 15.1783Z"
                        fill="#49ab81"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="font-bold text-black text-xl sm:text-2xl lg:text-xl xl:text-2xl mb-5">
                    Built for Efficiency
                  </h3>
                  <p className="text-gray-700 text-base leading-relaxed">
                    Enjoy a robust and efficient platform designed to handle
                    your reading needs effortlessly, with tools that grow
                    alongside you.
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 px-4">
                <div
                  className="mb-[70px] text-center 2xl:px-5 wow fadeInUp"
                  data-wow-delay=".2s"
                  style={{ visibility: "visible", animationDelay: "0.2s" }}
                >
                  <div className="mb-9 flex justify-center">
                    <svg
                      width="50"
                      height="50"
                      viewBox="0 0 50 50"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.1818 20.455H2.27273C1.66996 20.455 1.09188 20.2156 0.665665 19.7894C0.239446 19.3631 0 18.7851 0 18.1823V2.27322C0 1.67045 0.239446 1.09237 0.665665 0.666153C1.09188 0.239934 1.66996 0.000488281 2.27273 0.000488281H18.1818C18.7846 0.000488281 19.3627 0.239934 19.7889 0.666153C20.2151 1.09237 20.4545 1.67045 20.4545 2.27322V18.1823C20.4545 18.7851 20.2151 19.3631 19.7889 19.7894C19.3627 20.2156 18.7846 20.455 18.1818 20.455Z"
                        fill="#49ab81"
                      ></path>
                      <path
                        d="M18.1818 50.0004H2.27273C1.66996 50.0004 1.09188 49.761 0.665665 49.3348C0.239446 48.9086 0 48.3305 0 47.7277V31.8186C0 31.2159 0.239446 30.6378 0.665665 30.2116C1.09188 29.7853 1.66996 29.5459 2.27273 29.5459H18.1818C18.7846 29.5459 19.3627 29.7853 19.7889 30.2116C20.2151 30.6378 20.4545 31.2159 20.4545 31.8186V47.7277C20.4545 48.3305 20.2151 48.9086 19.7889 49.3348C19.3627 49.761 18.7846 50.0004 18.1818 50.0004Z"
                        fill="#49ab81"
                      ></path>
                      <path
                        opacity="0.5"
                        d="M27.2727 2.27319H50V6.81865H27.2727V2.27319ZM27.2727 13.6368H50V18.1823H27.2727V13.6368ZM27.2727 31.8186H50V36.3641H27.2727V31.8186ZM27.2727 43.1823H50V47.7277H27.2727V43.1823Z"
                        fill="#49ab81"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="font-bold text-black text-xl sm:text-2xl lg:text-xl xl:text-2xl mb-5">
                    Everything You Need
                  </h3>
                  <p className="text-gray-700 text-base leading-relaxed">
                    From organizing your library to tracking your reading
                    progress, Bookies provides all the essential tools in one
                    place.
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 px-4">
                <div
                  className="mb-[70px] text-center 2xl:px-5 wow fadeInUp"
                  data-wow-delay=".15s"
                  style={{ visibility: "visible", animationDelay: "0.15s" }}
                >
                  <div className="mb-9 flex justify-center">
                    <svg
                      width="46"
                      height="50"
                      viewBox="0 0 46 50"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M43.75 6.25049H25V10.4172H43.75C44.3025 10.4172 44.8324 10.1977 45.2231 9.80696C45.6138 9.41626 45.8333 8.88636 45.8333 8.33382C45.8333 7.78129 45.6138 7.25138 45.2231 6.86068C44.8324 6.46998 44.3025 6.25049 43.75 6.25049Z"
                        fill="#49ab81"
                      ></path>
                      <path
                        d="M2.08333 10.4172H12.5V16.6672H20.8333V0.000488281H12.5V6.25049H2.08333C1.5308 6.25049 1.00089 6.46998 0.610193 6.86068C0.219492 7.25138 0 7.78129 0 8.33382C0 8.88636 0.219492 9.41626 0.610193 9.80696C1.00089 10.1977 1.5308 10.4172 2.08333 10.4172Z"
                        fill="#49ab81"
                      ></path>
                      <path
                        d="M43.75 39.5839H25V43.7505H43.75C44.3025 43.7505 44.8324 43.531 45.2231 43.1403C45.6138 42.7496 45.8333 42.2197 45.8333 41.6672C45.8333 41.1147 45.6138 40.5848 45.2231 40.1941C44.8324 39.8034 44.3025 39.5839 43.75 39.5839Z"
                        fill="#49ab81"
                      ></path>
                      <path
                        d="M2.08333 43.7505H12.5V50.0005H20.8333V33.3339H12.5V39.5839H2.08333C1.5308 39.5839 1.00089 39.8034 0.610193 40.1941C0.219492 40.5848 0 41.1147 0 41.6672C0 42.2197 0.219492 42.7496 0.610193 43.1403C1.00089 43.531 1.5308 43.7505 2.08333 43.7505Z"
                        fill="#49ab81"
                      ></path>
                      <path
                        opacity="0.5"
                        d="M43.75 22.9171H37.5V27.0838H43.75C44.3025 27.0838 44.8324 26.8643 45.2231 26.4736C45.6138 26.0829 45.8333 25.553 45.8333 25.0004C45.8333 24.4479 45.6138 23.918 45.2231 23.5273C44.8324 23.1366 44.3025 22.9171 43.75 22.9171ZM2.08333 27.0838H25V33.3338H33.3333V16.6671H25V22.9171H2.08333C1.5308 22.9171 1.00089 23.1366 0.610193 23.5273C0.219492 23.918 0 24.4479 0 25.0004C0 25.553 0.219492 26.0829 0.610193 26.4736C1.00089 26.8643 1.5308 27.0838 2.08333 27.0838Z"
                        fill="#49ab81"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="font-bold text-black text-xl sm:text-2xl lg:text-xl xl:text-2xl mb-5">
                    Tailored to Your Needs
                  </h3>
                  <p className="text-gray-700 text-base leading-relaxed">
                    Adapt Bookies to your reading style. Customize categories,
                    preferences, and more with just a few clicks.
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 px-4">
                <div
                  className="mb-[70px] text-center 2xl:px-5 wow fadeInUp"
                  data-wow-delay=".15s"
                  style={{ visibility: "visible", animationDelay: "0.15s" }}
                >
                  <div className="mb-9 flex justify-center">
                    <svg
                      width="40"
                      height="50"
                      viewBox="0 0 40 50"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.5"
                        d="M39.8228 2.21287C39.8228 0.88544 38.9379 0.000488281 37.6104 0.000488281H2.87607L28.7609 14.1597V37.6109H37.6104C38.9379 37.6109 39.8228 36.726 39.8228 35.3986V2.21287Z"
                        fill="#49ab81"
                      ></path>
                      <path
                        d="M24.3362 16.8148L0 3.54053V35.3988C0 36.2837 0.442476 36.9475 1.10619 37.3899L24.3362 50.0005V16.8148Z"
                        fill="#49ab81"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="font-bold text-black text-xl sm:text-2xl lg:text-xl xl:text-2xl mb-5">
                    High-quality Design
                  </h3>
                  <p className="text-gray-700 text-base leading-relaxed">
                    Enjoy a modern design and user-friendly interface that makes
                    organizing and tracking your books a delight.
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 px-4">
                <div
                  className="mb-[70px] text-center 2xl:px-5 wow fadeInUp"
                  data-wow-delay=".2s"
                  style={{ visibility: "visible", animationDelay: "0.2s" }}
                >
                  <div className="mb-9 flex justify-center">
                    <svg
                      width="46"
                      height="50"
                      viewBox="0 0 46 50"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.5"
                        d="M35.7142 42.8576C32.4285 42.8576 29.7618 40.191 29.7618 36.9053C29.7618 36.0793 29.923 35.2891 30.2299 34.5658C30.3139 34.3676 30.2782 34.136 30.1261 33.9838L28.2169 32.0746C27.9938 31.8515 27.6217 31.8881 27.4637 32.1613C26.6592 33.5524 26.1904 35.1726 26.1904 36.9053C26.1904 42.1672 30.4523 46.4291 35.7142 46.4291V48.7934C35.7142 49.2388 36.2528 49.4619 36.5678 49.1469L40.7178 44.9969C40.9131 44.8016 40.9131 44.4851 40.7178 44.2898L36.5678 40.1398C36.2528 39.8248 35.7142 40.0479 35.7142 40.4933V42.8576ZM35.7142 27.3815V25.0172C35.7142 24.5717 35.1756 24.3486 34.8607 24.6636L30.7106 28.8136C30.5154 29.0089 30.5154 29.3255 30.7106 29.5207L34.8607 33.6708C35.1756 33.9857 35.7142 33.7627 35.7142 33.3172V30.9529C38.9999 30.9529 41.6666 33.6196 41.6666 36.9053C41.6666 37.7313 41.5054 38.5215 41.1985 39.2448C41.1145 39.4429 41.1502 39.6746 41.3024 39.8268L43.2115 41.7359C43.4346 41.959 43.8067 41.9224 43.9647 41.6493C44.7692 40.2581 45.238 38.638 45.238 36.9053C45.238 31.6434 40.9761 27.3815 35.7142 27.3815Z"
                        fill="#49ab81"
                      ></path>
                      <path
                        d="M21.4285 36.9052C21.4285 40.2265 22.4724 43.2906 24.2586 45.8081C24.7693 46.5279 24.2883 47.6194 23.4058 47.6194H4.76189C2.11904 47.6194 0 45.5004 0 42.8575V4.76238C0 2.14334 2.11904 0.000488281 4.76189 0.000488281H7.14284H19.0476H33.3333C35.9523 0.000488281 38.0951 2.11953 38.0951 4.76238V20.306C38.0951 20.9267 37.5253 21.429 36.9047 21.429C28.3571 21.429 21.4285 28.3576 21.4285 36.9052Z"
                        fill="#49ab81"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="font-bold text-black text-xl sm:text-2xl lg:text-xl xl:text-2xl mb-5">
                    Always Evolving
                  </h3>
                  <p className="text-gray-700 text-base leading-relaxed">
                    Bookies is constantly improving with regular updates based
                    on the feedback and needs of our reading community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        id="testimonial"
        className="pt-[120px] pb-20 bg-gradient-to-t from-green1 to-white"
      >
        <div className="container">
          <div className="flex flex-wrap mx-[-16px]">
            <div className="w-full px-4">
              <div
                className="mx-auto max-w-[655px] text-center mb-20 wow fadeInUp"
                data-wow-delay=".1s"
                style={{ visibility: "visible", animationDelay: "0.1s" }}
              >
                <h2 className="text-black font-bold text-3xl sm:text-4xl md:text-[45px] mb-5 mt-3">
                  What our users say
                </h2>
                <p className="text-gray-800 text-base md:text-lg leading-relaxed md:leading-relaxed max-w-[570px] mx-auto">
                  Hear from readers who use Bookies to organize their libraries,
                  track their progress, and rediscover their love for books.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center mx-[-16px]">
            <div className="w-full lg:w-1/2 px-4">
              <div
                className="bg-white relative z-10 overflow-hidden rounded-sm p-8 lg:px-6 xl:px-8 mb-10 wow fadeInUp"
                data-wow-delay=".1s"
                style={{ visibility: "visible", animationDelay: "0.1s" }}
              >
                <div className="sm:flex justify-between lg:block xl:flex">
                  <div className="w-full flex items-center">
                    <div className="rounded-lg overflow-hidden w-[75px] h-[75px] mt-2 mr-4">
                      <img
                        src="https://randomuser.me/api/portraits/women/63.jpg"
                        alt="User1"
                        className="rounded-full"
                      />
                    </div>
                    <div className="w-full">
                      <h5 className="text-base md:text-lg lg:text-base xl:text-lg text-black font-medium mb-1">
                        Sarah White
                      </h5>
                    </div>
                  </div>
                  <div className="max-w-[150px] w-full flex items-center sm:justify-end lg:justify-start xl:justify-end mt-4 sm:mt-0 lg:mt-4 xl:mt-0">
                    <div>
                      <div className="flex items-center">
                        <span className="text-orange-300 mr-1 block">
                          <svg
                            width="18"
                            height="16"
                            viewBox="0 0 18 16"
                            className="fill-current"
                          >
                            <path d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z"></path>
                          </svg>
                        </span>
                        <span className="text-orange-300 mr-1 block">
                          <svg
                            width="18"
                            height="16"
                            viewBox="0 0 18 16"
                            className="fill-current"
                          >
                            <path d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z"></path>
                          </svg>
                        </span>
                        <span className="text-orange-300 mr-1 block">
                          <svg
                            width="18"
                            height="16"
                            viewBox="0 0 18 16"
                            className="fill-current"
                          >
                            <path d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z"></path>
                          </svg>
                        </span>
                        <span className="text-orange-300 mr-1 block">
                          <svg
                            width="18"
                            height="16"
                            viewBox="0 0 18 16"
                            className="fill-current"
                          >
                            <path d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z"></path>
                          </svg>
                        </span>
                        <span className="text-orange-300 mr-1 block">
                          <svg
                            width="18"
                            height="16"
                            viewBox="0 0 18 16"
                            className="fill-current"
                          >
                            <path d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z"></path>
                          </svg>
                        </span>
                      </div>
                      <p className="mt-2 text-sm font-medium text-gray-600">
                        Users's Review
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-lg font-medium text-gray-500 leading-relaxed pt-8 mt-6 border-t border-[#eee]">
                  "Bookies has completely changed how I manage my reading. It's
                  a game-changer for book lovers!"
                </p>
                <div className="absolute right-0 bottom-0 z-[-1]">
                  <svg
                    width="49"
                    height="60"
                    viewBox="0 0 49 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      opacity="0.4"
                      cx="37"
                      cy="37"
                      r="36"
                      transform="rotate(-165 37 37)"
                      fill="url(#paint0_linear_77:14)"
                    ></circle>
                    <defs>
                      <linearGradient
                        id="paint0_linear_77:14"
                        x1="36.3685"
                        y1="91.4954"
                        x2="36.3685"
                        y2="5.62385"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#49ab81"></stop>
                        <stop
                          offset="1"
                          stopColor="#49ab81"
                          stopOpacity="0"
                        ></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4">
              <div
                className="bg-white relative z-10 overflow-hidden rounded-sm p-8 lg:px-6 xl:px-8 mb-10 wow fadeInUp"
                data-wow-delay=".15s"
                style={{ visibility: "visible", animationDelay: "0.15s" }}
              >
                <div className="sm:flex justify-between lg:block xl:flex">
                  <div className="w-full flex items-center">
                    <div className="rounded-lg overflow-hidden w-[75px] h-[75px] mt-2 mr-4">
                      <img
                        src="https://randomuser.me/api/portraits/men/33.jpg"
                        alt="User2"
                        className="rounded-full"
                      />
                    </div>
                    <div className="w-full">
                      <h5 className="text-base md:text-lg lg:text-base xl:text-lg text-black font-medium mb-1">
                        Devid Miller
                      </h5>
                    </div>
                  </div>
                  <div className="max-w-[150px] w-full flex items-center sm:justify-end lg:justify-start xl:justify-end mt-4 sm:mt-0 lg:mt-4 xl:mt-0">
                    <div>
                      <div className="flex items-center">
                        <span className="text-orange-300 mr-1 block">
                          <svg
                            width="18"
                            height="16"
                            viewBox="0 0 18 16"
                            className="fill-current"
                          >
                            <path d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z"></path>
                          </svg>
                        </span>
                        <span className="text-orange-300 mr-1 block">
                          <svg
                            width="18"
                            height="16"
                            viewBox="0 0 18 16"
                            className="fill-current"
                          >
                            <path d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z"></path>
                          </svg>
                        </span>
                        <span className="text-orange-300 mr-1 block">
                          <svg
                            width="18"
                            height="16"
                            viewBox="0 0 18 16"
                            className="fill-current"
                          >
                            <path d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z"></path>
                          </svg>
                        </span>
                        <span className="text-orange-300 mr-1 block">
                          <svg
                            width="18"
                            height="16"
                            viewBox="0 0 18 16"
                            className="fill-current"
                          >
                            <path d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z"></path>
                          </svg>
                        </span>
                        <span className="text-orange-300 mr-1 block">
                          <svg
                            width="18"
                            height="16"
                            viewBox="0 0 18 16"
                            className="fill-current"
                          >
                            <path d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z"></path>
                          </svg>
                        </span>
                      </div>
                      <p className="mt-2 text-sm font-medium text-gray-600">
                        Users's Review
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-lg font-medium text-gray-500 leading-relaxed pt-8 mt-6 border-t border-[#eee]">
                  "The ability to track my progress and make notes is
                  invaluable. Highly recommended!"
                </p>
                <div className="absolute right-0 bottom-0 z-[-1]">
                  <svg
                    width="49"
                    height="60"
                    viewBox="0 0 49 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      opacity="0.4"
                      cx="37"
                      cy="37"
                      r="36"
                      transform="rotate(-165 37 37)"
                      fill="url(#paint0_linear_77:14)"
                    ></circle>
                    <defs>
                      <linearGradient
                        id="paint0_linear_77:14"
                        x1="36.3685"
                        y1="91.4954"
                        x2="36.3685"
                        y2="5.62385"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#49ab81"></stop>
                        <stop
                          offset="1"
                          stopColor="#49ab81"
                          stopOpacity="0"
                        ></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4">
              <div
                className="bg-white relative z-10 overflow-hidden rounded-sm p-8 lg:px-6 xl:px-8 mb-10 wow fadeInUp"
                data-wow-delay=".2s"
                style={{ visibility: "visible", animationDelay: "0.2s" }}
              >
                <div className="sm:flex justify-between lg:block xl:flex">
                  <div className="w-full flex items-center">
                    <div className="rounded-lg overflow-hidden w-[75px] h-[75px] mt-2 mr-4">
                      <img
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        alt="User3"
                        className="rounded-full"
                      />
                    </div>
                    <div className="w-full">
                      <h5 className="text-base md:text-lg lg:text-base xl:text-lg text-black font-medium mb-1">
                        Jonathon Smith
                      </h5>
                    </div>
                  </div>
                  <div className="max-w-[150px] w-full flex items-center sm:justify-end lg:justify-start xl:justify-end mt-4 sm:mt-0 lg:mt-4 xl:mt-0">
                    <div>
                      <div className="flex items-center">
                        <span className="text-orange-300 mr-1 block">
                          <svg
                            width="18"
                            height="16"
                            viewBox="0 0 18 16"
                            className="fill-current"
                          >
                            <path d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z"></path>
                          </svg>
                        </span>
                        <span className="text-orange-300 mr-1 block">
                          <svg
                            width="18"
                            height="16"
                            viewBox="0 0 18 16"
                            className="fill-current"
                          >
                            <path d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z"></path>
                          </svg>
                        </span>
                        <span className="text-orange-300 mr-1 block">
                          <svg
                            width="18"
                            height="16"
                            viewBox="0 0 18 16"
                            className="fill-current"
                          >
                            <path d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z"></path>
                          </svg>
                        </span>
                        <span className="text-orange-300 mr-1 block">
                          <svg
                            width="18"
                            height="16"
                            viewBox="0 0 18 16"
                            className="fill-current"
                          >
                            <path d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z"></path>
                          </svg>
                        </span>
                        <span className="text-orange-300 mr-1 block">
                          <svg
                            width="18"
                            height="16"
                            viewBox="0 0 18 16"
                            className="fill-current"
                          >
                            <path d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z"></path>
                          </svg>
                        </span>
                      </div>
                      <p className="mt-2 text-sm font-medium text-gray-600">
                        Users's Review
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-lg font-medium text-gray-500 leading-relaxed pt-8 mt-6 border-t border-[#eee]">
                  "Finally, a tool that helps me organize my library and
                  encourages me to read more! I love it!"
                </p>
                <div className="absolute right-0 bottom-0 z-[-1]">
                  <svg
                    width="49"
                    height="60"
                    viewBox="0 0 49 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      opacity="0.4"
                      cx="37"
                      cy="37"
                      r="36"
                      transform="rotate(-165 37 37)"
                      fill="url(#paint0_linear_77:14)"
                    ></circle>
                    <defs>
                      <linearGradient
                        id="paint0_linear_77:14"
                        x1="36.3685"
                        y1="91.4954"
                        x2="36.3685"
                        y2="5.62385"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#49ab81"></stop>
                        <stop
                          offset="1"
                          stopColor="#49ab81"
                          stopOpacity="0"
                        ></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4">
              <div
                className="bg-white relative z-10 overflow-hidden rounded-sm p-8 lg:px-6 xl:px-8 mb-10 wow fadeInUp"
                data-wow-delay=".25s"
                style={{ visibility: "visible", animationDelay: "0.25s" }}
              >
                <div className="sm:flex justify-between lg:block xl:flex">
                  <div className="w-full flex items-center">
                    <div className="rounded-lg overflow-hidden w-[75px] h-[75px] mt-2 mr-4">
                      <img
                        src="https://randomuser.me/api/portraits/women/85.jpg"
                        alt="User4"
                        className="rounded-full"
                      />
                    </div>
                    <div className="w-full">
                      <h5 className="text-base md:text-lg lg:text-base xl:text-lg text-black font-medium mb-1">
                        Maria Lumbert
                      </h5>
                    </div>
                  </div>
                  <div className="max-w-[150px] w-full flex items-center sm:justify-end lg:justify-start xl:justify-end mt-4 sm:mt-0 lg:mt-4 xl:mt-0">
                    <div>
                      <div className="flex items-center">
                        <span className="text-orange-300 mr-1 block">
                          <svg
                            width="18"
                            height="16"
                            viewBox="0 0 18 16"
                            className="fill-current"
                          >
                            <path d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z"></path>
                          </svg>
                        </span>
                        <span className="text-orange-300 mr-1 block">
                          <svg
                            width="18"
                            height="16"
                            viewBox="0 0 18 16"
                            className="fill-current"
                          >
                            <path d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z"></path>
                          </svg>
                        </span>
                        <span className="text-orange-300 mr-1 block">
                          <svg
                            width="18"
                            height="16"
                            viewBox="0 0 18 16"
                            className="fill-current"
                          >
                            <path d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z"></path>
                          </svg>
                        </span>
                        <span className="text-orange-300 mr-1 block">
                          <svg
                            width="18"
                            height="16"
                            viewBox="0 0 18 16"
                            className="fill-current"
                          >
                            <path d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z"></path>
                          </svg>
                        </span>
                        <span className="text-orange-300 mr-1 block">
                          <svg
                            width="18"
                            height="16"
                            viewBox="0 0 18 16"
                            className="fill-current"
                          >
                            <path d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z"></path>
                          </svg>
                        </span>
                      </div>
                      <p className="mt-2 text-sm font-medium text-gray-600">
                        Users's Review
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-lg font-medium text-gray-500 leading-relaxed pt-8 mt-6 border-t border-[#eee]">
                  "Bookies not only helps me keep track of my library but also
                  inspires me to explore new genres I hadn't considered before."
                </p>
                <div className="absolute right-0 bottom-0 z-[-1]">
                  <svg
                    width="49"
                    height="60"
                    viewBox="0 0 49 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      opacity="0.4"
                      cx="37"
                      cy="37"
                      r="36"
                      transform="rotate(-165 37 37)"
                      fill="url(#paint0_linear_77:14)"
                    ></circle>
                    <defs>
                      <linearGradient
                        id="paint0_linear_77:14"
                        x1="36.3685"
                        y1="91.4954"
                        x2="36.3685"
                        y2="5.62385"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#49ab81"></stop>
                        <stop
                          offset="1"
                          stopColor="#49ab81"
                          stopOpacity="0"
                        ></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-green1 text-white text-center" id="cta">
        <div className="container mx-auto px-6">
          <h3 className="text-4xl font-bold mb-6 -mt-2">
            Ready to Start Your Journey?
          </h3>
          <p className="text-lg mb-6">
            Join thousands of readers who trust Bookies to manage their library
            and track their progress.
          </p>
          <button
            onClick={() => (window.location.href = "/signup")}
            className="bg-orange-300 text-gray-100 px-8 py-3 mb-2 rounded-lg font-bold hover:text-green1 hover:bg-gray-100 transition"
          >
            Sign Up Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-black py-6">
        <div className="container mx-auto px-6 text-center">
          <p>© 2025 Bookies. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
