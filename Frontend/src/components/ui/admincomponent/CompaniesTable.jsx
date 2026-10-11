import React from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../table";
import { Avatar, AvatarImage } from "../avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AvatarFallback } from "@radix-ui/react-avatar";

const CompaniesTable = () => {
    const { companies } = useSelector((store) => store.company);
    const navigate = useNavigate();

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
                    {
                        !companies || companies.length <= 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">No Companies Added</TableCell>
                            </TableRow>
                        ) : (
                            companies?.map((company) => (
                                <TableRow key={company._id}>
                                    <TableCell>
                                        <Avatar>
                                            <AvatarImage src={company.logo || "default-logo-url"} alt={`${company.name}logo`} />
                                            <AvatarFallback>{company.name?.charAt(0) || "CN"}</AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>{company.name}</TableCell>
                                    <TableCell>{company.createdAt?.split("T")[0]}</TableCell>
                                    <TableCell className="text-right cursor-pointer">
                                        <Popover>
                                            <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                            <PopoverContent className="w-32">
                                                <div 
                                                    onClick={() => navigate(`/admin/companies/${company._id}`)} 
                                                    className="flex items-center gap-2 w-fit cursor-pointer"
                                                >
                                                    <Edit2 className="w-4" />
                                                    <span>Edit</span>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default CompaniesTable;