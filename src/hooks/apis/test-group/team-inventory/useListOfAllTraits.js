import {useQuery } from '@tanstack/react-query';
import { getAllTraits } from '@/apis/test-group/team-inventory';
import { useAuth } from "@/hooks/context/uesAuth";

export const useListOfAllTraits = () => {
    const {auth,logout} = useAuth();

    const {isFetching, isLoading, isError ,isSuccess,error,data:allTraitsInTeamInventoryData } = useQuery({
        queryFn: () => getAllTraits({token: auth?.token, logout}),
        queryKey: ['allTraitsInTeamInventory']
    })

    return{
        isFetching,
        isLoading,
        isSuccess,
        isError,
        error,
        allTraitsInTeamInventoryData
    }
};