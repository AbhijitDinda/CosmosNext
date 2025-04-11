import { useMutation } from '@tanstack/react-query'; // Fix import for useMutation
import { editQuestionInTeamInventory } from '@/apis/test-group/team-inventory';
import { useAuth } from "@/hooks/context/uesAuth";

export const useEditQuestion = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: editQuestionTeamInventoryMutation } = useMutation({
        mutationFn: ({post_data,q_id}) => editQuestionInTeamInventory({ token: auth?.token, logout,post_data,q_id},
        ),
        onSuccess: (response) => {
            console.log('Successfully updated the Team Invo Question', response);
        },
        onError: (error) => {
            console.error('Failed to update the Team Invo Question', error);
        },
    });

    return {
        isPending,
        editQuestionTeamInventoryMutation,
    };
};
