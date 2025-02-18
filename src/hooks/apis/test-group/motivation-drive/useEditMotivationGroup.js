import { useMutation } from '@tanstack/react-query'; // Fix import for useMutation
import { editMotivationGroupInMotivationDrive } from '@/apis/test-group/motivation-drive';
import { useAuth } from "@/hooks/context/uesAuth";

export const useEditMotivationGroup = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: editMotivationGroup } = useMutation({
        mutationFn: ({post_data,groupId}) => editMotivationGroupInMotivationDrive({ token: auth?.token, logout,post_data,groupId},
        ),
        onSuccess: (response) => {
            console.log('Successfully Edit Motivation Group', response);
        },
        onError: (error) => {
            console.error('Failed to  Edit Motivation Group', error);
        },
    });

    return {
        isPending,
        editMotivationGroup,
    };
};
