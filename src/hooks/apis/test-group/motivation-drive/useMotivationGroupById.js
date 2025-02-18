import {useQuery } from '@tanstack/react-query';
import { getMotivationGroupById } from '@/apis/test-group/motivation-drive';
import { useAuth } from "@/hooks/context/uesAuth";

export const useMotivationGroupById = (groupId) => {
    const {auth,logout} = useAuth();

    const {isFetching, isLoading, isError ,isSuccess,error,data:motivationGroupDataById } = useQuery({
        queryFn: () => getMotivationGroupById({token: auth?.token, logout,groupId}),
        queryKey: ['motivationGroupById']
    })

    return{
        isFetching,
        isLoading,
        isSuccess,
        isError,
        error,
        motivationGroupDataById
    }
};