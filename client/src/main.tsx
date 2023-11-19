import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    main: {
      100: "#0077b6",
      200: "#00b4d8",
    },
    text: {
      100: "whitesmoke",
    },
  },
  components: {
    MenuList: {
      baseStyle: {
        backgroundColor: "red !important",
      },
    },
  },
  styles: {
    global: {
      body: {
        overflow: "hidden",
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
