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
import { useEditDesignation } from "@/hooks/apis/designation/useEditDesignation";
import { useToast } from "@/hooks/use-toast"


const EditDesignation = ({ designation, editDialog, setEditDialog,refetch }) => {
    const { toast } = useToast()

    const { isPending,isSuccess,error,EditDesignationMutation } = useEditDesignation();

    const handleClose = () => {
        setEditDialog(false); // Close the dialog
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            designation_id: designation?.id,
            designation_name: event.target.designation_name.value,
        };

        try {
            await EditDesignationMutation(formData); // Call the mutation function
            setEditDialog(false); // Close the dialog after successful update
            toast({
                title: "Designation updated Successfully",
                status: "success",
              }); 
            refetch();
        } catch (err) {
            toast({
                title: "Designation updated Failed",
                status: "success",
                variant: "destructive",
              }); 
            console.error("Failed to update Designation:", err);
        }
    };

    return (
        <Dialog open={editDialog} onOpenChange={setEditDialog}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Edit Designation</DialogTitle>
                    <DialogClose onClick={handleClose} />
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <Label htmlFor="organization_name" className="block text-sm font-medium">
                        Designation Name
                        </Label>
                        <Input
                            id="designation_name"
                            name="designation_name"
                            type="text"
                            defaultValue={designation?.designation_name || ""}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                            placeholder="Enter organization name"
                            required
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
                            {error?.response?.data?.message || "Failed to update Designation."}
                        </p>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditDesignation;
