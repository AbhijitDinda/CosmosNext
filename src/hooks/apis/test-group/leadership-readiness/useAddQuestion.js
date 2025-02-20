import { useMutation } from '@tanstack/react-query';
import { addQuestionInLeadershipReadiness } from '@/apis/test-group/leadership-readiness';
import { useAuth } from "@/hooks/context/uesAuth";

export const useAddQuestion = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: addQuestionMutationInLeadershipReadiness } = useMutation({
        mutationFn: (post_data) => addQuestionInLeadershipReadiness({ token: auth?.token, logout,post_data},
        ),
        onSuccess: (response) => {
            console.log('Successfully updated the Question In Leadership Readiness', response);
        },
        onError: (error) => {
            console.error('Failed to update the Question In Leadership Readiness', error);
        },
    });

    return {
        isPending,
        addQuestionMutationInLeadershipReadiness,
    };
};
