import Heading from "@/components/Heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useGetAssessmentById } from "@/hooks/apis/test-group/useGetAssessmentById";
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useAddQuestion } from "@/hooks/apis/test-group/team-inventory/useAddQuestion";
import { useAddSubQuestion } from "@/hooks/apis/test-group/team-inventory/useAddSubQuestion";
import { useAddTraits } from "@/hooks/apis/test-group/team-inventory/useAddTraits";

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
    const { isPending, addQuestionTeamInventoryMutation } = useAddQuestion();

    //hit when in module_type Sub Question's and Add Sub Question
    const { isPending: addSubQuestionTeamInventoryisPending, addSubQuestionTeamInventoryMutation } = useAddSubQuestion();


    //hit when in module_type Traits and Add Traits
    const { isPending: addTraitsTeamInventoryisPending, addTraitsMutation } = useAddTraits()

    const [questionData, setQuestionData] = useState({
        question: "",
        status: "1",
        order_id: "",
    });

    const [subQuestionData, setSubQuestionData] = useState({
        "question_id": "",
        "question_name": "",
        "traits_category": "",
        "display": "1",
        // "order_id": "" 
    });

    const [traitsData, setTraitsData] = useState({
        "trait_name": "",
        "trait_code": "",
        "key_traits": "",
        "description": "",
        "strengths": "",
        "weakness": "",
        "opportunities": "",
        "threats": "",
        "display": "1"
    });

    const handleInputChange = (e) => {
        console.log("click 1")

        setQuestionData({ ...questionData, [e.target.name]: e.target.value });
    };

    const handleSubQuestionInputChange = (e) => {
        console.log("click 2")
        setSubQuestionData({ ...subQuestionData, [e.target.name]: e.target.value });
    };

    const handleTraitsInputChange = (e) => {
        console.log("click 3")
        setTraitsData({ ...traitsData, [e.target.name]: e.target.value });
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

        } else if (activeModule === "Sub Questions") {
            try {
                await addSubQuestionTeamInventoryMutation(subQuestionData);
                setIsDialogOpen(false); // Close the dialog after successful submission
                setSubQuestionData({ "question_id": "", "question_name": "", "traits_category": "", "display": "1" }); // Reset form fields
            } catch (error) {
                console.error("Sub question Submission failed:", error);
            }
        } else if (activeModule === "Traits") {
            try {
                await addTraitsMutation(traitsData);
                setIsDialogOpen(false); // Close the dialog after successful submission
                setTraitsData({ "trait_name": "", "trait_code": "", "key_traits": "", "description": "", "strengths": "", "weakness": "", "opportunities": "", "threats": "", "display": "1" }); // Reset form fields
            } catch (error) {
                console.error("Traits Submission failed:", error);
            }

        }
    };
    // console.log("This is list of Question where id and question_name are there",assessmentByIdData?.data?.modules_data[2].module_data.data);
    // console.log("This is list of Traits where id and trait_name are there",assessmentByIdData?.data?.modules_data[0].module_data.data);

    const questionsList = assessmentByIdData?.data?.modules_data[2]?.module_data?.data || [];
    const traitsList = assessmentByIdData?.data?.modules_data[0]?.module_data?.data || [];
    console.log(questionsList, traitsList);


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
                                            <Input name="trait_name" value={traitsData.trait_name} onChange={handleTraitsInputChange} placeholder="Enter Trait Name" />

                                            <Input name="trait_code" value={traitsData.trait_code} onChange={handleTraitsInputChange} placeholder="Enter Trait Code" />

                                            <Input name="key_traits" value={traitsData.key_traits} onChange={handleTraitsInputChange} placeholder="Enter Key Traits" />

                                            <Input name="description" value={traitsData.description} onChange={handleTraitsInputChange} placeholder="Enter Description" />

                                            <Input name="strengths" value={traitsData.strengths} onChange={handleTraitsInputChange} placeholder="Enter Strengths" />

                                            <Input name="weakness" value={traitsData.weakness} onChange={handleTraitsInputChange} placeholder="Enter Weakness" />

                                            <Input name="opportunities" value={traitsData.opportunities} onChange={handleTraitsInputChange} placeholder="Enter Opportunities" />

                                            <Input name="threats" value={traitsData.threats} onChange={handleTraitsInputChange} placeholder="Enter Threats" />

                                            <Input name="display" value={traitsData.display} onChange={handleTraitsInputChange} placeholder="Display (1 or 0)" />
                                        </>
                                    )}
                                    {activeModule === "Sub Questions" && (
                                        <>
                                            {/* Dropdown for Questions */}
                                            <Select
                                                value={subQuestionData.question_id ? subQuestionData.question_id.toString() : questionsList.length > 0 ? questionsList[0].id.toString() : ""}
                                                onValueChange={(value) =>
                                                    setSubQuestionData((prev) => ({ ...prev, question_id: value }))
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue>
                                                        {questionsList.find((q) => q.id.toString() === subQuestionData.question_id)?.question_name || (questionsList.length > 0 ? questionsList[0].question_name : "Select Question")}
                                                    </SelectValue>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {questionsList.length === 0 ? (
                                                        <SelectItem disabled>No Questions Found</SelectItem>
                                                    ) : (
                                                        questionsList.map((question) => (
                                                            <SelectItem key={question.id} value={question.id.toString()}>
                                                                {question.question_name}
                                                            </SelectItem>
                                                        ))
                                                    )}
                                                </SelectContent>
                                            </Select>



                                            <Input
                                                name="question_name"
                                                value={subQuestionData.question_name}
                                                onChange={handleSubQuestionInputChange}
                                                placeholder="Enter Question Name"
                                            />

                                            {/* Dropdown for Traits */}
                                            <Select
                                                value={subQuestionData.traits_category ? subQuestionData.traits_category.toString() : traitsList.length > 0 ? traitsList[0].id.toString() : ""}
                                                onValueChange={(value) =>
                                                    setSubQuestionData((prev) => ({ ...prev, traits_category: value }))
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue>
                                                        {traitsList.find((t) => t.id.toString() === subQuestionData.traits_category)?.trait_name || (traitsList.length > 0 ? traitsList[0].trait_name : "Select Traits Category")}
                                                    </SelectValue>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {traitsList.length === 0 ? (
                                                        <SelectItem disabled>No Traits Found</SelectItem>
                                                    ) : (
                                                        traitsList.map((trait) => (
                                                            <SelectItem key={trait.id} value={trait.id.toString()}>
                                                                {trait.trait_name}
                                                            </SelectItem>
                                                        ))
                                                    )}
                                                </SelectContent>
                                            </Select>



                                            <Input
                                                name="display"
                                                value={subQuestionData.display}
                                                onChange={handleSubQuestionInputChange}
                                                placeholder="Display (1 or 0)"
                                            />
                                        </>
                                    )}
                                    {activeModule === "Questions" && (
                                        <>
                                            <Input
                                                name="question"
                                                value={questionData.question} onChange={handleInputChange}
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
