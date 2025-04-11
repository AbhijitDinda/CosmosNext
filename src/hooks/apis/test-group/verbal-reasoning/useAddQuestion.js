import { useMutation } from '@tanstack/react-query';
import { addQuestionInVerbalReasoning } from '@/apis/test-group/verbal-reasoning';
import { useAuth } from "@/hooks/context/uesAuth";

export const useAddQuestion = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: addQuestionMutationInVerbalReasoning } = useMutation({
        mutationFn: (post_data) => addQuestionInVerbalReasoning({ token: auth?.token, logout,post_data}),
        onSuccess: (response) => {
            console.log('Successfully updated question in the Verbal Reasoning', response);
        },
        onError: (error) => {
            console.error('Failed to update the Verbal Reasoning', error);
        },
    });

    return {
        isPending,
        addQuestionMutationInVerbalReasoning,
    };
};
