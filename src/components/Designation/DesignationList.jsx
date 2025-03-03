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
import { Button } from "@/components/ui/button";
import { PencilIcon, Trash2 } from "lucide-react";
import EditDesignation from "./EditDesignation";
import ConfirmationDialog from "./ConfirmationDialog";

const DesignationList = ({ data = [], totalPages, currentPage, onPageChange, handleDeleteDesignation, refetch }) => {
    const [deletingDesignationId, setDeletingDesignationId] = useState(null);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [designationToDelete, setDesignationToDelete] = useState(null);

    const handleDeleteClick = (designationId) => {
        setDesignationToDelete(designationId);
        setConfirmDialogOpen(true);
    };

    const confirmDelete = async () => {
        setDeletingDesignationId(designationToDelete);
        setConfirmDialogOpen(false);
        try {
            await handleDeleteDesignation(designationToDelete);
            console.log("Designation deleted successfully:", designationToDelete);
            refetch();
        } catch (error) {
            console.error("Error deleting designation:", error);
        } finally {
            setDeletingDesignationId(null);
        }
    };

    const [editDialog, setEditDialog] = useState(false);
    const [selectedDesignation, setSelectedDesignation] = useState(null);

    const handleEditDesignation = (designation) => {
        setSelectedDesignation(designation);
        setEditDialog(true);
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
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="hover:text-Error"
                                    disabled={deletingDesignationId === designation.id}
                                    onClick={() => handleDeleteClick(designation.id)}
                                >
                                    <Trash2 />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            
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

            <ConfirmationDialog
                isOpen={confirmDialogOpen}
                onClose={() => setConfirmDialogOpen(false)}
                onConfirm={confirmDelete}
                title="Confirm Deletion"
                message="Are you sure you want to delete this designation? This action cannot be undone."
            />
        </div>
    );
};

export default DesignationList;
