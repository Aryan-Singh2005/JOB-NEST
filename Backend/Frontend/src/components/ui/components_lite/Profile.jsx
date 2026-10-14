import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "../avatar";
import { Button } from "../button";
import { Pen, Mail, Contact } from "lucide-react";
import { Badge } from "../badge";
import AppliedJob from "./AppliedJob";
import EditProfileModal from "./EditProfileModal";
import { useSelector } from "react-redux";
import useGetAllAppliedJobs from "@/hooks/useGetAllAppliedJobs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
import Job1 from "./Job1";

const Profile = () => {
    useGetAllAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector((store) => store.auth);
    const [savedJobs, setSavedJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSavedJobs = async () => {
            try {
                const res = await axios.get(`${USER_API_ENDPOINT}/saved-jobs`, {
                    withCredentials: true,
                });
                if (res.data.success) {
                    setSavedJobs(res.data.savedJobs);
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (user) {
            fetchSavedJobs();
        }
    }, [user]);

    const isResume = Boolean(user?.profile?.resume);

    return (
        <div>
            <Navbar/>
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow shadow-gray-400 hover:shadow-yellow-400">
                <div className="flex justify-between">
                <div className="flex items-center gap-5">
                    <Avatar className="cursor-pointer h-24 w-24">
                     <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                </Avatar>
                <div>
                    <h1 className="font-medium text-xl">{user?.fullname}</h1>
                <p>{user?.profile?.bio}</p>
                </div>
                </div>
                <Button onClick={() => setOpen(true)}  className="text-right" variant="outline">
                    <Pen />
                </Button>
            </div>
            <div className="my-5">
                <div className="flex items-center gap-3 my-2">
                    <Mail />
                <span className="">
                    <a href={`mailto:${user?.email}`}>{user?.email}</a>
                    </span>
                </div>
                <div className="flex items-center gap-3 my-2">
                <Contact />
                <span className="">
                    <a href={`tel:${user?.phoneNumber}`}>{user?.phoneNumber}</a>
                </span>
                </div>
            </div>
            <div>
                <div className="my-5">
                    <h1>Skills</h1>
                    <div className="flex items-center gap-1 flex-wrap">
                    {user?.profile?.skills?.length !== 0 ? (
                     user?.profile?.skills.map((item,index) => <Badge key={index}
                     className="bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-600 hover:text-white"
                     >{item}</Badge>)
                    ) : (
                        <span>NA</span>
                    )}
                    </div>
                </div>
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <label className="text-md font-bold">Resume</label>
              <div>
                {
                    isResume ?( <a target = "_blank" rel="noopener noreferrer" href={user?.profile?.resume}
                    className="text-blue-600 hover:underline cursor-pointer"
                    >Download</a>) : (
                    <span>No Resume Found</span>
                )}
              </div>
            </div>
        </div>

        {/* Applied Jobs Section */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl my-5 p-6 border border-gray-200 shadow-sm">
            <h1 className="text-lg my-5 font-bold">Applied Jobs</h1>
            <AppliedJob />
        </div>

        {/* Saved Jobs Section inside Profile */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl my-5 p-6 border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg font-bold">Saved Jobs ({savedJobs.length})</h1>
                <Button 
                    variant="outline" 
                    onClick={() => navigate("/saved-jobs")}
                    className="text-sm border-[#6B3AC2] text-[#6B3AC2] hover:bg-[#6B3AC2] hover:text-white"
                >
                    View All Saved Jobs
                </Button>
            </div>
            {savedJobs.length === 0 ? (
                <span className="text-gray-500 text-sm">No saved jobs found.</span>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {savedJobs.slice(0, 4).map((job) => (
                        <Job1 key={job._id} job={job} />
                    ))}
                </div>
            )}
        </div>

        {/* Edit Profile Modal */}
        <EditProfileModal open={open} setOpen={setOpen} />
        </div>
    );
};

export default Profile;