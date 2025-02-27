import {useQuery } from '@tanstack/react-query';
import { getQuestionByIdInNumericalReasoning } from '@/apis/test-group/numerical-and-logical-reasoning';
import { useAuth } from "@/hooks/context/uesAuth";

export const useQuestionById = (questionId) => {
    const {auth,logout} = useAuth();

    const {isFetching, isLoading, isError ,isSuccess,error,data:numericalReasoningQuestionDataById } = useQuery({
        queryFn: () => getQuestionByIdInNumericalReasoning({token: auth?.token, logout,questionId}),
        queryKey: ['numericalReasoningQuestionById']
    })

    return{
        isFetching,
        isLoading,
        isSuccess,
        isError,
        error,
        numericalReasoningQuestionDataById
    }
};