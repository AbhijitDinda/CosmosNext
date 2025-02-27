import { useMutation } from '@tanstack/react-query';
import { addQuestionInNumericalReasoning } from '@/apis/test-group/numerical-and-logical-reasoning';
import { useAuth } from "@/hooks/context/uesAuth";

export const useAddQuestion = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: addQuestionMutation } = useMutation({
        mutationFn: (formData) => addQuestionInNumericalReasoning({ token: auth?.token, logout,formData}),
        onSuccess: (response) => {
            console.log('Successfully updated the Question Numerical Reasoning', response);
        },
        onError: (error) => {
            console.error('Failed to update the Question Numerical Reasoning', error);
        },
    });

    return {
        isPending,
        addQuestionMutation,
    };
};
