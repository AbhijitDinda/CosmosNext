import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";

import Navbar from "@/components/Navbar/Navbar";
import "@/styles/globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/utils/ProtectedRoute/ProtectedRoutes";

export default function App({ Component, pageProps }) {
  const queryClient = useMemo(() => new QueryClient(), []);

  const [isClient, setIsClient] = useState(false); // Ensure client-side rendering
  useEffect(() => setIsClient(true), []);

  const router = isClient ? useRouter() : null;

  // Define route types
  const publicRoutes = ["/login", "/"];
  const isPublicRoute = router ? publicRoutes.includes(router.pathname) : false;

  const navbarExcludedRoutes = publicRoutes; // Same as publicRoutes for now
  const isNavbarExcluded = router ? navbarExcludedRoutes.includes(router.pathname) : false;

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        {/* Conditionally render Navbar */}
        {!isNavbarExcluded && isClient && <Navbar />}

        {/* Main Content */}
        <div className={`pt-0 md:pt-5 lg:pt-24 bg-Fourth min-h-screen`}>
          {isClient && isPublicRoute ? (
            <Component {...pageProps} />
          ) : (
            isClient && (
              <ProtectedRoute>
                <Component {...pageProps} />
              </ProtectedRoute>
            )
          )}
        </div>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
