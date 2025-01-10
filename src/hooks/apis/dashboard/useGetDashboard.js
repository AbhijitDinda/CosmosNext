import {useQuery } from '@tanstack/react-query';
import { getDashboardDetails } from '@/apis/dashboard';
import { useAuth } from "@/hooks/context/uesAuth";

export const useGetDashboard = () => {
    const { auth } = useAuth();


    const {isFetching,isSuccess,error,data:dashboardData } = useQuery({
        queryFn:()=> getDashboardDetails({token:auth?.token}),
        queryKey:'getDashboard',
        // staleTime:30000

    })

    return{
        isFetching,
        isSuccess,
        error,
        dashboardData
    }
};