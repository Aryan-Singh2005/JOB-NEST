import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../table";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { toast } from "sonner";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { singleApplication } = useSelector((store) => store.application);
    const [applicants, setApplicants] = useState([]);

    useEffect(() => {
        if (singleApplication?.applications) {
            setApplicants(singleApplication.applications);
        }
    }, [singleApplication]);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_ENDPOINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
                setApplicants((prev) =>
                    prev.map((app) => (app._id === id ? { ...app, status } : app))
                );
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div>
            <Table>
                <TableCaption>List of your applied Users</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Fullname</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Applied On</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Job Title</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants?.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center text-gray-500">
                                No Applicants Found
                            </TableCell>
                        </TableRow>
                    ) : (
                        applicants?.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell>{item?.applicant?.fullname || "N/A"}</TableCell>
                                <TableCell>{item?.applicant?.email || "N/A"}</TableCell>
                                <TableCell>{item?.applicant?.phoneNumber || "N/A"}</TableCell>
                                <TableCell>{item?.applicant?.createdAt?.split("T")[0] || "N/A"}</TableCell>
                                <TableCell>
                                    {item?.applicant?.profile?.resume ? (
                                        <a
                                            href={item?.applicant?.profile?.resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline"
                                        >
                                            {item?.applicant?.profile?.resumeOriginalName || "Resume"}
                                        </a>
                                    ) : (
                                        <span>NA</span>
                                    )}
                                </TableCell>
                                <TableCell>{singleApplication?.title || "N/A"}</TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button className="p-2 hover:bg-gray-100 rounded-full inline-flex items-center justify-center">
                                                <MoreHorizontal className="cursor-pointer" />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent align="end" side="bottom" className="w-32 bg-white shadow-xl border border-gray-200 z-50 p-2">
                                            {shortlistingStatus.map((status, index) => {
                                                const isSelected = item?.status?.toLowerCase() === status.toLowerCase();
                                                return (
                                                    <div
                                                        key={index}
                                                        onClick={() => statusHandler(status, item._id)}
                                                        className="flex items-center gap-2 py-1.5 px-2 cursor-pointer hover:bg-gray-50 rounded group"
                                                    >
                                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${isSelected
                                                                ? 'border-purple-600 bg-purple-50'
                                                                : 'border-gray-400 group-hover:border-purple-500 group-hover:bg-purple-50'
                                                            }`}>
                                                            {isSelected ? (
                                                                <div className="w-2 h-2 bg-purple-600 rounded-full" />
                                                            ) : (
                                                                <div className="w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-40 transition-opacity" />
                                                            )}
                                                        </div>
                                                        <span className="text-sm font-medium text-gray-700">{status}</span>
                                                    </div>
                                                );
                                            })}
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

export default ApplicantsTable;