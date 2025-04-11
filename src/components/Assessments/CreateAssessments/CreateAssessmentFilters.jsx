import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CreateAssessmentFilters = ({ designations, formData, onTabChange, onFieldChange }) => {
  const { type, singleCandidate, multiCandidate } = formData;

  return (
    <div className="py-5 md:py-8 lg:py-10 px-2 lg:px-5 bg-White rounded-b-sm font-OpenSans flex flex-wrap justify-between items-center w-full gap-2 mb-2">
      <Tabs value={type} onValueChange={onTabChange} className="w-full">
        <TabsList className="!h-auto bg-white justify-start gap-1 flex flex-wrap">
          <TabsTrigger value="singleCandidate" className="border border-Secondary_Text data-[state=active]:bg-Primary data-[state=active]:text-white focus-within:border-Primary rounded-none">
            Single Candidate
          </TabsTrigger>
          <TabsTrigger value="multiCandidate" className="border border-Secondary_Text data-[state=active]:bg-Primary data-[state=active]:text-white focus-within:border-Primary rounded-none">
            Multiple Candidates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="singleCandidate">
          <div className="flex flex-wrap justify-start gap-2">
            <div className="flex flex-col">
              <label>Candidate Name</label>
              <Input value={singleCandidate.candidate_name} onChange={(e) => onFieldChange("candidate_name", e.target.value)} className="p-4 rounded-sm" placeholder="Name" />
            </div>
            <div className="flex flex-col">
              <label>Email ID</label>
              <Input value={singleCandidate.email_id} onChange={(e) => onFieldChange("email_id", e.target.value)} className="p-4 rounded-sm" placeholder="Email" />
            </div>
            <div className="flex flex-col">
              <label>Designation</label>
              <Select onValueChange={(value) => onFieldChange("designation", value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Designation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Designation</SelectLabel>
                    {designations.map((designation) => (
                      <SelectItem key={designation.id} value={designation.designation_name}>
                        {designation.designation_name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="multiCandidate">
          <div className="flex flex-col">
            <label>Designation</label>
            <Select onValueChange={(value) => onFieldChange("designation", value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Designation" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Designation</SelectLabel>
                  {designations.map((designation) => (
                    <SelectItem key={designation.id} value={designation.slug}>
                      {designation.designation_name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>
      </Tabs>

      
    </div>
  );
};

export default CreateAssessmentFilters;
