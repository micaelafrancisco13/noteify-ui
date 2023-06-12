import { ReactNode, useRef, useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme.ts";
import SignedInLayout from "./components/Main/SignedInLayout.tsx";
import NoteForm from "./components/NoteForm/NoteForm.tsx";
import Notes from "./components/Main/Notes.tsx";
import Account from "./components/Account/Account.tsx";
import Homepage from "./components/Main/Homepage.tsx";
import NotFound from "./components/NotFound.tsx";
import SignInForm from "./components/AuthForm/SignInForm.tsx";
import SignOut from "./components/AuthForm/SignOut.tsx";
import PrivateRoutes from "./components/routing/PrivateRoutes.tsx";

function App() {
  const [drawerToggle, setDrawerToggle] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  function withLayout(childNode: ReactNode) {
    return (
      <SignedInLayout
        drawerToggle={drawerToggle}
        drawerRef={drawerRef}
        onDrawerToggle={(toggle) => setDrawerToggle(toggle)}
      >
        {childNode}
      </SignedInLayout>
    );
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Homepage
          drawerToggle={drawerToggle}
          drawerRef={drawerRef}
          onDrawerToggle={(toggle) => setDrawerToggle(toggle)}
        />
      ),
    },
    {
      path: "/auth/sign-in",
      element: <SignInForm />,
    },
    {
      path: "/auth/sign-out",
      element: <SignOut />,
    },

    {
      path: "/not-found",
      element: <NotFound />,
    },
    {
      path: "*",
      element: <Navigate to={`/not-found`} replace />,
    },
    {
      element: <PrivateRoutes />,
      children: [
        {
          path: "/account",
          element: withLayout(<Account drawerToggle={drawerToggle} />),
        },
        {
          path: "/notes",
          element: withLayout(<Notes drawerToggle={drawerToggle} />),
        },
        {
          path: "/notes/:id",
          element: withLayout(<NoteForm drawerToggle={drawerToggle} />),
        },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
