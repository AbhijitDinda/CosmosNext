import { useMutation } from '@tanstack/react-query';
import { getDesignationChart } from '@/apis/dashboard';
import { useAuth } from "@/hooks/context/uesAuth"; 

export const useDesginationChart = () => {
    const { auth, logout } = useAuth();

    const { isLoading, mutateAsync: getSpecificDesignationChart } = useMutation({
        mutationFn: (designation_name) => getDesignationChart(designation_name, {token:auth?.token}, logout),
        onSuccess: (response) => {
            console.log('Successfully Fetched chart', response);
        },
        onError: (error) => {
            console.log('Failed to Fetch chart', error);
        }
    });

    return {
        isLoading,
        getSpecificDesignationChart
    };
};
