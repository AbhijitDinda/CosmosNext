import {useQuery } from '@tanstack/react-query';
import { getCreateAssesmentsFieldsData } from '@/apis/assesments';
import { useAuth } from "@/hooks/context/uesAuth";

export const useCreateAssessmentData = () => {
    const {auth,logout} = useAuth();

    const {isFetching, isLoading, isError ,isSuccess,error,data:AssesmentsFieldsData } = useQuery({
        queryFn: () => getCreateAssesmentsFieldsData({ token: auth?.token,logout }),
        queryKey: ['getCreateAssesmentsFieldsData']
    })

    return{
        isFetching,
        isLoading,
        isSuccess,
        isError,
        error,
        AssesmentsFieldsData
    }
};