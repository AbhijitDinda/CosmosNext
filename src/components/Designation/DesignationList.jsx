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
import EditDesignation from "./EditDesignation";

const DesignationList = ({data = [],totalPages,currentPage,onPageChange,handleDeleteDesignation,refetch} ) => {
    console.log("data",totalPages,currentPage);
    const [deletingDesignationId, setDeletingDesignationId] = useState(null);

    const handleClick = async (designationId) => {
        setDeletingDesignationId(designationId); // Mark this designation as being deleted
        try {
            await handleDeleteDesignation(designationId); // Call the delete function
            console.log("Designation deleted successfully:", designationId);
            refetch(); // Re-fetch the data to reflect the changes
        } catch (error) {
            console.error("Error deleting designation:", error);
        } finally {
            setDeletingDesignationId(null); // Clear the deleting state
        }
    };
    

    const [editDialog,setEditDialog] = useState(false);
    const [selectedDesignation, setSelectedDesignation] = useState(null);

    const handleEditDesignation = (designation) => {
        console.log(designation);
        setSelectedDesignation(designation); 
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
                    {data.map((designation) => (
                        <TableRow key={designation.id}>
                            <TableCell>{designation.id}</TableCell>
                            <TableCell>{designation.designation_name}</TableCell>
                            <TableCell>{designation.admin_id}</TableCell>
                            <TableCell>{designation.organization_name}</TableCell>
                            <TableCell>{designation.created_at}</TableCell>
                            <TableCell>{designation.status}</TableCell>
                            <TableCell className="flex items-center gap-2">

                                <Button size="icon" variant="outline" className="hover:text-Primary" onClick={() => handleEditDesignation(designation)}>
                                <PencilIcon />
                                </Button>

                                <Button size="icon" variant="outline" className="hover:text-Error" disabled={deletingDesignationId === designation.id} onClick={() => handleClick(designation.id)}><Trash2 /></Button>

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

            
            {editDialog && (
                <EditDesignation
                    designation={selectedDesignation}
                    editDialog={editDialog}
                    setEditDialog={setEditDialog}
                    refetch={refetch}
                />
            )}

        </div>
    );
};

export default DesignationList;
