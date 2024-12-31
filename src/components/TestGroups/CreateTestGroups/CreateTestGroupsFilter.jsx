import { DatePickerDemo } from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";

const CreateTestGroupsFilter = () => {
  const [selected, setSelected] = useState("min");

  return (
    <>
      <div className="py-4 md:py-10 px-5 bg-White rounded-b-sm font-OpenSans">
        <div className="flex flex-wrap justify-between items-center w-full gap-2">
          <div className="flex flex-wrap justify-start gap-2 md:gap-5">

            <div>
              <label className="block text-sm font-medium mb-2">
                Test Name
              </label>
              <Input placeholder="Name" className="p-4 md:w-80 rounded-sm" />
            </div>

            <div className="flex flex-col justify-center">
              <label className="">End Date</label>
              <DatePickerDemo buttonClassName="text-sm w-40 items-center border px-3 py-2 rounded-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Total Time
              </label>
              <div className="relative">
                <Input
                  placeholder={selected === "min" ? "Minutes" : "Hours"}
                  className="p-2 md:p-4 w-full text-xs md:text-sm md:w-80 rounded-sm "
                />
                <Select
                  defaultValue="min"
                  onValueChange={(value) => setSelected(value)}
                >
                  <SelectTrigger className=" border border-black  flex gap-1 absolute !h-7 w-auto top-1 right-1 !text-xs ">
                    <SelectValue
                      placeholder={selected === "min" ? "Min" : "Hrs"}
                      className="!text-xs"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className="!text-xs" value="min">
                      Min
                    </SelectItem>
                    <SelectItem className="!text-xs" value="hrs">
                      Hrs
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            className="text-Error border border-Error px-6 py-3 rounded-sm hover:bg-Error hover:text-White"
          >
            Discard
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateTestGroupsFilter;
