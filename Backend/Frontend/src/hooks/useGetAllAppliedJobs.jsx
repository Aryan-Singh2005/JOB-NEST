import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAppliedJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_ENDPOINT}/get`, {
                    withCredentials: true,
                });
                if(res.data.success){
                    dispatch(setAllAppliedJobs(res.data.applications));
                }
            } catch (error) {
                console.error(error);
                // Agar application na mile ya naya user ho toh state ko empty array se reset kar do
                dispatch(setAllAppliedJobs([]));
            }
        };
        fetchAppliedJobs();
    }, [dispatch]);
    return null;
};

export default useGetAllAppliedJobs;