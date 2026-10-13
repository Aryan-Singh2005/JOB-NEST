import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../label";
import { Input } from "../input";
import { useNavigate } from "react-router-dom";
import { Button } from "../button";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const CompanyCreate = () => {
    const [companyName, setCompanyName] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_ENDPOINT}/register`,{companyName},{
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            console.log("Backend Response:",res.data);
            if (res?.data?.success){
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
            toast.error(errorMessage);
        }
    };
    return (
        <div>
            <Navbar/>
            <div className="max-w-4xl mx-auto">
                <div className="my-10">
                <h1 className="font-bold text-2xl">Company Name</h1>
                <p className="text-gray-600">Company Description</p>
                </div>
                <Label>Company Name</Label>
                <Input type="text" placeholder="Company Name" className="my-2" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                <div className="flex items-center gap-2 my-10">
                    <Button variant="outline" onClick={()=>navigate("/admin/companies")} 
                    className="rounded-lg-border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 font-medium">Cancel</Button>
                    <Button onClick={registerNewCompany} className="rounded-lg bg-[#4F46E5] text-white hover:bg-[#4338CA] font-medium shadow-sm">Continue</Button>
                </div>
            </div>
        </div>
    );
};

export default CompanyCreate;
