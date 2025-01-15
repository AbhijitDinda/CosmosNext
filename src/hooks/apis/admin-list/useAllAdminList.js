import {useQuery } from '@tanstack/react-query';
import { getTestGroup } from '@/apis/admin-list';
import { useAuth } from "@/hooks/context/uesAuth";

export const useAllAdminList = (page) => {
    const {auth,logout} = useAuth();

    const {isFetching, isLoading, isError ,isSuccess,error,data:adminData } = useQuery({
        queryFn: () => getTestGroup({ token: auth?.token },logout,page),
        queryKey: ['getAdmin',page]
    })

    return{
        isFetching,
        isLoading,
        isSuccess,
        isError,
        error,
        adminData
    }
};