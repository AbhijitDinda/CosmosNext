import {useQuery } from '@tanstack/react-query';
import { getQuestionByIdInEmotionalIntelligence } from '@/apis/test-group/emotional-intelligence';
import { useAuth } from "@/hooks/context/uesAuth";

export const useGetQuestionById = (questionId) => {
    const {auth,logout} = useAuth();

    const {isFetching, isLoading, isError ,isSuccess,error,data:emotionalIntelligenceQuestionDataById } = useQuery({
        queryFn: () => getQuestionByIdInEmotionalIntelligence({token: auth?.token, logout,questionId}),
        queryKey: ['emotionalIntelligenceQuestionById']
    })

    return{
        isFetching,
        isLoading,
        isSuccess,
        isError,
        error,
        emotionalIntelligenceQuestionDataById
    }
};