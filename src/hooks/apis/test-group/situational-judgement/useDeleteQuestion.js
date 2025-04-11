import { useMutation } from '@tanstack/react-query';
import { deleteQuestion } from '@/apis/test-group/situational-judgement';
import { useAuth } from "@/hooks/context/uesAuth";

export const useDeleteQuestion = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: deleteQuestionMutationInSituationalJudgement } = useMutation({
        mutationFn: (questionId) => deleteQuestion({ token: auth?.token, logout, questionId }),
        onSuccess: (response) => {
            console.log('Successfully question Deleted', response);
        },
        onError: (error) => {
            console.log('Failed to Delete question', error);
        }
    });

    return {
        isPending,
        deleteQuestionMutationInSituationalJudgement
    };
};