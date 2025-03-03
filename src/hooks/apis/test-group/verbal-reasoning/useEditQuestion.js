import { useMutation } from '@tanstack/react-query';
import { updateQuestionByIdInVerbalReasoning } from '@/apis/test-group/verbal-reasoning';
import { useAuth } from "@/hooks/context/uesAuth";

export const useEditQuestion = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: editQuestionMutationInVerbalReasoning } = useMutation({
        mutationFn: ({questionId, update_data}) => updateQuestionByIdInVerbalReasoning({ token: auth?.token, logout,questionId, update_data},
        ),
        onSuccess: (response) => {
            console.log('Successfully Edit Question', response);
        },
        onError: (error) => {
            console.error('Failed to  Edit Question', error);
        },
    });

    return {
        isPending,
        editQuestionMutationInVerbalReasoning,
    };
};
