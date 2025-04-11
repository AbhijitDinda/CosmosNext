import {useQuery } from '@tanstack/react-query';
import { getStyleById } from '@/apis/test-group/leadership-style';
import { useAuth } from "@/hooks/context/uesAuth";

export const useGetStyleById = (styleId) => {
    const {auth,logout} = useAuth();

    const {isFetching, isLoading, isError ,isSuccess,error,data:LeadershipStyleStyleDataById } = useQuery({
        queryFn: () => getStyleById({token: auth?.token, logout,styleId}),
        queryKey: ['leadershipStyleStyleById']
    })

    return{
        isFetching,
        isLoading,
        isSuccess,
        isError,
        error,
        LeadershipStyleStyleDataById
    }
};