import { Suspense } from "react";
import { useRoutes } from "react-router";
import ProtectedRoutes from "./ProtectedRoutes";
import PATHS from "../constants/paths";
import * as Pages from "./lazyRoutes";

export function AppRoutes() {
  const routes = useRoutes([
    { path: PATHS.HOME, element: <Pages.Home /> },
    { path: PATHS.CHATBOX, element: <Pages.ChatBox /> },
  ]);
  return <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>;
}
