import { useMutation } from '@tanstack/react-query';
import { updateSectionInNumericalReasoning } from '@/apis/test-group/numerical-and-logical-reasoning';
import { useAuth } from "@/hooks/context/uesAuth";

export const useEditSection = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: editSectionMutation } = useMutation({
        mutationFn: ({formData,sectionId}) => updateSectionInNumericalReasoning({ token: auth?.token, logout,formData,sectionId}),
        onSuccess: (response) => {
            console.log('Successfully Edit Section', response);
        },
        onError: (error) => {
            console.error('Failed to  Edit Section', error);
        },
    });

    return {
        isPending,
        editSectionMutation,
    };
};
