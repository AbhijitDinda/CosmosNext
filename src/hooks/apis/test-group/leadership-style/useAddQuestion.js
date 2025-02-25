import { useMutation } from '@tanstack/react-query';
import { addQuestionInLeadershipStyle } from '@/apis/test-group/leadership-style';
import { useAuth } from "@/hooks/context/uesAuth";

export const useAddQuestion = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: addQuestionMutationInLeadershipStyle } = useMutation({
        mutationFn: (post_data) => addQuestionInLeadershipStyle({ token: auth?.token, logout,post_data},
        ),
        onSuccess: (response) => {
            console.log('Successfully updated the Question In Leadership Style', response);
        },
        onError: (error) => {
            console.error('Failed to update the Question In Leadership Style', error);
        },
    });

    return {
        isPending,
        addQuestionMutationInLeadershipStyle,
    };
};
