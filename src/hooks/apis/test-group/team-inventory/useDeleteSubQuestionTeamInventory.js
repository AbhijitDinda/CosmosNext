import { useMutation } from '@tanstack/react-query';
import { deleteSubQuestionInTeamInventory } from '@/apis/test-group/team-inventory';
import { useAuth } from "@/hooks/context/uesAuth";

export const useDeleteSubQuestionTeamInventory = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: deleteSubQuestionTeamInventory } = useMutation({
        mutationFn: (SubQ_id) => deleteSubQuestionInTeamInventory({ token: auth?.token, logout, SubQ_id }),
        onSuccess: (response) => {

            console.log('Successfully SubQuestion Deleted', response);
        },
        onError: (error) => {

            console.log('Failed to Delete SubQuestion', error);
        }
    });

    return {
        isPending,
        deleteSubQuestionTeamInventory
    };
};