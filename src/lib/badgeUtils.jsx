import { Badge } from "@/components/ui/badge";

export const StatusBadge = ({ status }) => {
  let statusClasses = "";
  switch (status) {
    case "Invited":
      statusClasses =
        "bg-Label_Background hover:bg-Label_Background  text-label";
      break;
    case "Not Started":
      statusClasses =
        "bg-Label_Background hover:bg-Label_Background  text-label";
      break;
    case "Ongoing":
      statusClasses = "bg-Third/15 text-Third hover:bg-Third/15";
      break;
    case "Completed":
      statusClasses = "bg-Secondary/15 text-Secondary hover:bg-Secondary/15";
      break;
    default:
      statusClasses = "bg-gray-100 text-gray-600 hover:bg-gray-200/15";
  }

  return (
    <Badge
      className={`px-3 py-1 text-sm rounded-sm flex justify-center w-28 font-medium ${statusClasses}`}
    >
      {status}
    </Badge>
  );
};
