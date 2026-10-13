import React, { use, useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Button } from "../button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../label";
import { Input } from "../input";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const CompanySetup = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { singleCompany } = useSelector((store) => store.company);
    const [input,setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null,
    });
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    const changeEventHandler = (event) => {
        setInput({...input, [event.target.name]: event.target.value});
    };
    const changeFileHandler = (event) => {
        const file = event.target.files?.[0];
        setInput({...input, file});
    };
    const submitHandler = async (event) => {
        event.preventDefault();
        console.log(input);
        const formData = new FormData();
        formData.append("name",input.name);
        formData.append("description",input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file){
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(
                `${COMPANY_API_ENDPOINT}/update/${params.id}`, formData,
                {headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            }
            );
            if (res.data.success) {
                toast.success(res.data.message);
                dispatch(setSingleCompany(res.data.company));
                navigate('/admin/companies');
            }
        } catch (error) {
            console.error(error);
            navigate("/admin/companies");
        } finally {
            setLoading(false);
        }
    };

    
    useEffect(() => {
    const fetchCompanyData = async () => {
        try {
            const res = await axios.get(`${COMPANY_API_ENDPOINT}/get/${params.id}`, {
                withCredentials: true,
            });
            if (res.data.success) {
                setInput({
                    name: res.data.company.name || "",
                    description: res.data.company.description || "",
                    website: res.data.company.website || "",
                    location: res.data.company.location || "",
                    file: null,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    fetchCompanyData();
}, [params.id]);

    return (
        <div>
            <Navbar/>
            <div className="max-w-xl mx-auto my-10">
                <form onSubmit={submitHandler}>
                    <div className="flex items-center gap-5 p-8">
                    <Button onClick={() => navigate("/admin/companies")} className="flex items-center gap-2 text-gray-600 font-semibold" variant="outline">
                    <ArrowLeft/>
                    <span>Back</span>
                    </Button>
                    <h1 className="text-xl font-bold text-blue-600">Company Setup</h1>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                    <div>
                    <Label>Company Name</Label>
                    <Input type="text" name="name" value={input.name} onChange={changeEventHandler}></Input>
                    </div>
                    <div>
                    <Label>Company Description</Label>
                    <Input type="text" name="description" value={input.description} onChange={changeEventHandler}></Input>
                    </div>
                    <div>
                    <Label>Company Website</Label>
                    <Input type="text" name="website" value={input.website} onChange={changeEventHandler}></Input>
                    </div>
                    <div>
                    <Label>Company Location</Label>
                    <Input type="text" name="location" value={input.location} onChange={changeEventHandler}></Input>
                    </div>
                    <div>
                    <Label>Company Logo</Label>
                    <Input type="file" name="file" accept="image/*" onChange={ changeFileHandler } />
                    </div>
                    </div>
                    {loading ? (
                        <Button className="w-full my-4">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait
                        </Button>
                    ):(
                        <Button type="submit" className="w-full mt-8 bg-[#4F46E5] text-white hover:bg-[#4338CA]">Update</Button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default CompanySetup;
