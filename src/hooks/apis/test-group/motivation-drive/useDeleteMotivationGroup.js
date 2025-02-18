import { useMutation } from '@tanstack/react-query';
import { deleteMotivationGroupInMotivationDrive } from '@/apis/test-group/motivation-drive';
import { useAuth } from "@/hooks/context/uesAuth";

export const useDeleteMotivationGroup = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: deleteQuestionMutation } = useMutation({
        mutationFn: (questionId) => deleteMotivationGroupInMotivationDrive({ token: auth?.token, logout, questionId }),
        onSuccess: (response) => {
            console.log('Successfully Delete Motivation Group', response);
        },
        onError: (error) => {
            console.log('Failed to Delete Motivation Group', error);
        }
    });

    return {
        isPending,
        deleteQuestionMutation
    };
};