import React, { useState } from "react";
import Heading from "@/components/Heading";
import AdminList from "../../components/Admin/AdminList";
import AddAdmin from "../../components/Admin/AddAdmin";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllAdminList } from "@/hooks/apis/admin-list/useAllAdminList";
import { useAddAdmin } from "@/hooks/apis/admin-list/useAddAdmin";
import { useDeleteAdmin } from "@/hooks/apis/admin-list/useDeleteAdmin";
import { useToast } from "@/hooks/use-toast"

const AdminPage = () => {

    const [page, setPage] = useState(1);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { toast } = useToast()


    // Form state moved to AdminPage
    const [formData, setFormData] = useState({
        organization_name: "",
        name: "",
        user_id: "",
        account_status: "1", // Default value
    });

    const { isFetching, isLoading, adminData } = useAllAdminList(page);

    const { isPending, error, addAdminMutation } = useAddAdmin();
    const { isPending: deleteAdminPending, isSuccess: deleteAdminSuccess, error: deleteAdminError, deleteAdminMutation } = useDeleteAdmin();
  

    const handlePageChange = (page) => {
        setPage(page);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddAdminSubmit = async (e) => {
        e.preventDefault();
        try {
            await addAdminMutation(formData);
            setIsDialogOpen(false); // Close dialog after success
            setFormData({
                organization_name: "",
                name: "",
                user_id: "",
                account_status: "1",
            });
            toast({
                title: "Admin Added Successfully",
                description: "No des",
                status: "success",
              }); 
            handlePageChange(page);
        } catch (error) {
            toast({
                title: "Something went wrong",
                description: "No des",
                status: "error",
              }); 
            // setFormData({...formData,user_id:""})
            console.log("Failed to add admin:", error);
        }
    };

    const handleDeleteAdmin = async (e) =>{
        try {
            await deleteAdminMutation(e);
            toast({
                title: "Admin Deleted Successfully",
                description: "No des",
                status: "success",
              });

        } catch (error) {
            toast({
                title: "Something went wrong",
                description: "No des",
                status: "error",
              }); 
            
        }
    }

    return (
        <section className="mx-auto rounded-sm w-full max-w-screen-xl">
            <Heading title="Admin Accounts" />
            <div className="p-4 bg-White rounded-sm">
                {/* Add Admin Button with Dialog */}
                <div className="ml-auto flex items-center justify-end mb-4">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                variant="outline"
                                className="rounded-sm bg-Primary text-white border-transparent hover:border hover:border-Primary hover:text-Primary hover:bg-white"
                            >
                                Add Admin
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg">
                            <DialogHeader>
                                <DialogTitle>Add Admin</DialogTitle>
                                <DialogClose />
                            </DialogHeader>
                            {/* Pass formData, setFormData, and handlers to AddAdmin */}
                            <AddAdmin
                                formData={formData}
                                onInputChange={handleInputChange}
                                onSubmit={handleAddAdminSubmit}
                                isPending={isPending}
                                error={error}
                            />
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Admin List */}
                {isFetching || isLoading ? (
                    <div className="flex items-center space-x-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                    </div>
                ) : adminData && adminData?.data?.data?.data.length > 0 ? (
                    <AdminList
                        data={adminData?.data?.data?.data}
                        totalPages={adminData?.data?.data?.last_page}
                        currentPage={adminData?.data?.data?.current_page}
                        onPageChange={handlePageChange}
                        handleDeleteAdmin={handleDeleteAdmin}
                    />
                ) : (
                    <div className="text-center text-gray-500 p-4">
                        <p>No Admin found matching the criteria.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AdminPage;
