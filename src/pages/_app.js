import Navbar from "@/components/Navbar/Navbar";
import { useRouter } from "next/router";
import '@/styles/globals.css';



export default function App({ Component, pageProps }) {
  const router = useRouter();

  const navbarExcludedRoutes = ["/"];
  const isNavbarExcluded = navbarExcludedRoutes.includes(router.pathname);
  console.log("first",isNavbarExcluded)



  return (
    <>
      {/* Conditionally render Navbar */}
      {!isNavbarExcluded && <Navbar />}

      {/* Main Content */}
      <div
        className={`pt-0 md:pt-5 lg:pt-24 bg-Fourth min-h-screen`}
      >
        <Component {...pageProps} />
      </div>

      
    </>
  );

}
