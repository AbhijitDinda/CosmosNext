import { useMutation } from '@tanstack/react-query';
import { deleteQuestionInLeadershipReadiness } from '@/apis/test-group/leadership-readiness';
import { useAuth } from "@/hooks/context/uesAuth";

export const useDeleteQuestion = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: deleteQuestionMutationInLeadershipReadiness } = useMutation({
        mutationFn: (questionId) => deleteQuestionInLeadershipReadiness({ token: auth?.token, logout, questionId }),
        onSuccess: (response) => {
            console.log('Successfully question Deleted', response);
        },
        onError: (error) => {
            console.log('Failed to Delete question', error);
        }
    });

    return {
        isPending,
        deleteQuestionMutationInLeadershipReadiness
    };
};