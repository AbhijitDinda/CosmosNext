import { useMutation } from '@tanstack/react-query';
import { deleteApproachStyleInEmotionalIntelligence } from '@/apis/test-group/emotional-intelligence';
import { useAuth } from "@/hooks/context/uesAuth";

export const useDeleteStyle = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: deleteStyleMutationInEmotionalIntelligence } = useMutation({
        mutationFn: (groupId) => deleteApproachStyleInEmotionalIntelligence({ token: auth?.token, logout, groupId }),
        onSuccess: (response) => {
            console.log('Successfully question Style', response);
        },
        onError: (error) => {
            console.log('Failed to Delete Style', error);
        }
    });

    return {
        isPending,
        deleteStyleMutationInEmotionalIntelligence
    };
};