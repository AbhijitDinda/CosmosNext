import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import Pagination from "../Pagination"; // Adjust path based on your setup
import { Button } from "../ui/button";
import { PencilIcon, Trash2 } from "lucide-react";
import EditAdmin from "./EditAdmin";
import ConfirmationDialog from "./ConfirmationDialog.jsx"; // New confirmation component

const AdminList = ({data = [], totalPages, currentPage, onPageChange, handleDeleteAdmin, refetch}) => {
    console.log("data", data);
    const [deletingAdminId, setDeletingAdminId] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [adminToDelete, setAdminToDelete] = useState(null);

    const handleDeleteClick = (adminId) => {
        setAdminToDelete(adminId);
        setIsConfirmOpen(true);
    };

    const confirmDelete = async () => {
        setIsConfirmOpen(false);
        setDeletingAdminId(adminToDelete);
        try {
            await handleDeleteAdmin(adminToDelete);
        } catch (error) {
            console.error("Error deleting admin:", error);
        } finally {
            setDeletingAdminId(null);
            setAdminToDelete(null);
        }
    };

    const [editDialog, setEditDialog] = useState(false);
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
                                <Button size="icon" variant="outline" className="hover:text-Primary" onClick={() => handleEditAdmin(admin)}>
                                    <PencilIcon />
                                </Button>
                                <Button size="icon" variant="outline" className="hover:text-Error" disabled={deletingAdminId === admin.id} onClick={() => handleDeleteClick(admin.id)}>
                                    <Trash2 />
                                </Button>
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

            {/* Confirmation Dialog */}
            <ConfirmationDialog
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Admin"
                message="Are you sure you want to delete this admin? This action cannot be undone."
            />
        </div>
    );
};

export default AdminList;
