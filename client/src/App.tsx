import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import routes from "./routes";
import Breadcrumbs from "./components/Breadcrumbs";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Box } from "@chakra-ui/react";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Box>
        <Routes>
          <Route
            element={
              <>
                <Breadcrumbs />
                <Box
                  height="calc(100vh - 10rem)"
                  maxHeight="calc(100vh - 10rem)"
                  overflowY="scroll"
                  padding="0.5rem"
                >
                  <Outlet />
                </Box>
              </>
            }
          >
            {routes.map((r) => (
              <Route key={r.path} Component={r.Component} path={r.path} />
            ))}
          </Route>
        </Routes>
      </Box>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
