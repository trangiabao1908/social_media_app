/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/HomePage/Home";
import Login from "../pages/LoginPage/Login";
import Profile from "../pages/ProfilePage/Profile";
import Register from "../pages/RegisterPage/Register";
import AuthLayout from "./AuthLayout";
import ErrorLayout from "./ErrorLayout";
import ProtectedLayout from "./ProtectedLayout";
// import { Box, CircularProgress } from "@mui/material";

// const Loadable =
//   (Component: React.ComponentType<any>) => (props: JSX.IntrinsicAttributes) =>
//     (
//       <Suspense
//         fallback={
//           <>
//             <Box sx={{ height: "95vh" }}>
//               <Box
//                 display="flex"
//                 alignItems="center"
//                 justifyContent="center"
//                 sx={{ height: "100%" }}
//               >
//                 <CircularProgress color="primary" />
//               </Box>
//             </Box>
//           </>
//         }
//       >
//         <Component {...props} />
//       </Suspense>
//     );
// const LoginPage = Loadable(lazy(() => import("../pages/LoginPage/Login")));
// const RegisterPage = Loadable(
//   lazy(() => import("../pages/RegisterPage/Register"))
// );
// const HomePage = Loadable(lazy(() => import("../pages/HomePage/Home")));
// const ProfilePage = Loadable(
//   lazy(() => import("../pages/ProfilePage/Profile"))
// );
// const ProtectedLayout = Loadable(lazy(() => import("./ProtectedLayout")));
const router = createBrowserRouter([
  {
    errorElement: <ErrorLayout />,
    element: <AuthLayout />,
    children: [
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <Register />,
        path: "/register",
      },
      {
        element: <ProtectedLayout />,
        children: [
          {
            element: <Home />,
            path: "/",
          },
          {
            element: <Profile />,
            path: "/profile/:userId",
          },
        ],
      },
    ],
  },
]);

export default router;
