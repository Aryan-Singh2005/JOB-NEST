import React from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../input";
import { Button } from "../button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";

const Companies = () => {
    const navigate = useNavigate();
    useGetAllCompanies();
    return (
        <div>
            <Navbar/>
            <div className="max-w-6xl mx-auto my-10">
                <div className="flex items-center justify-between my-5">
            <Input className = "w-fit bg-white text-gray-900 border-gray-300 placeholder:text-gray-400 focus-visible:ring-[#6B3AC2]" placeholder="Filter by Name"></Input>
                <Button onClick={() => navigate("/admin/companies/create")} className="bg-[#6B3AC2] text-white hover:bg-[#552d9b]">Add Company</Button>
                </div>
                <div>
                    <CompaniesTable/>
                </div>
            </div>
        </div>
    );
};

export default Companies;
