import { useMutation } from '@tanstack/react-query';
import { deleteQuestionInSituationalJudgement } from '@/apis/test-group/numerical-and-logical-reasoning';
import { useAuth } from "@/hooks/context/uesAuth";

export const useDeleteQuestion = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: deleteQuestionMutation } = useMutation({
        mutationFn: (questionId) => deleteQuestionInSituationalJudgement({ token: auth?.token, logout, questionId }),
        onSuccess: (response) => {
            console.log('Successfully Question Deleted', response);
        },
        onError: (error) => {
            console.log('Failed to Delete Question', error);
        }
    });

    return {
        isPending,
        deleteQuestionMutation
    };
};