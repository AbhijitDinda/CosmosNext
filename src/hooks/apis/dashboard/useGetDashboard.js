import {useQuery } from '@tanstack/react-query';
import { getDashboardDetails } from '@/apis/dashboard';
import { useAuth } from "@/hooks/context/uesAuth";
import { unauthorizedErrorResponse } from "@/utils/Responseobj/responseObject";
export const useGetDashboard = () => {
    const {auth,logout} = useAuth();


    const {isFetching,isSuccess,error,data:dashboardData } = useQuery({
        queryFn: () => getDashboardDetails({ token: auth?.token },logout),
        queryKey: ['getDashboard']
        


    })

    return{
        isFetching,
        isSuccess,
        error,
        dashboardData
    }
};