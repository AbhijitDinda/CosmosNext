import { useMutation } from '@tanstack/react-query';
import { updateQuestionInNumericalReasoning } from '@/apis/test-group/numerical-and-logical-reasoning';
import { useAuth } from "@/hooks/context/uesAuth";

export const useEditQuestion = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: editQuestionMutation } = useMutation({
        mutationFn: ({formData,questionId}) => updateQuestionInNumericalReasoning({ token: auth?.token, logout,formData,questionId}),
        onSuccess: (response) => {
            console.log('Successfully Edit Question', response);
        },
        onError: (error) => {
            console.error('Failed to  Edit Question', error);
        },
    });

    return {
        isPending,
        editQuestionMutation,
    };
};
