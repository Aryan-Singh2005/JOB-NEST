import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Avatar, AvatarImage } from "../avatar";
import { Button } from '../button';
import { LogOut, User2 } from 'lucide-react';
import { Link } from 'react-router-dom';


const Navbar = () => {
    const user = false;
    return (
        <div className="bg-white">
           <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
             <div>
                <h1 className="text-2xl font-bold">
                    Job <span className="text-[#022bf8]
                    ">Nest</span>
                </h1>
            </div>
            <div className="flex items-center gap-10">
                <ul className="flex font-medium items-center gap-6">
                    <li>Home</li>
                    <li>Browse</li>
                    <li>Jobs</li>
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
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                            />
                        </Avatar>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <div className="">
                            <Avatar className="cursor-pointer">
                            <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                            />
                        </Avatar>
                        <div>
                        <h3 className="font-medium">Aryan Singh</h3>
                        <p className="text-sm text-gray-500">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        </p>
                        </div>
                        </div>
                        <div className="flex flex-col my-2 text-gray-600 ">
                            <div className="flex w-fit items-center gap-2 cursor-pointer">
                                <User2 className="text-black"></User2>
                                <Button variant="link" className="text-black">Profile</Button>
                            </div>
                        </div>
                        
                            <div className="flex w-fit items-center gap-2 cursor-pointer">
                                <LogOut></LogOut>
                                <Button variant="link">Logout</Button>
                            
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