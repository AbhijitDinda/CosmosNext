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
import EditAdmin from "./EditDesignation";

const DesignationList = ({data = [],totalPages,currentPage,onPageChange,handleDeleteAdmin,refetch} ) => {
    console.log("data",totalPages,currentPage);
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

    const [editDialog,setEditDialog] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState(null);

    const handleEditAdmin = (admin) => {
        console.log(admin);
        setSelectedAdmin(admin); // Set the selected admin
        setEditDialog(true); // Open the dialog
    };



    return (
        <div>
            <Table className="mt-4">
                <TableHeader className="text-nowrap">
                    <TableRow>
                        <TableHead className="font-bold text-Secondary_Text">#ID</TableHead>
                        <TableHead className="font-bold text-Secondary_Text">Designation Name</TableHead>
                        <TableHead className="font-bold text-Secondary_Text">Admin Id</TableHead>
                        <TableHead className="font-bold text-Secondary_Text">Organization Name</TableHead>
                        <TableHead className="font-bold text-Secondary_Text">Created At</TableHead>
                        <TableHead className="font-bold text-Secondary_Text">Status</TableHead>
                        <TableHead className="font-bold text-Secondary_Text">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((admin) => (
                        <TableRow key={admin.id}>
                            <TableCell>{admin.id}</TableCell>
                            <TableCell>{admin.designation_name}</TableCell>
                            <TableCell>{admin.admin_id}</TableCell>
                            <TableCell>{admin.organization_name}</TableCell>
                            <TableCell>{admin.created_at}</TableCell>
                            <TableCell>{admin.status}</TableCell>
                            <TableCell className="flex items-center gap-2">

                                <Button size="icon" variant="outline" className="hover:text-Primary" onClick={() => handleEditAdmin(admin)}>
                                <PencilIcon />
                                </Button>

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

            {/* EditAdmin Dialog */}
            {editDialog && (
                <EditAdmin
                    admin={selectedAdmin}
                    editDialog={editDialog}
                    setEditDialog={setEditDialog}
                    refetch={refetch}
                />
            )}

        </div>
    );
};

export default DesignationList;
