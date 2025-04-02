// import { useLocation } from "react-router-dom";
// import { useEffect } from "react";

// const NotFound = () => {
//   const location = useLocation();

//   useEffect(() => {
//     console.error(
//       "404 Error: User attempted to access non-existent route:",
//       location.pathname
//     );
//   }, [location.pathname]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="text-center">
//         <h1 className="text-4xl font-bold mb-4">404</h1>
//         <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
//         <a href="/" className="text-blue-500 hover:text-blue-700 underline">
//           Return to Home
//         </a>
//       </div>
//     </div>
//   );
// };

// export default NotFound;


import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center max-w-lg mx-auto">
          <h1 className="text-8xl font-bold text-slate-900 mb-6">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-slate-600 mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;