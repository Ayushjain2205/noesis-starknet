import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { client } from "@/utils/client";
import { ThirdwebProvider } from "thirdweb/react";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider>
      <Component {...pageProps} />
      <Toaster />
    </ThirdwebProvider>
  );
}
