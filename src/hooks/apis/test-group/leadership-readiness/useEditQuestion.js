import { useMutation } from '@tanstack/react-query'; // Fix import for useMutation
import { editQuestionInLeadershipReadiness } from '@/apis/test-group/leadership-readiness';
import { useAuth } from "@/hooks/context/uesAuth";

export const useEditQuestion = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: editQuestionMutationInLeadershipReadiness } = useMutation({
        mutationFn: ({post_data,questionId}) => editQuestionInLeadershipReadiness({ token: auth?.token, logout,post_data,questionId},
        ),
        onSuccess: (response) => {
            console.log('Successfully Edit Question', response);
        },
        onError: (error) => {
            console.error('Failed to  Edit Question', error);
        },
    });

    return {
        isPending,
        editQuestionMutationInLeadershipReadiness,
    };
};
