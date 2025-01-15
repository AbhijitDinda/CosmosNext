import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const AddAdmin = ({ formData, onInputChange, onSubmit, isPending, error }) => {
    return (
        <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
                <Label htmlFor="organization_name" className="block text-sm font-medium">
                    Organization Name
                </Label>
                <Input
                    id="organization_name"
                    name="organization_name"
                    type="text"
                    value={formData.organization_name}
                    onChange={onInputChange}
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
                    value={formData.name}
                    onChange={onInputChange}
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
                    value={formData.user_id}
                    onChange={onInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Enter email ID"
                    required
                />
            </div>
            <p className="text-sm text-gray-500">
                Note: Password will be generated automatically and sent over email.
            </p>
            <Button
                type="submit"
                variant="outline"
                className="rounded-sm bg-Primary text-white border-transparent hover:border hover:border-Primary hover:text-Primary hover:bg-white"
                disabled={isPending}
            >
                {isPending ? "Submitting..." : "Submit"}
            </Button>
            {error && (
                <p className="text-sm text-red-500 mt-2">Failed to add admin. Please try again.</p>
            )}
        </form>
    );
};

export default AddAdmin;
