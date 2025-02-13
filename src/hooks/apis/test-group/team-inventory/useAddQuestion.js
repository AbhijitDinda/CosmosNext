import { useMutation } from '@tanstack/react-query'; // Fix import for useMutation
import { addQuestionInTeamInventory } from '@/apis/test-group/team-inventory';
import { useAuth } from "@/hooks/context/uesAuth";

export const useAddQuestion = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: addQuestionTeamInventoryMutation } = useMutation({
        mutationFn: (post_data) => addQuestionInTeamInventory({ token: auth?.token, logout,post_data},
        console.log("post_data",post_data,)
        ),
        onSuccess: (response) => {
            console.log('Successfully updated the TestGroup', response);
        },
        onError: (error) => {
            console.error('Failed to update the TestGroup', error);
        },
    });

    return {
        isPending,
        addQuestionTeamInventoryMutation,
    };
};
