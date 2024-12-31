import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Plus, User, X } from "lucide-react";

const MAX_CANDIDATES = 5;

export default function AddCandidates() {
  const [candidates, setCandidates] = useState([
    { id: 1, name: "Jane Doe" },
    { id: 2, name: "John Smith" },
    { id: 3, name: "Emily Johnson" },
  ]);

  const [popoverOpenIndex, setPopoverOpenIndex] = useState(null); // Tracks which popover is open
  const [newCandidateName, setNewCandidateName] = useState("");

  const handleAddCandidate = () => {
    if (candidates.length < MAX_CANDIDATES && newCandidateName.trim()) {
      setCandidates([
        ...candidates,
        { id: Date.now(), name: newCandidateName },
      ]);
      setNewCandidateName(""); // Clear input
      // setIsDialogOpen(false); // Close dialog
    }
  };

  const handleRemoveCandidate = (id) => {
    setCandidates(candidates.filter((candidate) => candidate.id !== id));
  };

  return (
    <div className="p-4 space-y-4 font-OpenSans">
      <h2 className="text-lg font-semibold">
        Add candidates for comparison (Maximum {MAX_CANDIDATES})
      </h2>

        {/* Render Existing Candidates */}
      <div className="grid grid-cols-3 lg:grid-cols-7 gap-4">
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            className="relative border rounded-md md:p-4 flex flex-col items-center justify-center space-y-2 bg-white shadow-sm aspect-square"
          >
            <User className="text-Primary h-6 w-6" />
            <p className="text-xs md:text-sm font-medium text-Primary text-nowrap">
              {candidate.name}
            </p>
            <Button
              size="icon"
              variant="ghost"
              className="absolute -top-2 -right-2 h-6 w-6 bg-red-100 text-Error"
              onClick={() => handleRemoveCandidate(candidate.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}

        {/* Render Empty Slots */}
        {Array.from({ length: MAX_CANDIDATES - candidates.length }).map(
          (_, index) => (
            <Popover
              key={index}
              open={popoverOpenIndex === index}
              onOpenChange={(isOpen) =>
                setPopoverOpenIndex(isOpen ? index : null)
              }
            >
              <PopoverTrigger asChild>
                <div className="border rounded-md p-4 flex items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100">
                  <Plus className="h-6 w-6 text-gray-500" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="">
                <h2 className="text-md font-medium mb-4">Add Candidate</h2>
                <div className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Enter candidate name"
                    value={newCandidateName}
                    onChange={(e) => setNewCandidateName(e.target.value)}
                  />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    variant="secondary"
                    onClick={() => setPopoverOpenIndex(null)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddCandidate}>Add</Button>
                </div>
              </PopoverContent>
            </Popover>
          )
        )}
      </div>
    </div>
  );
}
