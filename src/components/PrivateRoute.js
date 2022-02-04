// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from "react";
import { AUTHENTICATE } from "../graphql/queries";
import { Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client";

const PrivateRoute = ({ children }) => {
  // Add your own authentication on the below line.
  const { data } = useQuery(AUTHENTICATE);

  return data ? children : <Navigate to="/unauthenticated" />;
};

export default PrivateRoute;
