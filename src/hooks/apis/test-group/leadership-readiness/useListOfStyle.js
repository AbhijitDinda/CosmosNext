import {useQuery } from '@tanstack/react-query';
import { getAllStylesInLeadershipReadiness } from '@/apis/test-group/leadership-readiness';
import { useAuth } from "@/hooks/context/uesAuth";

export const useListOfStyle = () => {
    const {auth,logout} = useAuth();

    const {isFetching, isLoading, isError ,isSuccess,error,data:allLeadershipStylesData } = useQuery({
        queryFn: () => getAllStylesInLeadershipReadiness({token: auth?.token, logout}),
        queryKey: ['allApproachStyle']
    })

    return{
        isFetching,
        isLoading,
        isSuccess,
        isError,
        error,
        allLeadershipStylesData
    }
};