import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../table";
import { Avatar, AvatarImage, AvatarFallback } from "../avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector((store) => store.company);
    const navigate = useNavigate();
    const [filterCompany, setFilterCompany] = useState(companies);

    useEffect(() => {
        const filtered = companies?.length > 0 ? companies.filter((company) => {
            if (!searchCompanyByText) {
                return true;
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        }) : [];
        setFilterCompany(filtered);
    }, [companies, searchCompanyByText]);

    return (
        <div>
            <Table>
                <TableCaption>Your recent Registered Companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {!filterCompany || filterCompany.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">No Companies Added</TableCell>
                        </TableRow>
                    ) : (
                        filterCompany.map((company) => (
                            <TableRow key={company._id}>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={company.logo} alt={company.name} />
                                        <AvatarFallback>{company.name?.charAt(0) || "CN"}</AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                <TableCell>{company.name}</TableCell>
                                <TableCell>{company.createdAt?.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button className="p-2 hover:bg-gray-100 rounded-full inline-flex items-center justify-center">
                                                <MoreHorizontal />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent align="end" side="bottom" className="w-32 bg-white shadow-xl border border-gray-200 z-50">
                                            <div 
                                                onClick={() => navigate(`/admin/companies/${company._id}`)} 
                                                className="flex items-center gap-2 w-fit cursor-pointer text-gray-700 hover:text-black"
                                            >
                                                <Edit2 className="w-4" />
                                                <span>Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default CompaniesTable;
