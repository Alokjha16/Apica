import React from "react";
import { Link } from "react-router-dom";
import { useClerk, useUser, SignInButton } from "@clerk/clerk-react";
import TrustedClinics from "./TrustedClinics";

const Hero = () => {
  const { signOut } = useClerk();
  const { isSignedIn } = useUser();

  const handleAuthClick = () => {
    if (isSignedIn) {
      signOut();
    }
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="min-h-[50vh] flex items-center">
        <div className="max-w-[80rem] mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-8 lg:gap-5">
          
          {/* Left Content */}
          <div className="text-center md:text-left flex-1">
            <h2 className="text-2xl md:text-6xl lg:text-5xl font-bold text-gray-800 leading-tight">
              Smarter Cross-Sells With{" "}
              <span className="text-blue-600">
                AI-Driven Personalization
              </span>
            </h2>

            <span className="block mt-4 text-lg text-gray-700">
              At APICA, we ensure customers receive the right financial solutions 
              at the right moment, turning transaction insights into intelligent opportunities.
            </span>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              
              {isSignedIn ? (
                <button
                  onClick={handleAuthClick}
                  className="px-6 py-3 md:px-8 md:py-4 bg-blue-600 text-white text-sm md:text-lg rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                  New Bank Login
                </button>
              ) : (
                <SignInButton mode="modal">
                  <button className="px-6 py-3 md:px-8 md:py-4 bg-blue-600 text-white text-sm md:text-lg rounded-lg shadow-md hover:bg-blue-700 transition">
                    New Bank Login
                  </button>
                </SignInButton>
              )}

              <Link
                to="/dashboard"
                className="px-6 py-3 md:px-8 md:py-4 border border-blue-600 text-blue-600 text-sm md:text-lg rounded-lg shadow-md hover:bg-blue-50 transition"
              >
                View Dashboard
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 flex justify-center">
            <img
              src="/hero.png"
              alt="Landing"
              className="max-w-xs md:max-w-md lg:max-w-2xl h-auto object-contain"
            />
          </div>
        </div>
      </section>

   <TrustedClinics />
    </>
  );
};

export default Hero;
