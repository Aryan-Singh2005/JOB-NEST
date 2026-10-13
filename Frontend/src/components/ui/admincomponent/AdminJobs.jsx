import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../input";
import { Button } from "../button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchJobByText } from "@/redux/jobSlice";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";

const AdminJobs = () => {
    useGetAllAdminJobs();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setSearchJobByText(input));
    },[input]);
    return (
        <div>
            <Navbar/>
            <div className="max-w-6xl mx-auto my-10">
                <div className="flex items-center justify-between my-5">
            <Input className = "w-fit bg-white text-gray-900 border-gray-400 placeholder:text-gray-600 focus-visible:ring-[#6B3AC2]" placeholder="Filter by Name & Role" onChange={(e) => setInput(e.target.value)}></Input>
                <Button onClick={() => navigate("/admin/jobs/create")} className="bg-[#6B3AC2] text-white hover:bg-[#552d9b]">Post New Job</Button>
                </div>
                <div>
                    <AdminJobsTable />
                </div>
            </div>
        </div>
    );
};

export default AdminJobs;
