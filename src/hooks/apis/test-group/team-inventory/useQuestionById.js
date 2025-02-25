import {useQuery } from '@tanstack/react-query';
import { getQuestionById } from '@/apis/test-group/team-inventory';
import { useAuth } from "@/hooks/context/uesAuth";

export const useQuestionById = (q_id) => {
    const {auth,logout} = useAuth();

    const {isFetching, isLoading, isError ,isSuccess,error,data:TeamInventoryQuestionByIdData } = useQuery({
        queryFn: () => getQuestionById({token: auth?.token, logout,q_id}),
        queryKey: ['teamInventoryQuestionDataById']
    })

    return{
        isFetching,
        isLoading,
        isSuccess,
        isError,
        error,
        TeamInventoryQuestionByIdData
    }
};