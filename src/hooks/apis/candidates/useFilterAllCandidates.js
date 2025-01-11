import { useQuery } from '@tanstack/react-query';
import { filterAllCandidates } from '@/apis/candidates';
import { useAuth } from "@/hooks/context/uesAuth";

export const useFilterAllCandidates = ( {search = "", designation = "", status = "",page} ) => {
    // console.log("inside",search,designation)
    const { auth, logout } = useAuth();

    const { 
        isFetching, 
        isLoading, 
        isSuccess, 
        error, 
        data: filterCandidateData 
    } = useQuery({
        queryFn: () => filterAllCandidates({ token: auth?.token}, logout, search, designation, status,page ),
        queryKey: ["getCandidates", search, designation, status,page], // Add parameters to the query key to refetch on changes
        keepPreviousData: true,
    });

    return {
        isFetching,
        isLoading,
        isSuccess,
        error,
        filterCandidateData
    };
};
