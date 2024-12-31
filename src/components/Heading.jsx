import React from "react";
import { useRouter } from "next/router"; // Next.js routing
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

const Heading = ({ title = "provide title", amount = "" }) => {
  const router = useRouter();
  const role = router?.query?.assesment; // Extract `role` from query params
  console.log(router.query.assesment)

  return (
    <div className="flex gap-3 items-center px-6 py-2 bg-Primary_Text text-White xl:rounded-t-sm">
      {role ? (
        <Button
          variant="outline"
          size="icon"
          className="rounded-sm border hover:bg-White bg-White text-Primary_Text"
          onClick={() => router.back()} // Navigate back in Next.js
        >
          <ArrowLeft strokeWidth={5} size={48} />
        </Button>
      ) : null}
      <div className="flex items-center flex-wrap gap-2">
        <p
          className={`text-base md:text-lg lg:text-2xl font-bold ${
            role && "text-Secondary_Text"
          }`}
        >
          {title}
        </p>
        {amount === "" ? null : amount > 0 ? (
          <span className="bg-White p-2 rounded-lg text-TEXT_P font-bold">
            {amount}
          </span>
        ) : (
          <Button
            variant="outline"
            size="icon"
            className="rounded-sm border hover:bg-White bg-White text-Primary_Text"
          >
            {amount}
          </Button>
        )}
        {role ? (
          <p className="text-base md:text-lg lg:text-2xl font-semibold">
            {role}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default Heading;
