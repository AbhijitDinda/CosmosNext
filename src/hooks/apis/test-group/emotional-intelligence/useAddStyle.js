import { useMutation } from '@tanstack/react-query'; // Fix import for useMutation
import { addApproachStyleInEmotionalIntelligence } from '@/apis/test-group/emotional-intelligence';
import { useAuth } from "@/hooks/context/uesAuth";

export const useAddStyle = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: addStyleMutationInEmotionalIntelligence } = useMutation({
        mutationFn: (post_data) => addApproachStyleInEmotionalIntelligence({ token: auth?.token, logout,post_data}),
        onSuccess: (response) => {
            console.log('Successfully Add Style', response);
        },
        onError: (error) => {
            console.error('Failed to Add Style', error);
        },
    });

    return {
        isPending,
        addStyleMutationInEmotionalIntelligence,
    };
};
