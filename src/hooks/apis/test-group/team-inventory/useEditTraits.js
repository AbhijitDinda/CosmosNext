import { useMutation } from '@tanstack/react-query'; // Fix import for useMutation
import { editTraitInTeamInventory } from '@/apis/test-group/team-inventory';
import { useAuth } from "@/hooks/context/uesAuth";

export const useEditTraits = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: editTraitTeamInventoryMutation } = useMutation({
        mutationFn: ({post_data,traits_id}) => editTraitInTeamInventory({ token: auth?.token, logout,post_data,traits_id},
        ),
        onSuccess: (response) => {
            console.log('Successfully updated the Team Invo Trait', response);
        },
        onError: (error) => {
            console.error('Failed to update the Team Invo Trait', error);
        },
    });

    return {
        isPending,
        editTraitTeamInventoryMutation,
    };
};
