import { useMutation } from '@tanstack/react-query';
import { editQuestionInLogicalReasoning } from '@/apis/test-group/logical-reasoning';
import { useAuth } from "@/hooks/context/uesAuth";

export const useEditQuestion = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: editQuestionMutationInLogicalReasoning } = useMutation({
        mutationFn: ({questionId,formData}) => editQuestionInLogicalReasoning({ token: auth?.token, logout,questionId,formData}),
        onSuccess: (response) => {
            console.log('Successfully Edit Question', response);
        },
        onError: (error) => {
            console.error('Failed to Edit Question', error);
        },
    });

    return {
        isPending,
        editQuestionMutationInLogicalReasoning,
    };
};
