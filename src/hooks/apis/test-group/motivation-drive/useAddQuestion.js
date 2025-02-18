import { useMutation } from '@tanstack/react-query'; // Fix import for useMutation
import { addQuestionInMotivationDrive } from '@/apis/test-group/motivation-drive';
import { useAuth } from "@/hooks/context/uesAuth";

export const useAddQuestion = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: addQuestionMutation } = useMutation({
        mutationFn: (post_data) => addQuestionInMotivationDrive({ token: auth?.token, logout,post_data},
        ),
        onSuccess: (response) => {
            console.log('Successfully updated the Question Motivation Drive', response);
        },
        onError: (error) => {
            console.error('Failed to update the Question Motivation Drive', error);
        },
    });

    return {
        isPending,
        addQuestionMutation,
    };
};
