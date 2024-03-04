import React from "react";
import ContextProvider from "../context";
import Layout from "../layout";
import Home from "pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime:1000 * 60,
    }
  }
})
function App() {
  return (
    <QueryClientProvider client={queryClient}>

      <ContextProvider>
        <Layout>
          <Home />
        </Layout>
      </ContextProvider>
    </QueryClientProvider>

  );
}

export default App;
