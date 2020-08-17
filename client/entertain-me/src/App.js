import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./config/graphql";
import NavbarTop from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, AddForm, Series } from "./pages";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <NavbarTop />
        <div>
          <Switch>
            <Route path="/add-form">
              <AddForm />
            </Route>
            <Route path="/series">
              <Series />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
