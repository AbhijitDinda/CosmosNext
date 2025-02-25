import {useQuery } from '@tanstack/react-query';
import { getSubQuestionById } from '@/apis/test-group/team-inventory';
import { useAuth } from "@/hooks/context/uesAuth";

export const useSubQuestionById = (SubQ_id) => {
    const {auth,logout} = useAuth();

    const {isFetching, isLoading, isError ,isSuccess,error,data:TeamInventorySubQuestionByIdData } = useQuery({
        queryFn: () => getSubQuestionById({token: auth?.token, logout,SubQ_id}),
        queryKey: ['teamInventorySubQuestionDataById']
    })

    return{
        isFetching,
        isLoading,
        isSuccess,
        isError,
        error,
        TeamInventorySubQuestionByIdData
    }
};