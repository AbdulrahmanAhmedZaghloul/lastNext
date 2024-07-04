'use client'
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import Navbar from "./_comonents/-navbar/page";
import UserContext from "@/context/UserContext";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import Footer from "./_comonents/_footer/Footer";



export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {




  return (
    <html lang="en">
      <div>
        <title>Route Social</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Abdulrahman Zaghloul" />
        <meta name="keywords" content="Route Social" />
        <meta name="author" content="Abdulrahman Zaghloul" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </div>
      <Provider store={store}>
        <body className="marginTop">
            <AppRouterCacheProvider>
                <UserContext>
                  <Navbar />
                  {children}
                  <Footer />
                </UserContext>
            </AppRouterCacheProvider>
        </body>
      </Provider>
    </html>
  );
}
