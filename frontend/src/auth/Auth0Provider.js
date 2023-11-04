import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Auth0ProviderWithNavigate = ({ children }) => {
  const navigate = useNavigate();

  const redirectUri = "http://localhost:3000";

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };
  
  return (
    <Auth0Provider
        domain="dev-0kmsgfhl1w77b68f.us.auth0.com"
        clientId="eXMdpGn5oGqyklEwFT5rc7TgR73FTffd"
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
