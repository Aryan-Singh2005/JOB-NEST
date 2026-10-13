import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../table";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
    const navigate = useNavigate();
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);

    useEffect(() => {
        const filteredJobs = allAdminJobs?.length > 0 ? allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            }
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || 
                   job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase());
        }) : [];
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    return (
        <div>
            <Table>
                <TableCaption>Your recent Posted Jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {!filterJobs || filterJobs.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">No Jobs Posted Yet</TableCell>
                        </TableRow>
                    ) : (
                        filterJobs.map((job) => (
                            <TableRow key={job._id}>
                                <TableCell>{job?.company?.name || "N/A"}</TableCell>
                                <TableCell>{job?.title}</TableCell>
                                <TableCell>{job?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button className="p-2 hover:bg-gray-100 rounded-full inline-flex items-center justify-center">
                                                <MoreHorizontal />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent align="end" side="bottom" className="w-32 bg-white shadow-xl border border-gray-200 z-50">
                                            <div 
                                                onClick={() => navigate(`/admin/jobs/edit/${job._id}`)} 
                                                className="flex items-center gap-2 w-fit cursor-pointer text-gray-700 hover:text-black mb-1"
                                            >
                                                <Edit2 className="w-4 text-gray-900" />
                                                <span className="text-gray-900">Edit</span>
                                            </div>
                                            <hr />
                                            <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center gap-2 w-fit cursor-pointer mt-1">
                                                <Eye className="w-4"></Eye>
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default AdminJobsTable;