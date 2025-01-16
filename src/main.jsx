import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/login",
    element: <div>Login Page</div>
  },
  {
    path: "/register",
    element: <div>register Page</div>
  },
  {
    path: "/users",
    element: <div>user Page</div>
  },
  {
    path: "/products",
    element: <div>products Page</div>
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
