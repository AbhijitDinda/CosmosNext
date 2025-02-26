import { useMutation } from '@tanstack/react-query';
import { editQuestion } from '@/apis/test-group/situational-judgement';
import { useAuth } from "@/hooks/context/uesAuth";

export const useEditQuestion = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: editQuestionMutationInSituationalJudgement } = useMutation({
        mutationFn: ({questionId, questionData}) => editQuestion({ token: auth?.token, logout,questionId, questionData},
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
        editQuestionMutationInSituationalJudgement,
    };
};
