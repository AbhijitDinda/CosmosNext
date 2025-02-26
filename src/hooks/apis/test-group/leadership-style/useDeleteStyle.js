import { useMutation } from '@tanstack/react-query';
import { deleteStyleInLeadershipStyle } from '@/apis/test-group/leadership-style';
import { useAuth } from "@/hooks/context/uesAuth";

export const useDeleteStyle = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: deleteStyleMutationInLeadershipStyle } = useMutation({
        mutationFn: (styleId) => deleteStyleInLeadershipStyle({ token: auth?.token, logout, styleId }),
        onSuccess: (response) => {
            console.log('Successfully Style Deleted', response);
        },
        onError: (error) => {
            console.log('Failed to Delete Style', error);
        }
    });

    return {
        isPending,
        deleteStyleMutationInLeadershipStyle
    };
};