import { useQuery } from '@tanstack/react-query';
import { getTestReport } from '@/apis/result';
import { useAuth } from "@/hooks/context/uesAuth";

export const useTestReport = ({ test_token, candidate_id }) => {
    const { auth, logout } = useAuth();

    const { isFetching, isLoading, isError, isSuccess, error, data: TestReport } = useQuery({
        queryFn: () => getTestReport({ token: auth?.token, logout, test_token, candidate_id }),
        queryKey: ['getTestReport', test_token, candidate_id]
    });

    return {
        isFetching,
        isLoading,
        isSuccess,
        isError,
        error,
        TestReport
    };
};
