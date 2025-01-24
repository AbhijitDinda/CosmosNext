import { useMutation } from '@tanstack/react-query'; // Fix import for useMutation
import { updateTestsById } from '@/apis/test-group';
import { useAuth } from "@/hooks/context/uesAuth";

export const useUpdateTestById = (test_id) => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: updateTestsDataMutation } = useMutation({
        mutationFn: (data) => updateTestsById({ data, token: auth?.token, logout, test_id }),
        onSuccess: (response) => {
            console.log('Successfully updated the TestGroup', response);
        },
        onError: (error) => {
            console.error('Failed to update the TestGroup', error);
        },
    });

    return {
        isPending,
        updateTestsDataMutation,
    };
};
