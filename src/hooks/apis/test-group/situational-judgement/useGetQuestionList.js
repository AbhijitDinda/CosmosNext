import {useQuery } from '@tanstack/react-query';
import { getSpecificGroupData } from '@/apis/test-group/situational-judgement';
import { useAuth } from "@/hooks/context/uesAuth";

export const useGetQuestionList = (groupId) => {
    const {auth,logout} = useAuth();

    const {isFetching, isLoading, isError ,isSuccess,error,data:GroupQuestionData } = useQuery({
        queryFn: () => getSpecificGroupData({token: auth?.token, logout,groupId}),
        queryKey: ['getGroupAllQuestion']
    })

    return{
        isFetching,
        isLoading,
        isSuccess,
        isError,
        error,
        GroupQuestionData
    }
};