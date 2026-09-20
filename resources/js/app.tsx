import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";

const router = getRouter();

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

const container = document.getElementById("app");
if (!container) throw new Error("Application root is missing.");

createRoot(container).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
