import {useQuery } from '@tanstack/react-query';
import { getListOfAssesments } from '@/apis/assesments';
import { useAuth } from "@/hooks/context/uesAuth";

export const useAllAssessments = (page) => {
    const {auth,logout} = useAuth();

    const {isFetching, isLoading, isError ,isSuccess,error,data:assessmentsData } = useQuery({
        queryFn: () => getListOfAssesments({ token: auth?.token },logout,page),
        queryKey: ['getAssesments',page]
    })

    return{
        isFetching,
        isLoading,
        isSuccess,
        isError,
        error,
        assessmentsData
    }
};