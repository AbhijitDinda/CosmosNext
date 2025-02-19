import {useQuery } from '@tanstack/react-query';
import { getStyleByIdInLeadershipReadiness } from '@/apis/test-group/leadership-readiness';
import { useAuth } from "@/hooks/context/uesAuth";

export const useGetStyleById = (styleId) => {
    const {auth,logout} = useAuth();

    const {isFetching, isLoading, isError ,isSuccess,error,data:LeadershipReadinessStyleDataById } = useQuery({
        queryFn: () => getStyleByIdInLeadershipReadiness({token: auth?.token, logout,styleId}),
        queryKey: ['leadershipReadinessStyleById']
    })

    return{
        isFetching,
        isLoading,
        isSuccess,
        isError,
        error,
        LeadershipReadinessStyleDataById
    }
};