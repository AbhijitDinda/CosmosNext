import { useMutation } from '@tanstack/react-query';
import { addSectionInNumericalReasoning } from '@/apis/test-group/numerical-and-logical-reasoning';
import { useAuth } from "@/hooks/context/uesAuth";

export const useAddSection = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: addSectionMutation } = useMutation({
        mutationFn: (formData) => addSectionInNumericalReasoning({ token: auth?.token, logout,formData}
        ),
        onSuccess: (response) => {
            console.log('Successfully updated the Section Numerical Reasoning', response);
        },
        onError: (error) => {
            console.error('Failed to update the Section Numerical Reasoning', error);
        },
    });

    return {
        isPending,
        addSectionMutation,
    };
};
