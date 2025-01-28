import { useQuery } from '@tanstack/react-query';
import { compareAssessmentUser } from '@/apis/assesments';
import { useAuth } from "@/hooks/context/uesAuth";

export const useAssessmentCompareUser = (assessment_id) => {
    const { auth, logout } = useAuth();

    const {
        isFetching,
        isLoading,
        isError,
        isSuccess,
        error,
        data: compareUserOfAssesments,
    } = useQuery({
        queryFn: () => compareAssessmentUser({ token: auth?.token, logout, assessment_id }),
        queryKey: ['getUserOfAssesments', assessment_id],
        enabled: !!assessment_id, // Fetch only if `assessment_id` is valid
    });

    return {
        isFetching,
        isLoading,
        isSuccess,
        isError,
        error,
        compareUserOfAssesments
    };
};
