import { useMutation } from '@tanstack/react-query'; // Fix import for useMutation
import { addSubQuestionInTeamInventory } from '@/apis/test-group/team-inventory';
import { useAuth } from "@/hooks/context/uesAuth";

export const useAddSubQuestion = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: addSubQuestionTeamInventoryMutation } = useMutation({
        mutationFn: (post_data) => addSubQuestionInTeamInventory({ token: auth?.token, logout,post_data},
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
        addSubQuestionTeamInventoryMutation,
    };
};
