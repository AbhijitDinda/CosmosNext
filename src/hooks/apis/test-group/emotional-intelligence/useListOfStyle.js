import {useQuery } from '@tanstack/react-query';
import { getAllApproachStylesInEmotionalIntelligence } from '@/apis/test-group/emotional-intelligence';
import { useAuth } from "@/hooks/context/uesAuth";

export const useListOfStyle = () => {
    const {auth,logout} = useAuth();

    const {isFetching, isLoading, isError ,isSuccess,error,data:allApproachStylesData } = useQuery({
        queryFn: () => getAllApproachStylesInEmotionalIntelligence({token: auth?.token, logout}),
        queryKey: ['allApproachStyle']
    })

    return{
        isFetching,
        isLoading,
        isSuccess,
        isError,
        error,
        allApproachStylesData
    }
};