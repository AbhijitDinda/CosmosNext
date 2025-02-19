import { useMutation } from '@tanstack/react-query'; // Fix import for useMutation
import { addStyleInApproach } from '@/apis/test-group/approach-assessment';
import { useAuth } from "@/hooks/context/uesAuth";

export const useAddStyle = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: addStyleMutation } = useMutation({
        mutationFn: (post_data) => addStyleInApproach({ token: auth?.token, logout,post_data}),
        onSuccess: (response) => {
            console.log('Successfully Add Style', response);
        },
        onError: (error) => {
            console.error('Failed to Add Style', error);
        },
    });

    return {
        isPending,
        addStyleMutation,
    };
};
