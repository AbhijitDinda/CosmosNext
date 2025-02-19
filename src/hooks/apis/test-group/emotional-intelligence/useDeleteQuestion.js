import { useMutation } from '@tanstack/react-query';
import { deleteQuestionInEmotionalIntelligence } from '@/apis/test-group/emotional-intelligence';
import { useAuth } from "@/hooks/context/uesAuth";

export const useDeleteQuestion = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: deleteQuestionMutationInEmotionalIntelligence } = useMutation({
        mutationFn: (questionId) => deleteQuestionInEmotionalIntelligence({ token: auth?.token, logout, questionId }),
        onSuccess: (response) => {
            console.log('Successfully question Deleted', response);
        },
        onError: (error) => {
            console.log('Failed to Delete question', error);
        }
    });

    return {
        isPending,
        deleteQuestionMutationInEmotionalIntelligence
    };
};