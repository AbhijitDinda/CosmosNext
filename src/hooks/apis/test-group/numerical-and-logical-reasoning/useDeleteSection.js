import { useMutation } from '@tanstack/react-query';
import { deleteSectionInNumericalReasoning } from '@/apis/test-group/numerical-and-logical-reasoning';
import { useAuth } from "@/hooks/context/uesAuth";

export const useDeleteSection = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: deleteSectionMutation } = useMutation({
        mutationFn: (sectionId) => deleteSectionInNumericalReasoning({ token: auth?.token, logout, sectionId }),
        onSuccess: (response) => {
            console.log('Successfully Section Deleted', response);
        },
        onError: (error) => {
            console.log('Failed to Delete Section', error);
        }
    });

    return {
        isPending,
        deleteSectionMutation
    };
};