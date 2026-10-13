import React from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../table";
import { Badge } from "../badge";
import { useSelector } from "react-redux";

const AppliedJob = () => {
    const { allAppliedJobs } = useSelector((store) => store.job);

    return (
        <div>
            <Table>
                <TableCaption>Recent Applied Jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Title</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {(!allAppliedJobs || allAppliedJobs.length === 0) ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center text-gray-500">
                                You have not applied any job yet.
                            </TableCell>
                        </TableRow>
                    ) : (
                        allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id}>
                                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell>{appliedJob?.job?.title}</TableCell>
                                <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                                <TableCell className="text-right">
                                    <Badge 
                                        className={`
                                            ${appliedJob?.status === "accepted" || appliedJob?.status === "Accepted" ? "bg-green-100 text-green-700 border-green-200" : ""}
                                            ${appliedJob?.status === "rejected" || appliedJob?.status === "Rejected" ? "bg-red-100 text-red-700 border-red-200" : ""}
                                            ${!appliedJob?.status || appliedJob?.status === "pending" || appliedJob?.status === "Pending" ? "bg-gray-100 text-gray-700 border-gray-200" : ""}
                                        `}
                                    >
                                        {appliedJob?.status ? appliedJob.status.charAt(0).toUpperCase() + appliedJob.status.slice(1) : "Pending"}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default AppliedJob;