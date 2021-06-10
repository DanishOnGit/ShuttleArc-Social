import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { colors, fonts } from "./database";
import * as serviceWorker from "./serviceWorker";
const theme = extendTheme({ colors, fonts });

console.log(store.getState());

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ChakraProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
