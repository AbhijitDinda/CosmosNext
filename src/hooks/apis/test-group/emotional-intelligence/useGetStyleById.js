import {useQuery } from '@tanstack/react-query';
import { getApproachStyleByIdInEmotionalIntelligence } from '@/apis/test-group/emotional-intelligence';
import { useAuth } from "@/hooks/context/uesAuth";

export const useGetStyleById = (groupId) => {
    const {auth,logout} = useAuth();

    const {isFetching, isLoading, isError ,isSuccess,error,data:emotionalIntelligenceStyleDataById } = useQuery({
        queryFn: () => getApproachStyleByIdInEmotionalIntelligence({token: auth?.token, logout,groupId}),
        queryKey: ['emotionalIntelligenceStyleById']
    })

    return{
        isFetching,
        isLoading,
        isSuccess,
        isError,
        error,
        emotionalIntelligenceStyleDataById
    }
};