import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEditAdmin } from "@/hooks/apis/admin-list/useEditAdmin";
import { useToast } from "@/hooks/use-toast"


const EditAdmin = ({ admin, editDialog, setEditDialog,refetch }) => {
    console.log("admin",admin?.id)
    const { toast } = useToast()

    const { isPending,isSuccess,error,EditAdminMutation } = useEditAdmin();

    const handleClose = () => {
        setEditDialog(false); // Close the dialog
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            admin_id: admin?.id, // Ensure the admin ID is passed for updating
            organization_name: event.target.organization_name.value,
            name: event.target.name.value,
            // email: event.target.user_id.value,
            "account_status": "1"
        };

        try {
            await EditAdminMutation(formData); // Call the mutation function
            setEditDialog(false); // Close the dialog after successful update
            toast({
                title: "Admin updated Successfully",
                status: "success",
              }); 
            refetch();
        } catch (err) {
            toast({
                title: "Admin updated Failed",
                status: "success",
                variant: "destructive",
              }); 
            console.error("Failed to update admin:", err);
        }
    };

    return (
        <Dialog open={editDialog} onOpenChange={setEditDialog}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Edit Admin</DialogTitle>
                    <DialogClose onClick={handleClose} />
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <Label htmlFor="organization_name" className="block text-sm font-medium">
                            Organization Name
                        </Label>
                        <Input
                            id="organization_name"
                            name="organization_name"
                            type="text"
                            defaultValue={admin?.organization_name || ""}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                            placeholder="Enter organization name"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="name" className="block text-sm font-medium">
                            User Name
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            defaultValue={admin?.name || ""}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                            placeholder="Enter user name"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="user_id" className="block text-sm font-medium">
                            User ID / Email ID
                        </Label>
                        <Input
                            id="user_id"
                            name="user_id"
                            type="email"
                            defaultValue={admin?.email || ""}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                            placeholder="Enter email ID"
                            required
                            disabled={true}
                        />
                    </div>
                    <Button
                        type="submit"
                        variant="outline"
                        className="rounded-sm bg-Primary text-white border-transparent hover:border hover:border-Primary hover:text-Primary hover:bg-white"
                        disabled={isPending}
                    >
                        {isPending ? "Updating..." : "Update"}
                    </Button>
                    {error && (
                        <p className="text-sm text-red-500 mt-2">
                            {error?.response?.data?.message || "Failed to update admin."}
                        </p>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditAdmin;
