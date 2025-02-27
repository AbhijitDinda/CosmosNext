import {useQuery } from '@tanstack/react-query';
import { getSectionByIdInNumericalReasoning } from '@/apis/test-group/numerical-and-logical-reasoning';
import { useAuth } from "@/hooks/context/uesAuth";

export const useSectionById = (sectionId) => {
    const {auth,logout} = useAuth();

    const {isFetching, isLoading, isError ,isSuccess,error,data:numericalReasoningSectionDataById } = useQuery({
        queryFn: () => getSectionByIdInNumericalReasoning({token: auth?.token, logout,sectionId}),
        queryKey: ['numericalReasoningSectionById']
    })

    return{
        isFetching,
        isLoading,
        isSuccess,
        isError,
        error,
        numericalReasoningSectionDataById
    }
};