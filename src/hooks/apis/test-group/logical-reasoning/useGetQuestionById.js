import {useQuery } from '@tanstack/react-query';
import { getQuestionByIdInLogicalReasoning } from '@/apis/test-group/logical-reasoning';
import { useAuth } from "@/hooks/context/uesAuth";

export const useGetQuestionById = (questionId) => {
    const {auth,logout} = useAuth();

    const {isFetching, isLoading, isError ,isSuccess,error,data:logicalReasoningQuestionDataById } = useQuery({
        queryFn: () => getQuestionByIdInLogicalReasoning({token: auth?.token, logout,questionId}),
        queryKey: ['logicalReasoningQuestionById']
    })

    return{
        isFetching,
        isLoading,
        isSuccess,
        isError,
        error,
        logicalReasoningQuestionDataById
    }
};