import React from "react";
import { Button } from "../button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Badge } from "../badge";
import { useNavigate } from "react-router-dom";

const Job1 = ({ job }) => {
    const navigate = useNavigate();

    const daysAgo = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDiff = currentTime - createdAt;
        return Math.floor(timeDiff / (1000 * 3600 * 24));
    };

    return (
        <div 
            onClick={() => navigate(`/description/${job?._id}`)}
            className="p-5 rounded-md shadow-xl bg-white border border-gray-200 cursor-pointer hover:shadow-2xl hover:shadow-blue-200 transition-all duration-300"
        >
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                    {job?.createdAt
                        ? daysAgo(job.createdAt) === 0
                            ? "Today"
                            : `${daysAgo(job.createdAt)} days ago`
                        : job?.updatedAt
                        ? `${daysAgo(job.updatedAt)} days ago`
                        : ""}
                </p>
                <Button variant="outline" className="rounded-full" size="icon" onClick={(e) => e.stopPropagation()}>
                    <Bookmark />
                </Button>
            </div>

            <div className="flex items-start gap-2 my-2">
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} alt="Company Logo" />
                        <AvatarFallback>{job?.company?.name?.charAt(0) || "C"}</AvatarFallback>
                    </Avatar>
                </Button>
                <div>
                    <h1 className="text-lg font-medium">{job?.company?.name}</h1>
                    <p className="text-sm text-gray-600">{job?.location || "India"}</p>
                </div>
            </div>

            <div>
                <h2 className="font-bold text-lg my-2">{job?.title}</h2>
                <p className="text-sm text-gray-600 line-clamp-2">
                    {job?.description}
                </p>
            </div>

            <div className="flex flex-wrap gap-2 items-center mt-4">
                <Badge className="text-blue-600 font-bold" variant="ghost">
                    {job?.position} Open Positions
                </Badge>
                <Badge className="text-[#FA4F09] font-bold" variant="ghost">
                    {job?.salary} LPA
                </Badge>
                <Badge className="text-[#6B3AC2] font-bold" variant="ghost">
                    {job?.location}
                </Badge>
                <Badge className="text-black font-bold" variant="ghost">
                    {job?.jobType}
                </Badge>
            </div>

            <div className="flex items-center gap-4 mt-4" onClick={(e) => e.stopPropagation()}>
                <Button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    variant="outline"
                    className="font-bold rounded-sm"
                >
                    Details
                </Button>
                <Button
                    variant="outline"
                    className="bg-[#6B3AC2] text-white font-bold rounded-sm hover:bg-black hover:text-white"
                >
                    Save For Later
                </Button>
            </div>
        </div>
    );
};

export default Job1;