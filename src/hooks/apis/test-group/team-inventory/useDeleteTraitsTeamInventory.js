import { useMutation } from '@tanstack/react-query';
import { deleteTraitInTeamInventory } from '@/apis/test-group/team-inventory';
import { useAuth } from "@/hooks/context/uesAuth";

export const useDeleteTraitsTeamInventory = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: deleteQuestionTeamInventory } = useMutation({
        mutationFn: (traits_id) => deleteTraitInTeamInventory({ token: auth?.token, logout, traits_id }),
        onSuccess: (response) => {

            console.log('Successfully Trait Deleted', response);
        },
        onError: (error) => {

            console.log('Failed to Delete Trait', error);
        }
    });

    return {
        isPending,
        deleteQuestionTeamInventory
    };
};