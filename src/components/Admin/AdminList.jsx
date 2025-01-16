import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import Pagination from "../Pagination"; // Adjust path based on your setup
import { Button } from "../ui/button";
import { PencilIcon, Trash2 } from "lucide-react";

const AdminList = ({data = [],totalPages,currentPage,onPageChange,handleDeleteAdmin} ) => {
    console.log("data",data);
    const [deletingAdminId, setDeletingAdminId] = useState(null);

    const handleClick = async (adminId) => {
        setDeletingAdminId(adminId); // Mark this admin as being processed
        try {
          await handleDeleteAdmin(adminId); // Call the delete function
        } catch (error) {
          console.error("Error deleting admin:", error);
        } finally {
          setDeletingAdminId(null); // Clear the processing state
        }
      };
    return (
        <div>
            <Table className="mt-4">
                <TableHeader className="text-nowrap">
                    <TableRow>
                        <TableHead className="font-bold text-Secondary_Text">#ID</TableHead>
                        <TableHead className="font-bold text-Secondary_Text">Organization Name</TableHead>
                        <TableHead className="font-bold text-Secondary_Text">User Name</TableHead>
                        <TableHead className="font-bold text-Secondary_Text">User ID</TableHead>
                        <TableHead className="font-bold text-Secondary_Text">NO of Tests Created</TableHead>
                        <TableHead className="font-bold text-Secondary_Text">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((admin) => (
                        <TableRow key={admin.id}>
                            <TableCell>{admin.id}</TableCell>
                            <TableCell>{admin.organization_name}</TableCell>
                            <TableCell>{admin.name}</TableCell>
                            <TableCell>{admin.id}</TableCell>
                            <TableCell>{admin.test_created}</TableCell>
                            <TableCell className="flex items-center gap-2">
                                <Button size="icon" variant="outline" className="hover:text-Primary "><PencilIcon /></Button>
                                <Button size="icon" variant="outline" className="hover:text-Error" disabled={deletingAdminId === admin.id} onClick={() => handleClick(admin.id)}><Trash2 /></Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {/* Pagination Component */}
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={onPageChange}
            />
        </div>
    );
};

export default AdminList;
