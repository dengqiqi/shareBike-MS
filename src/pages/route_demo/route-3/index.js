import React from "react";
import {
  NavLink, Route, HashRouter
} from "react-router-dom";

export default function App() {
  return (
    <HashRouter>
    <Route>
    <NavLink to="/react" activeClassName="hurray">
      React
    </NavLink>
    </Route>
    </HashRouter>
  );
}
