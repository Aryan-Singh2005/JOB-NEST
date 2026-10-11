import React, { useEffect } from "react"
import Navbar from "./Navbar";
import Header from "./Header";
import Categories from "./Categories";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { loading , error} = useGetAllJobs();
    const jobs = useSelector((state) => state.jobs?.allJobs);

    console.log("Jobs in Component:",{ loading, error, jobs});
    const {user} = useSelector((store) => store.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if(user?. role === "Recruiter"){
            navigate("/admin/companies");
        }
    },[user,navigate]);
    return (
        <div>
            <Navbar/>
            <Header/>
            <Categories/>
            <LatestJobs jobs={jobs} loading={loading} />
            <Footer/>
        </div>
    );
};
export default Home;
