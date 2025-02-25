import {useQuery } from '@tanstack/react-query';
import { getAllQuestions } from '@/apis/test-group/team-inventory';
import { useAuth } from "@/hooks/context/uesAuth";

export const useListOfAllQuestion = () => {
    const {auth,logout} = useAuth();

    const {isFetching, isLoading, isError ,isSuccess,error,data:allQuestionInTeamInventoryData } = useQuery({
        queryFn: () => getAllQuestions({token: auth?.token, logout}),
        queryKey: ['allQuestionInTeamInventory']
    })

    return{
        isFetching,
        isLoading,
        isSuccess,
        isError,
        error,
        allQuestionInTeamInventoryData
    }
};