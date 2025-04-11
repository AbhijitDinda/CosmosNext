import {useQuery } from '@tanstack/react-query';
import { getListOfStyles } from '@/apis/test-group/approach-assessment';
import { useAuth } from "@/hooks/context/uesAuth";

export const useListOfStyle = () => {
    const {auth,logout} = useAuth();

    const {isFetching, isLoading, isError ,isSuccess,error,data:allStyleData } = useQuery({
        queryFn: () => getListOfStyles({token: auth?.token, logout}),
        queryKey: ['allStyle']
    })

    return{
        isFetching,
        isLoading,
        isSuccess,
        isError,
        error,
        allStyleData
    }
};