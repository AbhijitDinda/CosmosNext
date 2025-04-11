import { useMutation } from '@tanstack/react-query';
import { addStyleInLeadershipReadiness } from '@/apis/test-group/leadership-readiness';
import { useAuth } from "@/hooks/context/uesAuth";

export const useAddStyle = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: addStyleMutationInLeadershipReadiness } = useMutation({
        mutationFn: (post_data) => addStyleInLeadershipReadiness({ token: auth?.token, logout,post_data},
        ),
        onSuccess: (response) => {
            console.log('Successfully updated the Style In Leadership Readiness', response);
        },
        onError: (error) => {
            console.error('Failed to update the Style In Leadership Readiness', error);
        },
    });

    return {
        isPending,
        addStyleMutationInLeadershipReadiness,
    };
};
