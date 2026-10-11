import React from "react";
import Navbar from "./Navbar";
import Job1 from "./Job1";
import { useSelector } from "react-redux";


const Browse = () => {
    const {allJobs} = useSelector((store) => store.job);
    return (
        <div>
            <Navbar/>
            <div className="max-w-7xl mx-auto my-10">
                <h1 className="font-bold text-xl my-10">Search Results {allJobs.length}</h1>
                <div className="grid grid-cols-3 gap-4">
                {allJobs.map((job) => {
                    return <Job1 key={Job1._id} job={job}/>;
                })}
            </div>
          </div>
        </div>
    );
};

export default Browse;