import React, { useState, useEffect } from "react";
import Heading from "@/components/Heading";
import AdminList from "../../components/Admin/AdminList";
import AddAdmin from "../../components/Admin/AddAdmin";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { useAllAdminList } from "@/hooks/apis/admin-list/useAllAdminList";
import { Skeleton } from "@/components/ui/skeleton";



const allAdminData = [
    { id: 1, organization: "Runtime Solutions", userName: "Anirban Chatterjee", email: "anirban@runtime-solutions.com", testsCreated: 0 },
    { id: 2, organization: "DevCorp", userName: "John Doe", email: "john.doe@devcorp.com", testsCreated: 5 },
    { id: 3, organization: "CodeBase", userName: "Jane Smith", email: "jane.smith@codebase.com", testsCreated: 10 },
    { id: 4, organization: "TechHive", userName: "Robert Brown", email: "robert.brown@techhive.com", testsCreated: 3 },
    { id: 5, organization: "InnovateNow", userName: "Emily Johnson", email: "emily.johnson@innnow.com", testsCreated: 7 },
    { id: 6, organization: "CloudSys", userName: "David Lee", email: "david.lee@cloudsys.com", testsCreated: 2 },
    { id: 7, organization: "CloudSys", userName: "David Lee", email: "david.lee@cloudsys.com", testsCreated: 2 },
    { id: 8, organization: "CloudSys", userName: "David Lee", email: "david.lee@cloudsys.com", testsCreated: 2 },
    { id: 9, organization: "CloudSys", userName: "David Lee", email: "david.lee@cloudsys.com", testsCreated: 2 },
    { id: 10, organization: "CloudSys", userName: "David Lee", email: "david.lee@cloudsys.com", testsCreated: 2 },
    { id: 11, organization: "CloudSys", userName: "David Lee", email: "david.lee@cloudsys.com", testsCreated: 2 },
    { id: 12, organization: "CloudSys", userName: "David Lee", email: "david.lee@cloudsys.com", testsCreated: 2 },
    { id: 13, organization: "CloudSys", userName: "David Lee", email: "david.lee@cloudsys.com", testsCreated: 2 },
    // Add more data as required
];

const AdminPage = () => {
    const itemsPerPage = 5; // Number of items per page

    const [page, setPage] = useState(1);
    console.log("page", page)



    const {
        isFetching,
        isLoading,
        adminData,
    } = useAllAdminList(page);

    console.log("assessmentsData", adminData?.data?.data?.last_page);
    //   console.log("assessmentsData",adminData?.data?.data?.data);

    // Handle pagination (passed to AssessmentsTable)
    const handlePageChange = (page) => {
        setPage(page);
    };




    return (
        <section className="mx-auto rounded-sm w-full max-w-screen-xl">
            <Heading title="Admin Accounts" />
            <div className="p-4 bg-White rounded-sm">
                {/* Add Admin Button with Dialog */}
                <div className="ml-auto flex items-center justify-end mb-4">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="rounded-sm bg-Primary text-white border-transparent hover:border hover:border-Primary hover:text-Primary hover:bg-white">Add Admin</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg">
                            <DialogHeader>
                                <DialogTitle>Add Admin</DialogTitle>
                                <DialogClose />
                            </DialogHeader>
                            {/* AddAdmin Component */}
                            <AddAdmin />
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
                ) : adminData && adminData?.data?.data?.data.length > 0? (
                    <AdminList
                        data={adminData?.data?.data?.data}
                        totalPages={adminData?.data?.data?.last_page}
                        currentPage={adminData?.data?.data?.current_page}
                        onPageChange={handlePageChange}
                    />
                ):(
                <div className="text-center text-gray-500 p-4">
                    <p>No Admin found matching the criteria.</p>
                </div>
                )
                 }

            </div>
        </section>
    );
};

export default AdminPage;
