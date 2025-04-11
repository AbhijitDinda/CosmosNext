import {useQuery } from '@tanstack/react-query';
import { getAllStyles } from '@/apis/test-group/leadership-style';
import { useAuth } from "@/hooks/context/uesAuth";

export const useListOfStyle = () => {
    const {auth,logout} = useAuth();

    const {isFetching, isLoading, isError ,isSuccess,error,data:allLeadershipStylesData } = useQuery({
        queryFn: () => getAllStyles({token: auth?.token, logout}),
        queryKey: ['allStyleInLeadershipStyle']
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