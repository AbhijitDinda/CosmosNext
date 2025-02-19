import { useMutation } from '@tanstack/react-query'; // Fix import for useMutation
import { addQuestionInEmotionalIntelligence } from '@/apis/test-group/emotional-intelligence';
import { useAuth } from "@/hooks/context/uesAuth";

export const useAddQuestion = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: addQuestionMutationInEmotionalIntelligence } = useMutation({
        mutationFn: (post_data) => addQuestionInEmotionalIntelligence({ token: auth?.token, logout,post_data}),
        onSuccess: (response) => {
            console.log('Successfully Add Question', response);
        },
        onError: (error) => {
            console.error('Failed to Add Question', error);
        },
    });

    return {
        isPending,
        addQuestionMutationInEmotionalIntelligence,
    };
};
