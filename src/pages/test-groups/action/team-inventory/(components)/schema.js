export const questionSchema = z.object({
  question: z.string().min(1, { message: "Question is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  order_id: z.number().min(1, { message: "Order ID is required" }),
});

export const subQuestionSchema = z.object({
  question_id: z.string().min(1, { message: "Question ID is required" }),
  question_name: z.string().min(1, { message: "Question Name is required" }),
  traits_category: z
    .string()
    .min(1, { message: "Traits Category is required" }),
  display: z.string().min(1, { message: "Display is required" }),
});

export const traitsSchema = z.object({
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
