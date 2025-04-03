import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Adventure Park',
  description: 'Experience thrilling rides, delicious food, and unforgettable moments',
  icons: {
    icon: [
      {
        url: 'https://res.cloudinary.com/db1nsxnit/image/upload/c_fit,h_32,w_32,f_png/v1737296762/samples/balloons.jpg',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: 'https://res.cloudinary.com/db1nsxnit/image/upload/c_fit,h_16,w_16,f_png/v1737296762/samples/balloons.jpg',
        sizes: '16x16',
        type: 'image/png',
      }
    ],
    shortcut: [
      {
        url: 'https://res.cloudinary.com/db1nsxnit/image/upload/v1737296762/samples/balloons.jpg',
        type: 'image/jpeg',
      }
    ],
    apple: [
      {
        url: 'https://res.cloudinary.com/db1nsxnit/image/upload/c_fit,h_180,w_180,f_png/v1737296762/samples/balloons.jpg',
        sizes: '180x180',
        type: 'image/png',
      }
    ]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
