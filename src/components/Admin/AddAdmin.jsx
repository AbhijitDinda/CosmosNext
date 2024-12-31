import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const AddAdmin = () => {
    return (
        <div>

            <form className="space-y-4">
                <div className="space-y-2">
                    <Label className="block text-sm font-medium">Organization Name</Label>
                    <Input
                        type="text"
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Enter organization name"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="block text-sm font-medium">User Name</Label>
                    <Input
                        type="text"
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Enter user name"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="block text-sm font-medium">User ID / Email ID</Label>
                    <Input
                        type="email"
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Enter email ID"
                    />
                </div>
                <p className="text-sm text-gray-500">
                    Note: Password will be generated automatically and sent over email.
                </p>
                <Button type="submit" variant="outline" className="rounded-sm bg-Primary text-white border-transparent hover:border hover:border-Primary hover:text-Primary hover:bg-white">Submit</Button>
            </form>
        </div>
    );
};

export default AddAdmin;
