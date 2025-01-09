import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import Navbar from "@/components/Navbar/Navbar";
import { useRouter } from "next/router";
import '@/styles/globals.css';
import { AuthContextProvider } from '@/context/AuthContext'

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const queryClient = new QueryClient();

  const navbarExcludedRoutes = ["/login", "/"];
  const isNavbarExcluded = navbarExcludedRoutes.includes(router.pathname);


  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>


          {/* Conditionally render Navbar */}
          {!isNavbarExcluded && <Navbar />}

          {/* Main Content */}
          <div className={`pt-0 md:pt-5 lg:pt-24 bg-Fourth min-h-screen`}>
            <Component {...pageProps} />
          </div>

        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );

}
