import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector((store) => store.job);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllJobs = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/get`, { withCredentials: true });
                console.log("API Response:", res.data);
                if (res.data.status) {
                    dispatch(setAllJobs(res.data.jobs));
                } else {
                    setError("Failed to fetch jobs.");
                }
            } catch (error) {
                console.error("Fetch Error:", error);
                setError(error.message || "An error occurred.");
            } finally {
                setLoading(false);
            }
        };
        fetchAllJobs();
    }, [searchedQuery, dispatch]);

    return { loading, error };
};

export default useGetAllJobs;