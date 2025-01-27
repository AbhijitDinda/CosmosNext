import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const AddDesignation = ({ formData, onInputChange, onSubmit, isPending, error }) => {
    return (
        <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
                <Label htmlFor="organization_name" className="block text-sm font-medium">
                Designation Name
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
                Organization Name
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
            
            
            <Button
                type="submit"
                variant="outline"
                className="rounded-sm bg-Primary text-white border-transparent hover:border hover:border-Primary hover:text-Primary hover:bg-white"
                disabled={isPending}
            >
                {isPending ? "Submitting..." : "Submit"}
            </Button>
            {error && (
                <p className="text-sm text-red-500 mt-2">{error?.response?.data?.message}</p>
            )}
        </form>
    );
};

export default AddDesignation;
