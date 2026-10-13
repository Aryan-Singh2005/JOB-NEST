import React, { useEffect } from "react";
import Navbar from "../components_lite/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import { useParams } from "react-router-dom";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";
import { useDispatch, useSelector } from "react-redux";
import { setSingleApplication } from "@/redux/applicationSlice";
import axios from "axios";

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { singleApplication } = useSelector((store) => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                
                const res = await axios.get(`${APPLICATION_API_ENDPOINT}/${params.id}/applicants`, {
                    withCredentials: true,
                });
                if (res.data.success) {
                    dispatch(setSingleApplication(res.data.job));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchAllApplicants();
    }, [params.id, dispatch]);

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto">
                <h1 className="font-bold text-xl my-10">
                    Applicants ({singleApplication?.applications?.length || 0})
                </h1>
                <ApplicantsTable />
            </div>
        </div>
    );
};

export default Applicants;