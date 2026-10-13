import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import FilterCard from "./Filtercard";
import Job1 from "./Job1";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector((store) => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const [selectedValue, setSelectedValue] = useState("");

    const changeHandler = (value) => {
        setSelectedValue(value);
    };

    useEffect(() => {
        let filtered = allJobs;

        // 1. Text search query filter
        if (searchedQuery && searchedQuery.trim() !== "") {
            const query = searchedQuery.toLowerCase();
            filtered = filtered.filter((job) =>
                job?.title?.toLowerCase().includes(query) ||
                job?.description?.toLowerCase().includes(query) ||
                job?.location?.toLowerCase().includes(query) ||
                job?.jobType?.toLowerCase().includes(query)
            );
        }

        // 2. FilterCard selection filter (Location, Tech, Salary, Experience)
        if (selectedValue && selectedValue.trim() !== "") {
            const val = selectedValue.toLowerCase();

            filtered = filtered.filter((job) => {
                // Check if salary range is selected
                if (val.includes("lpa")) {
                    const jobSalary = Number(job?.salary) || 0;
                    if (val.includes("0-3")) return jobSalary >= 0 && jobSalary <= 3;
                    if (val.includes("3-6")) return jobSalary > 3 && jobSalary <= 6;
                    if (val.includes("6-10")) return jobSalary > 6 && jobSalary <= 10;
                    if (val.includes("10+")) return jobSalary >= 10;
                }

                // Normal string matching for Location, Tech, Experience
                return (
                    job?.title?.toLowerCase().includes(val) ||
                    job?.description?.toLowerCase().includes(val) ||
                    job?.location?.toLowerCase().includes(val) ||
                    job?.jobType?.toLowerCase().includes(val) ||
                    (Array.isArray(job?.requirements) && job.requirements.some(req => req.toLowerCase().includes(val)))
                );
            });
        }

        setFilterJobs(filtered);
    }, [allJobs, searchedQuery, selectedValue]);

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto mt-5">
                <div className="flex gap-5">
                    <div className="w-[20%]">
                        <FilterCard selectedValue={selectedValue} onChange={changeHandler} />
                    </div>
                    {filterJobs.length <= 0 ? (
                        <div className="flex-1 flex items-center justify-center">
                            <span className="text-lg font-medium text-gray-500">Job not found</span>
                        </div>
                    ) : (
                        <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                            <div className="grid grid-cols-3 gap-4">
                                {filterJobs.map((job) => (
                                    <motion.div
                                        key={job._id}
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <Job1 job={job} />
                                    </motion.div>
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