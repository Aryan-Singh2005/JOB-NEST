import React from "react";
import Navbar from "./Navbar";
import FilterCard from "./Filtercard";
import Job1 from "./Job1";
import { useSelector } from "react-redux";

// const jobsArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

const Jobs =  () => {
    const { allJobs } = useSelector((store) => store.job);
    return (
        <div>
            <Navbar/>
            <div className="max-w-7xl mx-auto mt-5">
                <div className="flex gap-5">
                <div className="w-20%">
                    <FilterCard/>
                </div>
                {allJobs.length <= 0 ?(
                    <span className="">Job not found</span>
                ): (
                    <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                        <div className="grid grid-cols-3 gap-4">
                     {   allJobs.map((job) => (
                         <div key={job._id}>
                            <Job1 job={job}/>
                         </div>
                     ))}
                    </div>
                    </div>
             )}
            </div>
            </div>
            
        </div>
    );
};

export default Jobs;