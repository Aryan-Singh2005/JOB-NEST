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
import AdminJobs from "./components/ui/admincomponent/AdminJobs";
import PostJob from "./components/ui/admincomponent/PostJob";
import Applicants from "./components/ui/admincomponent/Applicants";
import EditJob from "./components/ui/admincomponent/EditJob";
import ProtectedRoute from "./components/ui/admincomponent/ProtectedRoute";
import SavedJobs from "./components/ui/admincomponent/SavedJobs";

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
    path: "/saved-jobs",
    element: <SavedJobs/>,
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
    element: <ProtectedRoute><Companies/></ProtectedRoute>,
  },
  {
    path: "/admin/companies/create",
    element: <ProtectedRoute><CompanyCreate/></ProtectedRoute>,
  },
  {
    path: "/admin/companies/:id",
    element: <ProtectedRoute><CompanySetup/></ProtectedRoute>,
  },
  {
    path: "/admin/jobs",
    element: <ProtectedRoute><AdminJobs/></ProtectedRoute>,
  },
  {
    path: "/admin/jobs/create",
    element: <ProtectedRoute><PostJob /></ProtectedRoute>,
  },
  {
    path: "/admin/jobs/:id",
    element: <ProtectedRoute><PostJob /></ProtectedRoute>,
  },
  {
    path: "/admin/jobs/edit/:id",
    element: <ProtectedRoute><EditJob /></ProtectedRoute>,
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: <ProtectedRoute><Applicants /></ProtectedRoute>,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router= {appRouter}></RouterProvider>
    </div>
  )
}
export default App;
