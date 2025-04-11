import {useQuery } from '@tanstack/react-query';
import { getQuestionByIdInLeadershipReadiness } from '@/apis/test-group/leadership-readiness';
import { useAuth } from "@/hooks/context/uesAuth";

export const useGetQuestionById = (questionId) => {
    const {auth,logout} = useAuth();

    const {isFetching, isLoading, isError ,isSuccess,error,data:LeadershipReadinessQuestionDataById } = useQuery({
        queryFn: () => getQuestionByIdInLeadershipReadiness({token: auth?.token, logout,questionId}),
        queryKey: ['leadershipReadinessQuestionById']
    })

    return{
        isFetching,
        isLoading,
        isSuccess,
        isError,
        error,
        LeadershipReadinessQuestionDataById
    }
};