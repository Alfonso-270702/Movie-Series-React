import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./config/graphql";
import { Home } from "./pages";

function App() {
  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
}

export default App;
