import {useQuery } from '@tanstack/react-query';
import { getListOfDesignation } from '@/apis/designation';
import { useAuth } from "@/hooks/context/uesAuth";

export const useAllDesignation = () => {
    const {auth,logout} = useAuth();

    const {isFetching, isLoading, isError ,isSuccess,error,data:designationData } = useQuery({
        queryFn: () => getListOfDesignation({ token: auth?.token },logout),
        queryKey: ['getDesignation']
    })

    return{
        isFetching,
        isLoading,
        isSuccess,
        isError,
        error,
        designationData
    }
};