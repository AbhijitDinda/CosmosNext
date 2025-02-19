import { useMutation } from '@tanstack/react-query'; // Fix import for useMutation
import { editStyleInApproach } from '@/apis/test-group/approach-assessment';
import { useAuth } from "@/hooks/context/uesAuth";

export const useEditStyle = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: editStyleMutation } = useMutation({
        mutationFn: ({post_data,Id}) => editStyleInApproach({ token: auth?.token, logout,post_data,Id},
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
        editStyleMutation,
    };
};
