import { useQuery } from '@tanstack/react-query';
import { getAssessmentsAllUser } from '@/apis/assesments';
import { useAuth } from "@/hooks/context/uesAuth";

export const useAllUserOfAssesment = (assessment_id) => {
    const { auth, logout } = useAuth();

    const {
        isFetching,
        isLoading,
        isError,
        isSuccess,
        error,
        data: userOfAssesments,
    } = useQuery({
        queryFn: () => getAssessmentsAllUser({ token: auth?.token, logout, assessment_id }),
        queryKey: ['getUserOfAssesments', assessment_id],
        enabled: !!assessment_id, // Fetch only if `assessment_id` is valid
    });

    return {
        isFetching,
        isLoading,
        isSuccess,
        isError,
        error,
        userOfAssesments,
    };
};
