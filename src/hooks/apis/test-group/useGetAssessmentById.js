import {useQuery } from '@tanstack/react-query';
import { fatchAssessmentById } from '@/apis/test-group';
import { useAuth } from "@/hooks/context/uesAuth";

export const useGetAssessmentById = (assessment_id, enabled) => {
    // console.log("assessment_id",assessment_id)
    const { auth, logout } = useAuth();

    const { isFetching, isLoading, isError, isSuccess, error,refetch, data: assessmentByIdData } = useQuery({
        queryFn: () => fatchAssessmentById({ token: auth?.token }, logout, assessment_id),
        queryKey: ['getAssessmentById', assessment_id],
        enabled: Boolean(enabled),
    });

    return{
        isFetching,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch,
        assessmentByIdData
    }
};