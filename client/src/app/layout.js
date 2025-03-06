import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";


const outfit = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Hama Nasi",
  description: "A movers app",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
