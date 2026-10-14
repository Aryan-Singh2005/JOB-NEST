import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Avatar, AvatarImage } from "../avatar";
import { Button } from '../button';
import { LogOut, User2, Bookmark } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { USER_API_ENDPOINT } from '@/utils/data';
import { setUser } from '@/redux/authSlice';
import axios from 'axios';

const Navbar = () => {
    const { user } = useSelector((store) => store.auth);  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = async () => {
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });
      if (res && res.data && res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      } else {
        console.error("Error logging out:", res.data);
      }
    } catch (error) {
      console.error("Axios error:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
      }
      toast.error("Error logging out. Please try again.");
    }
  };
    return (
        <div className="bg-white">
           <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
              <div>
                <h1 className="text-2xl font-bold">
                    <span className="text-[#6B3AC2]">Job</span>
                    <span className="text-[#FA4F09]">Nest</span>
                </h1>
            </div>
            <div className="flex items-center gap-10">
                <ul className="flex font-medium items-center gap-6">
                    {user && user.role === "Recruiter"?(
                            <>
                           <li><Link to ="/admin/companies">Companies</Link></li>
                            <li><Link to ="/admin/jobs">Jobs</Link></li>
                            </>
                        ) : (
                            <>
                            <li><Link to ="/Home">Home</Link></li>
                            <li><Link to ="/Browse">Browse</Link></li>
                            <li><Link to="/Jobs">Jobs</Link></li>
                            </>
                        )
                        }
                </ul>
                
                   { !user ? (
                        <div className="flex items-center gap-2">
                           <Link to ={"/login"}>
                           {" "} 
                           <Button variant="outline">Login</Button>
                            </Link>
                           <Link to ={"/register"}>
                           {" "}
                            <Button className="bg-red-600 hover:bg-red-700">Register</Button> 
                            </Link>
                        </div>
                    ) : (
                       <Popover>
                    <PopoverTrigger asChild>
                        <Avatar className="cursor-pointer">
                            <AvatarImage
                            src={user?.profile?.profilePhoto}
                            alt={user?.fullname}
                            />
                        </Avatar>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 z-50 bg-white text-black shadow-xl border border-gray-200">
                        <div className="flex items-center gap-4 space-y-2">
                            <Avatar className="cursor-pointer">
                            <AvatarImage
                            src={user?.profile?.profilePhoto} 
                            alt={user?.fullname}
                            />
                        </Avatar>
                        <div>
                        <h3 className="font-medium">{user?.fullname}</h3>
                        <p className="text-sm text-gray-500">
                            {user?.profile?.bio}
                        </p>
                        </div>
                        </div>
                        
                            <div className="flex flex-col my-2 text-gray-600 ">
                            {user && user.role === 'Student' && (
                                <>
                                <div className="flex w-fit items-center gap-2 cursor-pointer">
                                    <User2 className="text-black"></User2>
                                    <Button variant="link" className="text-black"><Link to="/Profile">Profile</Link></Button>
                                </div>
                                <div className="flex w-fit items-center gap-2 cursor-pointer">
                                    <Bookmark className="text-black"></Bookmark>
                                    <Button variant="link" className="text-black"><Link to="/saved-jobs">Saved Jobs</Link></Button>
                                </div>
                                </>
                            )}

                            <div className="flex w-fit items-center gap-2 cursor-pointer">
                                <LogOut className="text-black"></LogOut>
                                <Button onClick={logoutHandler} variant="link" className="text-black">Logout</Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
                    )
                }
               
            </div>
           </div>
        </div>
    );
};
export default Navbar;