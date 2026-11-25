import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export function Layout() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-[60vh]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
