import { useMutation } from '@tanstack/react-query'; // Fix import for useMutation
import { updateQuestionInLeadershipStyle } from '@/apis/test-group/leadership-style';
import { useAuth } from "@/hooks/context/uesAuth";

export const useEditQuestion = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: editQuestionMutationInLeadershipStyle } = useMutation({
        mutationFn: ({post_data,questionId}) => updateQuestionInLeadershipStyle({ token: auth?.token, logout,post_data,questionId},
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
        editQuestionMutationInLeadershipStyle,
    };
};
