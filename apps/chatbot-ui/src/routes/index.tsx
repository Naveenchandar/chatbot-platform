import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../pages/login";
import { requireAuth, requireNoAuth } from "./helper";
import { ChatPage } from "../pages/chat";

export const routers = createBrowserRouter([
    {
        path: "/",
        Component: LoginPage,
        loader: requireNoAuth,
        errorElement: <div>Error loading page</div>,
    },
    {
        path: "/chat",
        Component: ChatPage,
        loader: requireAuth,
        errorElement: <div>Error loading chat page</div>,
    }
]);