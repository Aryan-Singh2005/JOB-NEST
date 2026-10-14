import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import Job1 from "./Job1";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
import { useSelector } from "react-redux";

const SavedJobs = () => {
    const [savedJobs, setSavedJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useSelector((store) => store.auth);

    useEffect(() => {
        const fetchSavedJobs = async () => {
            try {
                const res = await axios.get(`${USER_API_ENDPOINT}/saved-jobs`, {
                    withCredentials: true,
                });
                if (res.data.success) {
                    setSavedJobs(res.data.savedJobs);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        if (user) {
            fetchSavedJobs();
        } else {
            setLoading(false);
        }
    }, [user]);

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto mt-10 px-4">
                <h1 className="font-bold text-2xl my-5">Saved Jobs ({savedJobs.length})</h1>
                {loading ? (
                    <span className="text-gray-500">Loading...</span>
                ) : savedJobs.length === 0 ? (
                    <span className="text-gray-500">No saved jobs found.</span>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {savedJobs.map((job) => (
                            <Job1 key={job._id} job={job} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SavedJobs;