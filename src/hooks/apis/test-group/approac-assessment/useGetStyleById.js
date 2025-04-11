import {useQuery } from '@tanstack/react-query';
import { getStyleById } from '@/apis/test-group/approach-assessment';
import { useAuth } from "@/hooks/context/uesAuth";

export const useGetStyleById = (id) => {
    const {auth,logout} = useAuth();

    const {isFetching, isLoading, isError ,isSuccess,error,data:approachStyleDataById } = useQuery({
        queryFn: () => getStyleById({token: auth?.token, logout,id}),
        queryKey: ['approachStyleById']
    })

    return{
        isFetching,
        isLoading,
        isSuccess,
        isError,
        error,
        approachStyleDataById
    }
};