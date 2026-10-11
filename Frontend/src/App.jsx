import React from "react"
import Login from "./components/ui/authentication/Login";
import Register from "./components/ui/authentication/Register";
import { RouterProvider , createBrowserRouter } from "react-router-dom";
import Home from "./components/ui/components_lite/Home";
import PrivacyPolicy from "./components/ui/components_lite/PrivacyPolicy";
import TermsofService from "./components/ui/components_lite/TermsofService";
import Jobs from "./components/ui/components_lite/Jobs";
import Browse from "./components/ui/components_lite/Browse";
import Profile from "./components/ui/components_lite/Profile";
import Description from "./components/ui/components_lite/Description";
import Companies from "./components/ui/admincomponent/Companies";
import CompanyCreate from "./components/ui/admincomponent/CompanyCreate";
import CompanySetup from "./components/ui/admincomponent/CompanySetup";

const appRouter = createBrowserRouter([
  { path: "/", element: <Home/>},
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/description/:id",
    element: <Description />,
  },
  {
    path: "/Profile",
    element: <Profile/>
  },
  {
    path: "/PrivacyPolicy",
    element: <PrivacyPolicy/>,
  },
  {
    path: "/TermsofService",
    element: <TermsofService/>,
  },
  {
    path: "/Jobs",
    element: <Jobs/>,
  },
  {
    path: "/Home",
    element: <Home/>,
  },
  {
    path: "/Browse",
    element: <Browse/>,
  },

  // admin
  {
    path: "/admin/companies",
    element: <Companies/>,
  },
  {
    path: "/admin/companies/create",
    element: <CompanyCreate/>,
  },
  {
    path: "/admin/companies/:id",
    element: <CompanySetup/>,
  }
]);

function App() {
  return (
    <div>
      <RouterProvider router= {appRouter}></RouterProvider>
    </div>
  )
}
export default App;
