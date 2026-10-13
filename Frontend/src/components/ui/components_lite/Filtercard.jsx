import React from "react";
import { RadioGroup, RadioGroupItem } from "../radio-group";

const filterData = [
    {
        filterType: "Location",
        array: [
            "Delhi",
            "Mumbai",
            "Noida",
            "Kolkata",
            "Indore",
            "Bangalore",
            "Vadodara",
            "Hyderabad",
            "Remote",
        ],
    },
    {
        filterType: "Technology",
        array: ["MERN", "React", "Data Scientist", "Fullstack", "Node", "GEN AI", "AI ML", "Frontend", "Backend", "Game Developer", "Ethical Hacking"],
    },
    {
        filterType: "Experience",
        array: ["0-3 years", "3-5 years", "5-7 years", "7+ years"],
    },
    {
        filterType: "Salary",
        array: ["0-3 LPA", "3-6 LPA", "6-10 LPA", "10+ LPA"],
    }
];

const FilterCard = ({ selectedValue, onChange }) => {
    return (
        <div className="w-full bg-white rounded-md">
            <h1 className="font-bold text-lg">Filter Jobs</h1>
            <hr className="mt-3"/>
            <RadioGroup value={selectedValue} onValueChange={onChange}>
                {filterData.map((data) => (
                    <div key={data.filterType}>
                        <h2 className="font-bold text-lg">{data.filterType}</h2>
                        {data.array.map((item) => {
                            const itemId = `id-${item}`;
                            return (
                                <div key={item} className="flex items-center space-x-2 my-2">
                                    <RadioGroupItem value={item} id={itemId}></RadioGroupItem>
                                    <label htmlFor={itemId}>{item}</label>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};

export default FilterCard;