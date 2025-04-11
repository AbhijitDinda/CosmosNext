import { useMutation } from '@tanstack/react-query'; // Fix import for useMutation
import { editApproachStyleInEmotionalIntelligence } from '@/apis/test-group/emotional-intelligence';
import { useAuth } from "@/hooks/context/uesAuth";

export const useEditStyle = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: editStyleMutationInEmotionalIntelligence } = useMutation({
        mutationFn: ({post_data,groupId}) => editApproachStyleInEmotionalIntelligence({ token: auth?.token, logout,post_data,groupId},
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
        editStyleMutationInEmotionalIntelligence,
    };
};
