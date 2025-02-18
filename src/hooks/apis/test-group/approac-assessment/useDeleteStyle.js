import { useMutation } from '@tanstack/react-query';
import { deleteStyleInApproach } from '@/apis/test-group/approach-assessment';
import { useAuth } from "@/hooks/context/uesAuth";

export const useDeleteStyle = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: deleteStyleMutation } = useMutation({
        mutationFn: (questionId) => deleteStyleInApproach({ token: auth?.token, logout, questionId }),
        onSuccess: (response) => {
            console.log('Successfully Style Deleted', response);
        },
        onError: (error) => {
            console.log('Failed to Delete Style', error);
        }
    });

    return {
        isPending,
        deleteStyleMutation
    };
};