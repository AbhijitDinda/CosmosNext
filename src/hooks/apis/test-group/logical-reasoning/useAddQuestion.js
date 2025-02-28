import { useMutation } from '@tanstack/react-query';
import { addQuestionInLogicalReasoning } from '@/apis/test-group/logical-reasoning';
import { useAuth } from "@/hooks/context/uesAuth";

export const useAddQuestion = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: addQuestionMutationInLogicalReasoning } = useMutation({
        mutationFn: (formData) => addQuestionInLogicalReasoning({ token: auth?.token, logout,formData}),
        onSuccess: (response) => {
            console.log('Successfully Add the Question In Logical Reasoning', response);
        },
        onError: (error) => {
            console.error('Failed to Add the Question In Logical Reasoning', error);
        },
    });

    return {
        isPending,
        addQuestionMutationInLogicalReasoning,
    };
};
