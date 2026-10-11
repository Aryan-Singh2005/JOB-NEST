import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all the jobs from the API
        const fetchAllJobs = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/get`,{withCredentials:true});
                console.log("API Response:",res.data);
                if (res.data.status) {
                    dispatch(setAllJobs(res.data.jobs));
                }else{
                    setError("Failed to fetch jobs.");
                }
            } catch (error) {
                console.error("Fetch Error:",error);
                setError(error.message || "An error occured.");
            }finally{
                setLoading(false);
            }
        };
        fetchAllJobs();
    },[dispatch]);
    return {loading, error};
};

export default useGetAllJobs;