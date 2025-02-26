import {useQuery } from '@tanstack/react-query';
import { getQuestionById } from '@/apis/test-group/situational-judgement';
import { useAuth } from "@/hooks/context/uesAuth";

export const useGetQuestionById = (questionId) => {
    const {auth,logout} = useAuth();

    const {isFetching, isLoading, isError ,isSuccess,error,data:SituationalJudgementQuestionDataById } = useQuery({
        queryFn: () => getQuestionById({token: auth?.token, logout,questionId}),
        queryKey: ['SituationalJudgementQuestion']
    })

    return{
        isFetching,
        isLoading,
        isSuccess,
        isError,
        error,
        SituationalJudgementQuestionDataById
    }
};