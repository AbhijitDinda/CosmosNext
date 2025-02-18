import { useMutation } from '@tanstack/react-query'; // Fix import for useMutation
import { editSubQuestionInTeamInventory } from '@/apis/test-group/team-inventory';
import { useAuth } from "@/hooks/context/uesAuth";

export const useEditSubQuestion = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: editSubQuestionTeamInventoryMutation } = useMutation({
        mutationFn: ({post_data,SubQ_id}) => editSubQuestionInTeamInventory({ token: auth?.token, logout,post_data,SubQ_id},
        ),
        onSuccess: (response) => {
            console.log('Successfully updated the Team Invo sub Question', response);
        },
        onError: (error) => {
            console.error('Failed to update the Team Invo sub Question', error);
        },
    });

    return {
        isPending,
        editSubQuestionTeamInventoryMutation,
    };
};
