import {useQuery } from '@tanstack/react-query';
import { getAllCandidates } from '@/apis/candidates';
import { useAuth } from "@/hooks/context/uesAuth";

export const useAllcandidates = (page) => {
    const {auth,logout} = useAuth();
    const {isFetching,isLoading,isSuccess,isError,error,data:allCandidatesData } = useQuery({
        queryFn: () => getAllCandidates({ token: auth?.token },logout,page),
        queryKey: ["getCandidates", page],
        retry: false,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
        
    });
    return{
        isFetching,
        isLoading,
        isSuccess,
        isError,
        error,
        allCandidatesData
    }
};