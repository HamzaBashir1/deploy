import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from './context/AuthContext.js'
import { ToastContainer } from "./Nexttoast";
import { FormProvider } from './FormContext';
import 'react-toastify/dist/ReactToastify.css';
import ClientSpeedInsights from "./ClientSpeedInsights";
import { Analytics } from "@vercel/analytics/react"
import SupportFloatingButton from "./Shared/SupportFloatingButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Putko",
  description: "Hotel and Apartment Booking Website",
};

export default function RootLayout({ children, pageProps }) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
        <ClientSpeedInsights/>
        <Analytics />
        <AuthContextProvider>
        <FormProvider {...pageProps}>
          {/* <Header/> */}
            {children }
            <ToastContainer
              theme="dark"
              position="top-right"
              autoClose={5000}
              closeOnClick
              pauseOnHover={false}
            />
            <SupportFloatingButton/>
            </FormProvider>
          {/* <Footer/> */}
        </AuthContextProvider>
      </body>
      
    </html>
  );
}
