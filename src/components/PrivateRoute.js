// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from "react";
import { AUTHENTICATE, PROFILEID } from "../graphql/queries";
import { Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Loading from "./Loading";

const PrivateRoute = ({ children, page }) => {
  // Add your own authentication on the below line.
  const { data, loading: authLoading } = useQuery(AUTHENTICATE);
  const { data: profileData, loading: profileLoading } = useQuery(PROFILEID, {
    variables: {
      userID: data?.me._id,
    },
  });
  if (data === undefined) {
    localStorage.setItem("page", page);
  } else {
    localStorage.removeItem("page");
    localStorage.setItem("profileID", profileData?.getProfile._id);
  }

  if (authLoading || profileLoading) {
    return (
      <Loading message="Verifying that you are logged in ..."/>
    );
  }
  return data ? children : <Navigate to="/unauthenticated" />;
};

export default PrivateRoute;
