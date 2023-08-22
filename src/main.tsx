import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {ReactKeycloakProvider} from "@react-keycloak/web";
import {keycloakConfig, keycloakInitialState} from "./services/keycloak-client.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <ReactKeycloakProvider authClient={keycloakConfig} initOptions={keycloakInitialState}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </ReactKeycloakProvider>
);