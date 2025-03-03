import { useMutation } from '@tanstack/react-query';
import { deleteQuestionInVerbalReasoning } from '@/apis/test-group/verbal-reasoning';
import { useAuth } from "@/hooks/context/uesAuth";

export const useDeleteQuestion = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: deleteQuestionMutationInVerbalReasoning } = useMutation({
        mutationFn: (questionId) => deleteQuestionInVerbalReasoning({ token: auth?.token, logout, questionId }),
        onSuccess: (response) => {
            console.log('Successfully question Deleted', response);
        },
        onError: (error) => {
            console.log('Failed to Delete question', error);
        }
    });

    return {
        isPending,
        deleteQuestionMutationInVerbalReasoning
    };
};