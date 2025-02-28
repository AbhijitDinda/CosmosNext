import { getSectionListInNumericalReasoning } from "@/apis/test-group/numerical-and-logical-reasoning";
import { useAuth } from "@/hooks/context/uesAuth";
import { useQuery } from "@tanstack/react-query";
export const useGetSectionList = () => {
  const { auth, logout } = useAuth();

  const {
    isFetching,
    isLoading,
    isError,
    isSuccess,
    error,
    data: sectionListData,
  } = useQuery({
    queryFn: () =>
      getSectionListInNumericalReasoning({ token: auth?.token, logout }),
    queryKey: ["numericalReasoningQuestionById"],
  });

  return {
    isFetching,
    isLoading,
    isSuccess,
    isError,
    error,
    sectionListData,
  };
};
