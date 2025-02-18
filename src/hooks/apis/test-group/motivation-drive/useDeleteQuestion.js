import { useMutation } from '@tanstack/react-query';
import { deleteQuestionInMotivationDrive } from '@/apis/test-group/motivation-drive';
import { useAuth } from "@/hooks/context/uesAuth";

export const useDeleteQuestion = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: deleteQuestionMutation } = useMutation({
        mutationFn: (questionId) => deleteQuestionInMotivationDrive({ token: auth?.token, logout, questionId }),
        onSuccess: (response) => {

            console.log('Successfully Trait Deleted', response);
        },
        onError: (error) => {

            console.log('Failed to Delete Trait', error);
        }
    });

    return {
        isPending,
        deleteQuestionMutation
    };
};