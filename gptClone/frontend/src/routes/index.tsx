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
  return (
    <Suspense
      fallback={
        <div className="animate-spin h-[70vh] w-full max-w-7xl mx-auto flex items-center justify-center overflow-hidden text-stone-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-loader-2"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 3a9 9 0 1 0 9 9" />
          </svg>
        </div>
      }
    >
      {routes}
    </Suspense>
  );
}
