import Heading from "@/components/Heading";
import dynamic from 'next/dynamic'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useGetAssessmentById } from "@/hooks/apis/test-group/useGetAssessmentById";
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAddQuestion } from "@/hooks/apis/test-group/team-inventory/useAddQuestion";
import { useAddSubQuestion } from "@/hooks/apis/test-group/team-inventory/useAddSubQuestion";
import { useAddTraits } from "@/hooks/apis/test-group/team-inventory/useAddTraits";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const questionSchema = z.object({
    question: z.string().min(1, { message: "Question is required" }),
    status: z.string().min(1, { message: "Status is required" }),
    order_id: z.number().min(1, { message: "Order ID is required" }),
});

const subQuestionSchema = z.object({
    question_id: z.string().min(1, { message: "Question ID is required" }),
    question_name: z.string().min(1, { message: "Question Name is required" }),
    traits_category: z.string().min(1, { message: "Traits Category is required" }),
    display: z.string().min(1, { message: "Display is required" }),
});

const traitsSchema = z.object({
    trait_name: z.string().min(1, { message: "Trait Name is required" }),
    trait_code: z.string().min(1, { message: "Trait Code is required" }),
    key_traits: z.string().min(1, { message: "Key Traits are required" }),
    description: z.string().min(1, { message: "Description is required" }),
    strengths: z.string().min(1, { message: "Strengths are required" }),
    weakness: z.string().min(1, { message: "Weakness is required" }),
    opportunities: z.string().min(1, { message: "Opportunities are required" }),
    threats: z.string().min(1, { message: "Threats are required" }),
    display: z.enum(["0", "1"], { message: "Display must be 0 or 1" }), // Ensures only "0" or "1" is allowed
});

const TableRow = ({ item, moduleType }) => {
    const [isEditDialogOpen, setEditIsDialogOpen] = useState(false);

    const assessmentId = 1;
    const shouldFetch = Boolean(assessmentId);
    const { isLoading, error, assessmentByIdData } = useGetAssessmentById(assessmentId, shouldFetch);

    const questionsList = assessmentByIdData?.data?.modules_data[2]?.module_data?.data || [];
    const traitsList = assessmentByIdData?.data?.modules_data[0]?.module_data?.data || [];
    // console.log("purba",questionsList, traitsList);

    const questionForm = useForm({
        resolver: zodResolver(questionSchema),
        defaultValues: {
            question: "",
            status: "",
            order_id: "",
        },
    });

    const subQuestionForm = useForm({
        resolver: zodResolver(subQuestionSchema),
        defaultValues: {
            question_name: "",
            traits_category: "",
            display: "1",
        },
    });

    const traitsForm = useForm({
        resolver: zodResolver(traitsSchema),
        defaultValues: {
            trait_name: "",
            trait_code: "",
            key_traits: "",
            description: "",
            strengths: "",
            weakness: "",
            opportunities: "",
            threats: "",
            display: "1",
        },
    });

    function onSubmit(values) {
        console.log(values);
    }

    const formMap = {
        Questions: questionForm,
        "Sub Questions": subQuestionForm,
        Traits: traitsForm,
    };

    const renderFormFields = (form) => {
        const fields = {
            Questions: (
            <>
                <FormField control={form.control} name="question" render={({ field }) => (
                <FormItem>
                    <FormLabel>Question</FormLabel>
                    <FormControl>
                    <Input {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )} />
                <FormField control={form.control} name="status" render={({ field }) => (
                <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                    <Input {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )} />
                <FormField control={form.control} name="order_id" render={({ field }) => (
                <FormItem>
                    <FormLabel>Order ID</FormLabel>
                    <FormControl>
                    <Input {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )} />
            </>
            ),
            "Sub Questions": (
            <>
                <FormField control={form.control} name="question_name" render={({ field }) => (
                <FormItem>
                    <FormLabel>Question Name</FormLabel>
                    <FormControl>
                    <Input {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )} />
                
                <FormField control={form.control} name="question_id" render={({ field }) => (
                <FormItem>
                    <FormLabel>Select Question</FormLabel>
                    <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                        <SelectValue placeholder="Select a question" />
                        </SelectTrigger>
                        <SelectContent>
                        {questionsList.map((question) => (
                            <SelectItem key={question.id} value={question.id.toString()}>
                            {question.question_name}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )} />

                <FormField control={form.control} name="traits_category" render={({ field }) => (
                <FormItem>
                    <FormLabel>Select Traits Category</FormLabel>
                    <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                        <SelectValue placeholder="Select Traits" />
                        </SelectTrigger>
                        <SelectContent>
                        {traitsList.map((trait) => (
                            <SelectItem key={trait.id} value={trait.id.toString()}>
                            {trait.trait_name}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )} />

                <FormField control={form.control} name="display" render={({ field }) => (
                <FormItem>
                    <FormLabel>Display</FormLabel>
                    <FormControl>
                    <Input {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )} />
            </>
            ),
            Traits: (
            <>
                <FormField control={form.control} name="trait_name" render={({ field }) => (
                <FormItem>
                    <FormLabel>Trait Name</FormLabel>
                    <FormControl>
                    <Input {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )} />
                <FormField control={form.control} name="trait_code" render={({ field }) => (
                <FormItem>
                    <FormLabel>Trait Code</FormLabel>
                    <FormControl>
                    <Input {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )} />
                <FormField control={form.control} name="key_traits" render={({ field }) => (
                <FormItem>
                    <FormLabel>Key Traits</FormLabel>
                    <FormControl>
                    <Input {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )} />
                {/* Add ReactQuill for Description, Strengths, Weakness, Opportunities, and Threats */}
                <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                    <ReactQuill {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )} />
                <FormField control={form.control} name="strengths" render={({ field }) => (
                <FormItem>
                    <FormLabel>Strengths</FormLabel>
                    <FormControl>
                    <ReactQuill {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )} />
                <FormField control={form.control} name="weakness" render={({ field }) => (
                <FormItem>
                    <FormLabel>Weakness</FormLabel>
                    <FormControl>
                    <ReactQuill {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )} />
                <FormField control={form.control} name="opportunities" render={({ field }) => (
                <FormItem>
                    <FormLabel>Opportunities</FormLabel>
                    <FormControl>
                    <ReactQuill {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )} />
                <FormField control={form.control} name="threats" render={({ field }) => (
                <FormItem>
                    <FormLabel>Threats</FormLabel>
                    <FormControl>
                    <ReactQuill {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )} />
            </>
            ),
        };
    
        return fields[moduleType] || null;
    };
    

    return (
        <tr key={item.id}>
            <td className="border border-gray-300 px-4 py-2 text-nowrap">{item.id}</td>
            {moduleType === "Traits" && (
                <td className="border border-gray-300 px-4 py-2 text-nowrap">{item.trait_name}</td>
            )}
            {moduleType === "Sub Questions" && (
                <>
                    <td className="border border-gray-300 px-4 py-2 text-nowrap truncate max-w-[300px] overflow-hidden whitespace-nowrap">
                        {item.question_name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-nowrap truncate max-w-[200px] overflow-hidden whitespace-nowrap">
                        {item.main_question}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-nowrap">{item.traits_category}</td>
                </>
            )}
            {moduleType === "Questions" && (
                <td className="border border-gray-300 px-4 py-2 text-nowrap">{item.question_name}</td>
            )}
            <td className="border border-gray-300 px-4 py-2 text-nowrap">
                <Dialog open={isEditDialogOpen} onOpenChange={setEditIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button size="sm" variant="outline" className="rounded-sm mr-2">
                            <PencilIcon className="stroke-Third" />
                        </Button>
                    </DialogTrigger>
                    
                    <DialogContent className="max-h-[80vh] overflow-y-auto max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Edit {moduleType.slice(0, -1)}</DialogTitle>
                        </DialogHeader>
                        <Form {...formMap[moduleType]}>
                            <form onSubmit={formMap[moduleType].handleSubmit(onSubmit)} className="w-full">
                                {renderFormFields(formMap[moduleType])}
                                <Button variant="outline" className="rounded-sm hover:border hover:border-Primary hover:text-Primary text-white bg-Primary mt-2">
                                    Save
                                </Button>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
                <Button size="sm" variant="outline" className="rounded-sm">
                    <TrashIcon className="stroke-Error" />
                </Button>
            </td>
        </tr>
    );
};

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
                        <TableRow
                            key={item.id}
                            item={item}
                            moduleType={moduleType}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const TestGroupAction = () => {

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    // Error states
    const [errors, setErrors] = useState({});

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
        console.log("click 1");
        const { name, value } = e.target;

        setQuestionData((prev) => ({ ...prev, [name]: value }));

        // Clear the error for the field
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubQuestionInputChange = (e) => {
        console.log("click 2");
        const { name, value } = e.target;

        setSubQuestionData((prev) => ({ ...prev, [name]: value }));

        // Clear the error for the field
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleTraitsInputChange = (e, name) => {
        if (typeof e === "string") {
            // ReactQuill input
            setTraitsData((prev) => ({ ...prev, [name]: e }));
            setErrors((prev) => ({ ...prev, [name]: "" })); // Clear the error
        } else {
            // Normal input fields
            const { name, value } = e.target;
            setTraitsData((prev) => ({ ...prev, [name]: value }));
            setErrors((prev) => ({ ...prev, [name]: "" })); // Clear the error
        }
    };


    // Validation Function
    const validateForm = () => {
        let tempErrors = {};

        if (activeModule === "Questions") {
            if (!questionData.question) tempErrors.question = "Question is required";
            if (!questionData.status) tempErrors.status = "Status is required";
            if (!questionData.order_id) tempErrors.order_id = "Order ID is required";
        }

        if (activeModule === "Sub Questions") {
            if (!subQuestionData.question_id) tempErrors.question_id = "Question ID is required";
            if (!subQuestionData.question_name) tempErrors.question_name = "Question Name is required";
            if (!subQuestionData.traits_category) tempErrors.traits_category = "Traits Category is required";
            if (!subQuestionData.display) tempErrors.display = "Display is required";
        }

        if (activeModule === "Traits") {
            Object.keys(traitsData).forEach((key) => {
                if (!traitsData[key]) tempErrors[key] = `${key.replace("_", " ")} is required`;
            });
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0; // Returns true if no errors
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

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
                                <Button className="bg-Primary text-white  rounded-md">{getAddButtonText(activeModule)}</Button>
                            </DialogTrigger>
                            <DialogContent className="max-h-[80vh] overflow-y-auto max-w-[600px]">
                                <DialogHeader>
                                    <DialogTitle>{getAddButtonText(activeModule)}</DialogTitle>
                                </DialogHeader>
                                <form className="space-y-2" onSubmit={handleSubmit}>
                                    {activeModule === "Traits" && (
                                        <>
                                            <label className="block text-sm font-medium text-gray-700">Trait Name</label>
                                            <Input className="" name="trait_name" value={traitsData.trait_name} onChange={handleTraitsInputChange} placeholder="Enter Trait Name" />
                                            {errors.trait_name && <p className="text-red-500">{errors.trait_name}</p>}

                                            <label className="block text-sm font-medium text-gray-700">Trait Code</label>
                                            <Input name="trait_code" value={traitsData.trait_code} onChange={handleTraitsInputChange} placeholder="Enter Trait Code" />
                                            {errors.trait_code && <p className="text-red-500">{errors.trait_code}</p>}

                                            <label className="block text-sm font-medium text-gray-700">Key Traits</label>
                                            <Input name="key_traits" value={traitsData.key_traits} onChange={handleTraitsInputChange} placeholder="Enter Key Traits" />
                                            {errors.key_traits && <p className="text-red-500">{errors.key_traits}</p>}


                                            <label className="block text-sm font-medium text-gray-700">Description</label>
                                            <ReactQuill value={traitsData.description} onChange={(value) => handleTraitsInputChange({ target: { name: "description", value } })} />
                                            {errors.description && <p className="text-red-500">{errors.description}</p>}


                                            <label className="block text-sm font-medium text-gray-700">Strengths</label>
                                            <ReactQuill value={traitsData.strengths} onChange={(value) => handleTraitsInputChange({ target: { name: "strengths", value } })} />
                                            {errors.strengths && <p className="text-red-500">{errors.strengths}</p>}

                                            <label className="block text-sm font-medium text-gray-700">Weakness</label>
                                            <ReactQuill value={traitsData.weakness} onChange={(value) => handleTraitsInputChange({ target: { name: "weakness", value } })} />
                                            {errors.weakness && <p className="text-red-500">{errors.weakness}</p>}

                                            <label className="block text-sm font-medium text-gray-700">Opportunities</label>
                                            <ReactQuill value={traitsData.opportunities} onChange={(value) => handleTraitsInputChange({ target: { name: "opportunities", value } })} />
                                            {errors.opportunities && <p className="text-red-500">{errors.opportunities}</p>}

                                            <label className="block text-sm font-medium text-gray-700">Threats</label>
                                            <ReactQuill value={traitsData.threats} onChange={(value) => handleTraitsInputChange({ target: { name: "threats", value } })} />
                                            {errors.threats && <p className="text-red-500">{errors.threats}</p>}

                                            <label className="block text-sm font-medium text-gray-700">Display (1 or 0)</label>
                                            <Input name="display" value={traitsData.display} onChange={handleTraitsInputChange} placeholder="Display (1 or 0)" />
                                            {errors.display && <p className="text-red-500">{errors.display}</p>}
                                        </>
                                    )}

                                    {activeModule === "Sub Questions" && (
                                        <>
                                            <label className="block text-sm font-medium text-gray-700">Select Question</label>
                                            <Select
                                                value={subQuestionData.question_id ? subQuestionData.question_id.toString() : questionsList.length > 0 ? questionsList[0].id.toString() : ""}
                                                onValueChange={(value) => setSubQuestionData((prev) => ({ ...prev, question_id: value }))}
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
                                            {errors.question_id && <p className="text-red-500">{errors.question_id}</p>}

                                            <label className="block text-sm font-medium text-gray-700">Question Name</label>
                                            <Input name="question_name" value={subQuestionData.question_name} onChange={handleSubQuestionInputChange} placeholder="Enter Question Name" />
                                            {errors.question_name && <p className="text-red-500">{errors.question_name}</p>}

                                            <label className="block text-sm font-medium text-gray-700">Select Traits Category</label>
                                            <Select
                                                value={subQuestionData.traits_category ? subQuestionData.traits_category.toString() : traitsList.length > 0 ? traitsList[0].id.toString() : ""}
                                                onValueChange={(value) => setSubQuestionData((prev) => ({ ...prev, traits_category: value }))}
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
                                            {errors.traits_category && <p className="text-red-500">{errors.traits_category}</p>}

                                            <label className="block text-sm font-medium text-gray-700">Display (1 or 0)</label>
                                            <Input name="display" value={subQuestionData.display} onChange={handleSubQuestionInputChange} placeholder="Display (1 or 0)" />
                                            {errors.display && <p className="text-red-500">{errors.display}</p>}
                                        </>
                                    )}

                                    {activeModule === "Questions" && (
                                        <>
                                            <label className="block text-sm font-medium text-gray-700">Question</label>
                                            <Input name="question" value={questionData.question} onChange={handleInputChange} placeholder="Enter Question" />

                                            {errors.question && <p className="text-red-500">{errors.question}</p>}

                                            <label className="block text-sm font-medium text-gray-700">Status (1 or 0)</label>
                                            <Input name="status" value={questionData.status} onChange={handleInputChange} placeholder="Enter Status (1 or 0)" />
                                            {errors.status && <p className="text-red-500">{errors.status}</p>}

                                            <label className="block text-sm font-medium text-gray-700">Order ID</label>
                                            <Input name="order_id" value={questionData.order_id} onChange={handleInputChange} placeholder="Enter Order ID" />
                                            {errors.order_id && <p className="text-red-500">{errors.order_id}</p>}
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
