import { useMutation } from '@tanstack/react-query';
import { deleteQuestionInApproach } from '@/apis/test-group/approach-assessment';
import { useAuth } from "@/hooks/context/uesAuth";

export const useDeleteQuestion = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: deleteQuestionMutation } = useMutation({
        mutationFn: (questionId) => deleteQuestionInApproach({ token: auth?.token, logout, questionId }),
        onSuccess: (response) => {
            console.log('Successfully question Deleted', response);
        },
        onError: (error) => {
            console.log('Failed to Delete question', error);
        }
    });

    return {
        isPending,
        deleteQuestionMutation
    };
};