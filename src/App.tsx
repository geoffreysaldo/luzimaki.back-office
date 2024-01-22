import { NextUIProvider } from "@nextui-org/react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Orders from "./pages/orders";
import SignInPage from "./pages/sign-in";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { useApolloClient } from "./graphql/client";
import NewOrder from "./pages/new-order";

function App() {
  //const client = new ApolloClient({
  //  uri: process.env.REACT_APP_GRAPHQL_URL,
  //  cache: new InMemoryCache(),
  //});
  const client = useApolloClient();

  return (
    <NextUIProvider>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route path="/sign-in" element={<SignInPage />}></Route>
            <Route path="/orders" element={<Orders />}></Route>
            <Route path="/orders/new" element={<NewOrder />}></Route>
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </NextUIProvider>
  );
}

export default App;
