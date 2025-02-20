import { useMutation } from '@tanstack/react-query';
import { deleteStyleInLeadershipReadiness } from '@/apis/test-group/leadership-readiness';
import { useAuth } from "@/hooks/context/uesAuth";

export const useDeleteStyle = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: deleteStyleMutationInLeadershipReadiness } = useMutation({
        mutationFn: (questionId) => deleteStyleInLeadershipReadiness({ token: auth?.token, logout, questionId }),
        onSuccess: (response) => {
            console.log('Successfully Style Deleted', response);
        },
        onError: (error) => {
            console.log('Failed to Delete Style', error);
        }
    });

    return {
        isPending,
        deleteStyleMutationInLeadershipReadiness
    };
};