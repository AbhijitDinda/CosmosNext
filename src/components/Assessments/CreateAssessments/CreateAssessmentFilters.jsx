import { DatePickerDemo } from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CreateAssessmentFilters = ({ designations = [] }) => {
  console.log(designations);

  return (
    <div className="py-5 md:py-8 lg:py-10 px-2 lg:px-5 bg-White rounded-b-sm font-OpenSans flex flex-wrap justify-between items-center w-full gap-2 mb-2">
      <div>
        <Tabs defaultValue="singleCandidate" className="w-full">
          <TabsList className="!h-auto bg-white justify-start gap-1 flex flex-wrap">
            <TabsTrigger
              value="singleCandidate"
              className="border border-Secondary_Text data-[state=active]:bg-Primary data-[state=active]:text-white focus-within:border-Primary rounded-none"
            >
              Single Candidate
            </TabsTrigger>

            <TabsTrigger
              value="multiCandidate"
              className="border border-Secondary_Text data-[state=active]:bg-Primary data-[state=active]:text-white focus-within:border-Primary rounded-none"
            >
              Multiple Candidates
            </TabsTrigger>
          </TabsList>

          <TabsContent value="singleCandidate">
            <div className="flex flex-wrap justify-start gap-2">
              <div className="text-nowrap">
                <label className="text-nowrap">Candidate Name</label>
                <Input placeholder="Name" className="p-4 rounded-sm" />
              </div>
              <div className="flex flex-col justify-center">
                <label className="text-nowrap">Email Id</label>
                <Input placeholder="Email" className="p-4 rounded-sm" />
              </div>
              <div className="flex flex-col justify-center">
                <label htmlFor="" className="text-nowrap">
                  Designation
                </label>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Designation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Designation</SelectLabel>
                      {designations.map((designation) => (
                        <SelectItem
                          key={designation.id}
                          value={designation.slug}
                        >
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
            <div className="flex flex-col justify-center">
              <label htmlFor="" className="text-nowrap">
                Designation
              </label>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Designation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Designation</SelectLabel>
                    {designations.map((designation) => (
                      <SelectItem
                        key={designation.id}
                        value={designation.slug}
                      >
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
      <Button
        variant="outline"
        className="text-Error border border-Error px-6 py-3 rounded-sm hover:bg-Error hover:text-White"
      >
        Discard
      </Button>
    </div>
  );
};

export default CreateAssessmentFilters;
