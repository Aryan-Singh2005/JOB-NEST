import React from "react";
import { Button } from "../button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "../avatar";
import { Badge } from "../badge";
import { useNavigate } from "react-router-dom";

const Job1 = () => {

    const navigate = useNavigate();
    const jobId = "hbwh"
    return (
            <div className="p-5 rounded-md shadow-xl bg-white border border-gray-200 cursor-pointer hover:shadow-2xl hover:shadow-blue-200 ">
                <div className="flex items-center justify-between">
                    {" "}
                    <p className="text-sm text-gray-600">3 days ago</p>
            <Button variant="outline" className="rounded-full" size="icon">
                <Bookmark/>
                </Button>{" "}
                </div>
        <div className="flex items-start gap-2 my-2">
            <Button className="p-6" variant="outline" size="icon"> 
            <Avatar>
                <AvatarImage src="https://img.icons8.com/fluency/96/briefcase.png"
        alt="Job">
                </AvatarImage>
            </Avatar>
        </Button>
            <div>
                <h1 className="text-lg font-medium">Company Name</h1>
                <p className="text-sm text-gray-600">India</p>
            </div>
            </div>
            <div>
                <h2 className="font-bold text-lg my-2">Job Title</h2>
                <p className="text-sm text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, adipisci facilis asperiores recusandae quia et quasi cum provident!
                </p>
            </div>
            <div className="flex gap-2 items-center mt-4">
                <Badge className={"text-blue-600 font-bold"} variant={"ghost"}>10 Position</Badge>
                <Badge className={"text-[#FA4F09] font-bold"} variant={"ghost"}>20 LPA</Badge>
                <Badge className={"text-[#6B3AC2] font-bold"} variant={"ghost"}>Remote</Badge>
                <Badge className={"text-black font-bold"} variant={"ghost"}>Full Time</Badge>
            </div>
            <div className="flex items-center gap-4 mt-4">
                <Button
                onClick={() => {
                    navigate(`/description/${jobId}`);
                }}
                variant="outline" className="font-bold rounded-sm">
                    
                    Details
                    </Button>
                    <Button variant="outline" className="bg-[#6B3AC2] text-white font-bold rounded-sm hover:bg-black">
                    
                    Save For Later
                    </Button>
            </div>
        </div>
    );
};

export default Job1;