import { useMutation } from '@tanstack/react-query';
import { addStyleInLeadershipStyle } from '@/apis/test-group/leadership-style';
import { useAuth } from "@/hooks/context/uesAuth";

export const useAddStyle = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: addStyleMutationInLeadershipStyle } = useMutation({
        mutationFn: (post_data) => addStyleInLeadershipStyle({ token: auth?.token, logout,post_data},
        ),
        onSuccess: (response) => {
            console.log('Successfully updated the Style In Leadership Style', response);
        },
        onError: (error) => {
            console.error('Failed to update the Style In Leadership Style', error);
        },
    });

    return {
        isPending,
        addStyleMutationInLeadershipStyle,
    };
};
