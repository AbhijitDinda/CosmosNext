import { useMutation } from '@tanstack/react-query'; // Fix import for useMutation
import { addMotivationGroupInMotivationDrive } from '@/apis/test-group/motivation-drive';
import { useAuth } from "@/hooks/context/uesAuth";

export const useAddMotivationGroup = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: addMotivationGroupMutation } = useMutation({
        mutationFn: (post_data) => addMotivationGroupInMotivationDrive({ token: auth?.token, logout,post_data},
        console.log("post_data",post_data)
        ),
        onSuccess: (response) => {
            console.log('Successfully updated the MotivationGroup', response);
        },
        onError: (error) => {
            console.error('Failed to update the MotivationGroup', error);
        },
    });

    return {
        isPending,
        addMotivationGroupMutation,
    };
};
