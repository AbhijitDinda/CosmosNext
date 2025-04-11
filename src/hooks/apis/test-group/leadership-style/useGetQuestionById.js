import {useQuery } from '@tanstack/react-query';
import { getQuestionById } from '@/apis/test-group/leadership-style';
import { useAuth } from "@/hooks/context/uesAuth";

export const useGetQuestionById = (questionId) => {
    const {auth,logout} = useAuth();

    const {isFetching, isLoading, isError ,isSuccess,error,data:LeadershipStyleQuestionDataById } = useQuery({
        queryFn: () => getQuestionById({token: auth?.token, logout,questionId}),
        queryKey: ['leadershipStyleQuestionById']
    })

    return{
        isFetching,
        isLoading,
        isSuccess,
        isError,
        error,
        LeadershipStyleQuestionDataById
    }
};