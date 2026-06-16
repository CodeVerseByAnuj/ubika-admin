"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
import { Toaster } from "react-hot-toast";

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <>{children}</>
        <Toaster />
      </QueryClientProvider>
    </>
  );
};

export default GlobalProvider;
