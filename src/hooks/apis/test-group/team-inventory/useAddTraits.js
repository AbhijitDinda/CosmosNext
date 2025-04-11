import { useMutation } from '@tanstack/react-query'; // Fix import for useMutation
import { addTraitsInTeamInventory } from '@/apis/test-group/team-inventory';
import { useAuth } from "@/hooks/context/uesAuth";

export const useAddTraits = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: addTraitsMutation } = useMutation({
        mutationFn: (post_data) => addTraitsInTeamInventory({ token: auth?.token, logout,post_data},
        console.log("post_data",post_data,)
        ),
        onSuccess: (response) => {
            console.log('Successfully updated the Traits', response);
        },
        onError: (error) => {
            console.error('Failed to update the Traits', error);
        },
    });

    return {
        isPending,
        addTraitsMutation,
    };
};
