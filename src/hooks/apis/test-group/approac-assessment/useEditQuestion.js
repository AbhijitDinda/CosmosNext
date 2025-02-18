import { useMutation } from '@tanstack/react-query'; // Fix import for useMutation
import { editQuestionInApproach } from '@/apis/test-group/approach-assessment';
import { useAuth } from "@/hooks/context/uesAuth";

export const useEditQuestion = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: editQuestionMutation } = useMutation({
        mutationFn: ({post_data,questionId}) => editQuestionInApproach({ token: auth?.token, logout,post_data,questionId},
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
        editQuestionMutation,
    };
};
