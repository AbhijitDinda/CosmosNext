import {useQuery } from '@tanstack/react-query';
import { getQuestionByIdInVerbalReasoning } from '@/apis/test-group/verbal-reasoning';
import { useAuth } from "@/hooks/context/uesAuth";

export const useGetQuestionById = (questionId) => {
    const {auth,logout} = useAuth();

    const {isFetching, isLoading, isError ,isSuccess,error,data:verbalReasoningQuestionDataById } = useQuery({
        queryFn: () => getQuestionByIdInVerbalReasoning({token: auth?.token, logout,questionId}),
        queryKey: ['verbalReasoningQuestion']
    })

    return{
        isFetching,
        isLoading,
        isSuccess,
        isError,
        error,
        verbalReasoningQuestionDataById
    }
};