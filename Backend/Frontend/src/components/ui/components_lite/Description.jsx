import React, { useEffect, useState } from "react";
import { Badge } from "../badge";
import { Button } from "../button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import { JOB_API_ENDPOINT, APPLICATION_API_ENDPOINT } from "@/utils/data";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const description = () => {
    const params = useParams();
    const jobId = params.id ;
    console.log("Jod id in des",jobId);
    const { singleJob } = useSelector((store) => store.job);
    const dispatch = useDispatch();
    const [loading, setLoading]= useState(false);
    const [error,setError] = useState(null);
    const {user} = useSelector((store) =>store.auth);
    const [isApplied, setIsApplied] = useState(false);

    useEffect(() => {
        // Fetch all the jobs from the API
        const fetchSingleJobs = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`,{withCredentials:true});
                console.log("API Response:",res.data);
                console.log("Created At:", res.data.job.createdAt);
                console.log("Updated At:", res.data.job.updatedAt);
                console.log("Job Keys:", Object.keys(res.data.job));
                if (res.data.status) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(user ? res.data.job.applications?.some((application) =>
                        String(
                            typeof application.applicant === "object" ? application.applicant?._id: application.applicant) === String(user?._id) ) || false : false
                        );
                }else{
                    setError("Failed to fetch job.");
                }
            } catch (error) {
                console.error("Fetch Error:",error);
                setError(error.message || "An error occured.");
            }finally{
                setLoading(false);
            }
        };
        fetchSingleJobs();
    },[jobId, dispatch, user?._id]);
    console.log("single jobs", singleJob);

    if (!singleJob) {
        return <div>Loading...</div>
    }
    
    const applyJobHandler = async () => {
        if (!user) {
            toast.error("Please login to apply for jobs");
            navigate("/login");
            return;
        }
        try {
            const res = await axios.get(`${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
                { withCredentials: true }
            );
            if(res.data.success){
                setIsApplied(true);
                const updateSingleJob = { ...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]};
                dispatch(setSingleJob(updateSingleJob));
                console.log(res.data);
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.response.data.message);
        }
    };


    return (
        <div>
            <div className="max-w-7xl mx-auto my-10">
                <div className="flex items-center justify-between">
                    <div>
                    <h1 className="font-bold text-xl">{singleJob?.title}</h1>
                    <div className="flex gap-2 items-center mt-4">
                <Badge className={"text-blue-600 font-bold"} variant={"ghost"}>{singleJob?.position} Open Positions</Badge>
                <Badge className={"text-[#FA4F09] font-bold"} variant={"ghost"}>{singleJob?.salary} LPA</Badge>
                <Badge className={"text-[#6B3AC2] font-bold"} variant={"ghost"}>{singleJob?.location}</Badge>
                <Badge className={"text-black font-bold"} variant={"ghost"}>{singleJob?.jobType}</Badge>
            </div>
            </div>
                <div>
                    <Button onClick={isApplied ? null: applyJobHandler} disabled={isApplied} className={`rounded-lg ${isApplied? "bg-green-100 text-green-700 border border-green-200 cursor-not-allowed hover:bg-green-100":"bg-[#6B3AC2] text-white hover:bg-[#552d9b]" }`}>{isApplied ? "Already Applied": "Apply"}</Button>
                </div>
            </div>
            <h1 className="border-b-2 border-b-gray-400 font-medium py-4">{singleJob?.description}</h1>
            <div className="my-4">
                <h1 className="font-bold my-1">
                Role: <span className="pl-4 font-normal text-gray-800">{singleJob?.position} Open Positions</span>
                </h1>
                <h1 className="font-bold my-1">
                Location: <span className="pl-4 font-normal text-gray-800">{singleJob?.location}</span>
                </h1>
                <h1 className="font-bold my-1">
                Salary: <span className="pl-4 font-normal text-gray-800">{singleJob?.salary} LPA</span>
                </h1>
                <h1 className="font-bold my-1">
                Experience: <span className="pl-4 font-normal text-gray-800">{singleJob?.experience} Year</span>
                </h1>
                <h1 className="font-bold my-1">
                Job Type: <span className="pl-4 font-normal text-gray-800">{singleJob?.jobType}</span>
                </h1>
                <h1 className="font-bold my-1">
                Total Applicants:{" "} <span className="pl-4 font-normal text-gray-800">{singleJob?.applications?.length}</span>
                </h1>
                <h1 className="font-bold my-1">
                Post Date: <span className="pl-4 font-normal text-gray-800">{(singleJob?.createdAt || singleJob?.updatedAt)?.split("T")[0]}</span>
                </h1>
            </div>
        </div>
        </div>
    );
};

export default description;