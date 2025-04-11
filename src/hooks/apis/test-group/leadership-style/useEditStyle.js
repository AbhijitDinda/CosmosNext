import { useMutation } from '@tanstack/react-query'; // Fix import for useMutation
import { updateStyleInLeadershipStyle } from '@/apis/test-group/leadership-style';
import { useAuth } from "@/hooks/context/uesAuth";

export const useEditStyle = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: editStyleMutationInLeadershipStyle } = useMutation({
        mutationFn: ({post_data,styleId}) => updateStyleInLeadershipStyle({ token: auth?.token, logout,post_data,styleId},
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
        editStyleMutationInLeadershipStyle,
    };
};
