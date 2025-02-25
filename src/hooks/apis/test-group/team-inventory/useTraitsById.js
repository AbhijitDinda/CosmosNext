import {useQuery } from '@tanstack/react-query';
import { getTraitById } from '@/apis/test-group/team-inventory';
import { useAuth } from "@/hooks/context/uesAuth";

export const useTraitsById = (traits_id) => {
    const {auth,logout} = useAuth();

    const {isFetching, isLoading, isError ,isSuccess,error,data:TeamInventoryTraitsByIdData } = useQuery({
        queryFn: () => getTraitById({token: auth?.token, logout,traits_id}),
        queryKey: ['teamInventoryTraitsDataById']
    })

    return{
        isFetching,
        isLoading,
        isSuccess,
        isError,
        error,
        TeamInventoryTraitsByIdData
    }
};