import {useQuery } from '@tanstack/react-query';
import { getQuestionById } from '@/apis/test-group/motivation-drive';
import { useAuth } from "@/hooks/context/uesAuth";

export const useQuestionById = (questionId) => {
    const {auth,logout} = useAuth();

    const {isFetching, isLoading, isError ,isSuccess,error,data:motivationQuestionDataById } = useQuery({
        queryFn: () => getQuestionById({token: auth?.token, logout,questionId}),
        queryKey: ['motivationQuestionById']
    })

    return{
        isFetching,
        isLoading,
        isSuccess,
        isError,
        error,
        motivationQuestionDataById
    }
};