import {useQuery } from '@tanstack/react-query';
import { getAllMotivationGroups } from '@/apis/test-group/motivation-drive';
import { useAuth } from "@/hooks/context/uesAuth";

export const useGetAllMotivationGroup = () => {
    const {auth,logout} = useAuth();

    const {isFetching, isLoading, isError ,isSuccess,error,data:allMotivationGroupData } = useQuery({
        queryFn: () => getAllMotivationGroups({token: auth?.token, logout}),
        queryKey: ['allMotivationGroup']
    })

    return{
        isFetching,
        isLoading,
        isSuccess,
        isError,
        error,
        allMotivationGroupData
    }
};