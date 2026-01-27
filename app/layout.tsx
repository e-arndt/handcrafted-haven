import Navbar from "./ui/Navbar";
import Footer from "./ui/Footer";
import "./global.css";
import { inter } from '@/app/ui/fonts';
import { playfair_display } from '@/app/ui/fonts';
import Header from "./ui/Header";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${inter.className}
          ${playfair_display.className}
        `}
      >
        <Header />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
