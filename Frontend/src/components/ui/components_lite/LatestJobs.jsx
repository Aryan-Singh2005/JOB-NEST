import React from "react";
import JobCards from "./JobCards";
import { useSelector } from "react-redux";
const randomJobs = [1,2,3,4,5,6,7,8,9];

const LatestJobs = () => {
    const { allJobs } = useSelector((store) => store.jobs.allJobs);
    return (
        <div className="max-w-7xl mx-auto my-20">
            <h2 className="text-4xl font-bold">
                <span className="text-[#6A38C2]">Latest & Top </span>Job Openings
            </h2>
            {/* Job Cards */}

        <div className="grid grid-cols-3 gap-4 my-5">
            {allJobs?.length === 0 ? (
                <span> No Job Available</span>
            ) : (
            allJobs?.slice(0, 6).map((job) => 
                <JobCards key={job._id} job={job}></JobCards>)
        )}
        </div>
        </div>
    );
};

export default LatestJobs;