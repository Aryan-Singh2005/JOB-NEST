import React from "react";
import Navbar from "./Navbar";
import Job1 from "./Job1";
import { useDispatch, useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { setSearchedQuery } from "@/redux/jobSlice";

const Browse = () => {
    useGetAllJobs();
    const dispatch = useDispatch();
    const { allJobs, searchedQuery } = useSelector((store) => store.job);

    // Strict filtering: Sirf title aur jobType/location par match karega taaki galat jobs na dikhein
    const filteredJobs = allJobs.filter((job) => {
        if (!searchedQuery) return true;
        const query = searchedQuery.toLowerCase().trim();
        
        const titleMatch = job?.title?.toLowerCase().includes(query);
        const typeMatch = job?.jobType?.toLowerCase().includes(query);
        const locationMatch = job?.location?.toLowerCase().includes(query);

        return titleMatch || typeMatch || locationMatch;
    });

    const clearSearchHandler = () => {
        dispatch(setSearchedQuery(""));
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto my-10">
                <div className="flex justify-between items-center my-10">
                    <h1 className="font-bold text-xl">
                        Search Results ({filteredJobs.length})
                    </h1>
                    {searchedQuery && (
                        <button
                            onClick={clearSearchHandler}
                            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors"
                        >
                            Clear Filter
                        </button>
                    )}
                </div>

                {filteredJobs.length === 0 ? (
                    <div className="text-center my-20">
                        <p className="text-gray-500 text-lg font-medium">No Jobs Found for "{searchedQuery}"</p>
                        <button
                            onClick={clearSearchHandler}
                            className="mt-4 text-blue-600 underline text-sm font-semibold"
                        >
                            Show all jobs
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-4">
                        {filteredJobs.map((job) => {
                            return <Job1 key={job._id} job={job} />;
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Browse;