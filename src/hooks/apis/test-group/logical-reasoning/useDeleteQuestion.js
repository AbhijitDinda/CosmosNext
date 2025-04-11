import { useMutation } from '@tanstack/react-query';
import { deleteQuestionInLogicalReasoning } from '@/apis/test-group/logical-reasoning';
import { useAuth } from "@/hooks/context/uesAuth";

export const useDeleteQuestion = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: deleteQuestionMutationInLogicalReasoning } = useMutation({
        mutationFn: (questionId) => deleteQuestionInLogicalReasoning({ token: auth?.token, logout, questionId }),
        onSuccess: (response) => {
            console.log('Successfully Question Deleted', response);
        },
        onError: (error) => {
            console.log('Failed to Delete Question', error);
        }
    });

    return {
        isPending,
        deleteQuestionMutationInLogicalReasoning
    };
};