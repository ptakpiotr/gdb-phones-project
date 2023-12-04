import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./routes";
import Header from "./components/Header";
import { Box } from "@chakra-ui/react";
import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import AppOutlet from "./AppOutlet";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import type { AppRouter } from "../../server/routers/appRouter";
import { useState } from "react";

export const trpc = createTRPCReact<AppRouter>();

function App() {
  const [client] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:5000/trpc",
        }),
      ],
    })
  );

  const [queryClient] = useState(() => new QueryClient());

  return (
    <trpc.Provider client={client} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header />
          <Box>
            <Routes>
              <Route element={<AppOutlet />}>
                {routes.map((r) => (
                  <Route key={r.path} Component={r.Component} path={r.path} />
                ))}
              </Route>
            </Routes>
          </Box>
        </BrowserRouter>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
