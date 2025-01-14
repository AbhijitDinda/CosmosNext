import {useQuery } from '@tanstack/react-query';
import { getTestGroup } from '@/apis/test-group';
import { useAuth } from "@/hooks/context/uesAuth";

export const useAllDesignation = (search,page) => {
    const {auth,logout} = useAuth();

    const {isFetching, isLoading, isError ,isSuccess,error,data:testsData } = useQuery({
        queryFn: () => getTestGroup({ token: auth?.token },logout,search,page),
        queryKey: ['getTests',search,page]
    })

    return{
        isFetching,
        isLoading,
        isSuccess,
        isError,
        error,
        testsData
    }
};