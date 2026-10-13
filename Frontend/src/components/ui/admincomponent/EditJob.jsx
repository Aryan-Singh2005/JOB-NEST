import React, { useState, useEffect } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../input";
import { Label } from "../label";
import { Button } from "../button";
import { JOB_API_ENDPOINT } from "@/utils/data";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Loader2, ArrowLeft } from "lucide-react";
import axios from "axios";

const EditJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        location: "",
        salary: "",
        position: "",
        requirements: "",
        experience: "",
        jobType: "",
    });
    
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const jobId = params.id;

    // Job ki purani details load karne ke liye
    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
                    withCredentials: true,
                });
                if (res.data.status) {
                    const job = res.data.job;
                    setInput({
                        title: job.title || "",
                        description: job.description || "",
                        location: job.location || "",
                        salary: job.salary || "",
                        position: job.position || "",
                        requirements: job.requirements || "",
                        experience: job.experience || "",
                        jobType: job.jobType || "",
                    });
                }
            } catch (error) {
                console.log(error);
                toast.error("Failed to load job details");
            }
        };
        fetchJobDetails();
    }, [jobId]);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    // Update submit handler
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.put(`${JOB_API_ENDPOINT}/update/${jobId}`, input, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            if (res.data.status) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded-xl shadow-md border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                    <Button onClick={() => navigate("/admin/jobs")} variant="outline" size="icon">
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <h1 className="text-2xl font-bold text-gray-800">Edit Job Listing</h1>
                </div>

                <form onSubmit={submitHandler} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Job Title</Label>
                            <Input type="text" name="title" value={input.title} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input type="text" name="jobType" value={input.jobType} onChange={changeEventHandler} />
                        </div>
                    </div>

                    <div>
                        <Label>Description</Label>
                        <Input type="text" name="description" value={input.description} onChange={changeEventHandler} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Location</Label>
                            <Input type="text" name="location" value={input.location} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Salary (LPA)</Label>
                            <Input type="number" name="salary" value={input.salary} onChange={changeEventHandler} />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <Label>Open Positions</Label>
                            <Input type="number" name="position" value={input.position} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Experience (Years)</Label>
                            <Input type="number" name="experience" value={input.experience} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input type="text" name="requirements" value={input.requirements} onChange={changeEventHandler} />
                        </div>
                    </div>

                    <div className="pt-4">
                        {loading ? (
                            <Button className="w-full bg-black text-white" disabled>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full bg-[#6B3AC2] hover:bg-[#552d9b] text-white font-semibold py-2 rounded-md">
                                Save Changes
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditJob;