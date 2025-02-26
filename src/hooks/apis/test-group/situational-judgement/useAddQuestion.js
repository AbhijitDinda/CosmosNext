import {useQuery } from '@tanstack/react-query';
import { addQuestion } from '@/apis/test-group/situational-judgement';
import { useAuth } from "@/hooks/context/uesAuth";

export const useAddQuestion = () => {
    const { auth, logout } = useAuth();

    const { isPending, mutateAsync: addQuestionMutationInSituationalJudgement } = useMutation({
        mutationFn: (questionData) => addQuestion({ token: auth?.token, logout,questionData},
        ),
        onSuccess: (response) => {
            console.log('Successfully updated the Question Situational Judgement', response);
        },
        onError: (error) => {
            console.error('Failed to update the Question Situational Judgement', error);
        },
    });

    return {
        isPending,
        addQuestionMutationInSituationalJudgement,
    };
};