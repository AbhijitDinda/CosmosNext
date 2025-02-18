import { useMutation } from '@tanstack/react-query';
import { deleteQuestionInTeamInventory } from '@/apis/test-group/team-inventory';
import { useAuth } from "@/hooks/context/uesAuth";

export const useDeleteQuestionTeamInventory = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: deleteQuestionTeamInventory } = useMutation({
        mutationFn: (q_id) => deleteQuestionInTeamInventory({ token: auth?.token, logout, q_id }),
        onSuccess: (response) => {

            console.log('Successfully Question Deleted', response);
        },
        onError: (error) => {

            console.log('Failed to Delete Question', error);
        }
    });

    return {
        isPending,
        deleteQuestionTeamInventory
    };
};