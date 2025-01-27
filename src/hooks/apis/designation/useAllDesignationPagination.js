import {useQuery } from '@tanstack/react-query';
import { getListOfDesignationpagination } from '@/apis/designation';
import { useAuth } from "@/hooks/context/uesAuth";

export const useAllDesignationPagination = (page) => {
    const {auth,logout} = useAuth();

    const {isFetching, isLoading, isError ,isSuccess,error,refetch,data:designationDataWithPagination } = useQuery({
        queryFn: () => getListOfDesignationpagination({ token: auth?.token,logout,page}),
        queryKey: ['getDesignationPagination',page]
    })
    // console.log("designationData",designationData);

    return{
        isFetching,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch,
        designationDataWithPagination
    }
};