import { useMutation } from '@tanstack/react-query'; // Fix import for useMutation
import { editQuestionInEmotionalIntelligence } from '@/apis/test-group/emotional-intelligence';
import { useAuth } from "@/hooks/context/uesAuth";

export const useEditQuestion = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: editQuestionMutationInEmotionalIntelligence } = useMutation({
        mutationFn: ({post_data,questionId}) => editQuestionInEmotionalIntelligence({ token: auth?.token, logout,post_data,questionId},
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
        editQuestionMutationInEmotionalIntelligence,
    };
};
