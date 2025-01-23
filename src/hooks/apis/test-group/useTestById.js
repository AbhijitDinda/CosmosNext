import {useQuery } from '@tanstack/react-query';
import { fatchTestGroupById } from '@/apis/test-group';
import { useAuth } from "@/hooks/context/uesAuth";

export const useTestById = (test_id) => {
    const {auth,logout} = useAuth();

    const {isFetching, isLoading, isError ,isSuccess,error,data:testsDataById } = useQuery({
        queryFn: () => fatchTestGroupById({ token: auth?.token ,logout,test_id }),
        queryKey: ['getTestById']
    })

    return{
        isFetching,
        isLoading,
        isError,
        isSuccess,
        error,
        testsDataById
    }
};