import { useMutation } from '@tanstack/react-query'; // Fix import for useMutation
import { editStyleInLeadershipReadiness } from '@/apis/test-group/leadership-readiness';
import { useAuth } from "@/hooks/context/uesAuth";

export const useEditStyle = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: editStyleMutationInLeadershipReadiness } = useMutation({
        mutationFn: ({post_data,styleId}) => editStyleInLeadershipReadiness({ token: auth?.token, logout,post_data,styleId},
        ),
        onSuccess: (response) => {
            console.log('Successfully Edit Style', response);
        },
        onError: (error) => {
            console.error('Failed to  Edit Style', error);
        },
    });

    return {
        isPending,
        editStyleMutationInLeadershipReadiness,
    };
};
