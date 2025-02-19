import { useMutation } from '@tanstack/react-query'; // Fix import for useMutation
import { addQuestionInApproach } from '@/apis/test-group/approach-assessment';
import { useAuth } from "@/hooks/context/uesAuth";

export const useAddQuestion = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: addQuestionMutation } = useMutation({
        mutationFn: (post_data) => addQuestionInApproach({ token: auth?.token, logout,post_data}),
        onSuccess: (response) => {
            console.log('Successfully Add Question', response);
        },
        onError: (error) => {
            console.error('Failed to Add Question', error);
        },
    });

    return {
        isPending,
        addQuestionMutation,
    };
};
