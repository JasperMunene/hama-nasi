import { Afacad } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";


const afacad = Afacad({
  subsets: ["latin"],
  weight: ['600']
});

export const metadata = {
  title: "Hama Nasi",
  description: "A movers app",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${afacad.className} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
