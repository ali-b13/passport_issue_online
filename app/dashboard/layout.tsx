import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function dashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
 <section >
    <Navbar/>
    {children}
    <Footer/>
 </section>
  );
}
