import {useQuery } from '@tanstack/react-query';
import { getAllCandidates } from '@/apis/candidates';
import { useAuth } from "@/hooks/context/uesAuth";
export const useAllcandidates = () => {
    const {auth,logout} = useAuth();


    const {isFetching,isLoading,isSuccess,error,data:allCandidatesData } = useQuery({
        queryFn: () => getAllCandidates({ token: auth?.token },logout),
        queryKey: ['getCandidates']
        
    })

    return{
        isFetching,
        isLoading,
        isSuccess,
        error,
        allCandidatesData
    }
};