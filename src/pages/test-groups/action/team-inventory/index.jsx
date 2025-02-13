import Heading from "@/components/Heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useGetAssessmentById } from "@/hooks/apis/test-group/useGetAssessmentById";
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAddQuestion } from "@/hooks/apis/test-group/team-inventory/useAddQuestion";

const Table = ({ moduleType, moduleData }) => {
    let columns = [];
    if (moduleType === "Traits") {
        columns = ["ID", "Name", "Action"];
    } else if (moduleType === "Sub Questions") {
        columns = ["ID", "Question", "Sub Question", "Traits Category", "Action"];
    } else if (moduleType === "Questions") {
        columns = ["ID", "Question", "Action"];
    }

    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full border">
                <thead>
                    <tr className="bg-gray-100 text-nowrap">
                        {columns.map((col, idx) => (
                            <th key={idx} className="border border-gray-300 px-4 py-2 text-left">
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {moduleData?.data?.map((item) => (
                        <tr key={item.id}>
                            <td className="border border-gray-300 px-4 py-2 text-nowrap">{item.id}</td>
                            {moduleType === "Traits" && (
                                <td className="border border-gray-300 px-4 py-2 text-nowrap">{item.trait_name}</td>
                            )}
                            {moduleType === "Sub Questions" && (
                                <>
                                    <td className="border border-gray-300 px-4 py-2 text-nowrap truncate max-w-[300px] overflow-hidden whitespace-nowrap">{item.question_name}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-nowrap truncate max-w-[200px] overflow-hidden whitespace-nowrap">{item.main_question}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-nowrap">{item.traits_category}</td>
                                </>
                            )}
                            {moduleType === "Questions" && (
                                <td className="border border-gray-300 px-4 py-2 text-nowrap">{item.question_name}</td>
                            )}
                            <td className="border border-gray-300 px-4 py-2 text-nowrap">
                                <Button size="sm" variant="outline" className="rounded-sm mr-2">
                                    <PencilIcon className="stroke-Third" />
                                </Button>
                                <Button size="sm" variant="outline" className="rounded-sm">
                                    <TrashIcon className="stroke-Error" />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const TestGroupAction = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const assessmentId = 1;
    const shouldFetch = Boolean(assessmentId);

    const { isLoading, error, assessmentByIdData } = useGetAssessmentById(assessmentId, shouldFetch);

    const [activeModule, setActiveModule] = useState(assessmentByIdData?.data?.modules_data[0]?.module_type || "question");

    const getAddButtonText = (moduleType) => {
        switch (moduleType) {
            case "Traits":
                return "Add Trait";
            case "Sub Questions":
                return "Add Sub Question";
            case "Questions":
                return "Add Question";
            default:
                return "Add";
        }
    };


        //hit when in module_type Question's and Add Question
        const {isPending, addQuestionTeamInventoryMutation} = useAddQuestion();

        //hit when in module_type Sub Question's and Add Sub Question
    
        //hit when in module_type Traits and Add Traits

    const [questionData, setQuestionData] = useState({
        question: "",
        status: "1",
        order_id: "",
    });

    const handleInputChange = (e) => {
        setQuestionData({ ...questionData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (activeModule === "Questions") {
            try {
                await addQuestionTeamInventoryMutation(questionData);
                setIsDialogOpen(false); // Close the dialog after successful submission
                setQuestionData({ question: "", status: "1", order_id: "1" }); // Reset form fields
            } catch (error) {
                console.error("Submission failed:", error);
            }
        }
    };

    

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;

    return (
        <div className="rounded-sm mx-auto w-full max-w-[1300px]">
            <Heading title="Test Options" />
            <div className="p-4 bg-White rounded-sm">
                <Tabs defaultValue={activeModule} className="w-full" onValueChange={setActiveModule}>
                    <div className="flex justify-between">
                        <TabsList className="!h-auto bg-white justify-start gap-1 flex flex-wrap">
                            {assessmentByIdData?.data?.modules_data.map((module, index) => (
                                <TabsTrigger
                                    key={index}
                                    value={module.module_type}
                                    className="border capitalize border-Secondary_Text data-[state=active]:bg-Primary data-[state=active]:text-white focus-within:border-Primary rounded-none"
                                >
                                    {module.module_type}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-Primary text-white p-2 rounded-md">{getAddButtonText(activeModule)}</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>{getAddButtonText(activeModule)}</DialogTitle>
                                </DialogHeader>
                                <form className="space-y-4" onSubmit={handleSubmit}>
                                    {activeModule === "Traits" && (
                                        <>
                                            <Input placeholder="Enter Trait Name" />
                                            <Input placeholder="Enter Trait Code" />
                                            <Input placeholder="Enter Key Traits" />
                                            <Input placeholder="Enter Description" />
                                            <Input placeholder="Enter Strengths" />
                                            <Input placeholder="Enter Weakness" />
                                            <Input placeholder="Enter Opportunities" />
                                            <Input placeholder="Enter Threats" />
                                            <Input placeholder="Display (1 or 0)" />
                                        </>
                                    )}
                                    {activeModule === "Sub Questions" && (
                                        <>
                                            <Input placeholder="Enter Question ID" />
                                            <Input placeholder="Enter Question Name" />
                                            <Input placeholder="Enter Traits Category" />
                                            <Input placeholder="Display (1 or 0)" />
                                        </>
                                    )}
                                    {activeModule === "Questions" && (
                                        <>
                                            <Input
                                                name="question"
                                                value={questionData.question}
                                                onChange={handleInputChange}
                                                placeholder="Enter Question"
                                            />
                                            <Input
                                                name="status"
                                                value={questionData.status}
                                                onChange={handleInputChange}
                                                placeholder="Enter Status (1 or 0)"
                                            />
                                            <Input
                                                name="order_id"
                                                value={questionData.order_id}
                                                onChange={handleInputChange}
                                                placeholder="Enter Order ID"
                                            />
                                        </>
                                    )}
                                    <Button type="submit" className="bg-Primary text-white w-full">Submit</Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                    {assessmentByIdData?.data?.modules_data.map((module, index) => (
                        <TabsContent key={index} value={module.module_type}>
                            <Table moduleType={module.module_type} moduleData={module.module_data} />
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </div>
    );
};

export default TestGroupAction;
