import React, {useState} from "react"
import Navbar from "../components_lite/Navbar";
import { Label } from "../label";
import { Input } from "../input";
import { RadioGroup, RadioGroupItem } from "../radio-group";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_ENDPOINT } from "@/utils/data.js";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";

const Login = () => {
    const [input, setInput] = useState({
            email: "",
            password: "",
            role: "",
        });
        const navigate = useNavigate();
        const dispatch = useDispatch();
        const { loading } = useSelector((store) => store.auth);
        const changeEventHandler = (e) => {
            setInput({...input, [e.target.name]: e.target.value});
        };
        const changeFileHandler = (e) => {
            setInput({...input, file: e.target.files?.[0]});
        };
    
        const submitHandler = async (e) => {
        e.preventDefault();
        console.log("Login Data:",input)
        const formData = new FormData();
        
        
        try {
            dispatch(setLoading(true));
            const res= await axios.post(`${USER_API_ENDPOINT}/login`, input,{
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            if(res.data.success){
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            const errorMessage = error.response? error.response.data.message : "An unexpected error occured.";
            toast.error(errorMessage);
        }
        finally {
            dispatch(setLoading(false));
        }
    };
    return (
        <div>

        <div>
            <Navbar></Navbar>
            <div className="flex items-center justify-center max-w-7xl mx-auto">
                <form onSubmit={submitHandler} className="w-1/2 border border-gray-500 rounded-md p-4 my-10">
                    <h1 className="font-bold text-xl mb-5  text-center text-blue-600">Login</h1>
                    
                    <div className="my-2">
                        <Label>Email</Label>
                        <Input type="email" value={input.email} name="email" onChange={changeEventHandler} placeholder="johndoe@gmail.com"></Input>
                    </div>
                    <div className="my-2">
                        <Label>Password</Label>
                        <Input type="password" value={input.password} name="password" onChange={changeEventHandler} placeholder="********"></Input>
                    </div>
                    
                    <div className="flex items-center justify-between">
                        
                        <RadioGroup className='flex items-center gap-4 my-5'>
                            <div className="flex items-center space-x-2">
                            <Input type="radio" name="role" value="Student" checked={input.role === "Student"} onChange={changeEventHandler}  className="cursor-pointer"/>
                            <Label htmlFor="r2">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                            <Input type="radio" name="role" value="Recruiter" checked={input.role === "Recruiter"} onChange={changeEventHandler} className="cursor-pointer"/>
                            <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        </div>
                       {
                        loading? (
                            <div className="flex items-center justify-center my-10">
                                <div className="spinner-border text-blue-600" role="status">

                                </div>

                            </div>
                        ) : (
                                <button className="block w-3/4 py-3 my-3 text-white flex items-center justify-center max-w-7xl mx-auto bg-blue-600 hover:bg-blue-800 rounded-md">Login</button>
                        )}
                       
                        
                        {/* No account then register*/}
                        <div>
                        <p className="text-gray-700 text-center my-2">
                         Create New Account{" "} <Link to="/register" className="text-blue-700">
                        <button className="block w-1/2 py-3 my-3 text-white flex items-center justify-center max-w-7xl mx-auto bg-green-600 hover:bg-green-800 rounded-md">Register</button>
                        </Link>
                        </p>
                        </div>
                </form>
            </div>
        </div>
        </div>
    )
}

export default Login;