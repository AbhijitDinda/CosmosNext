import { useMutation } from "@tanstack/react-query";
import { deleteMotivationGroupInMotivationDrive } from "@/apis/test-group/motivation-drive";
import { useAuth } from "@/hooks/context/uesAuth";

export const useDeleteMotivationGroup = () => {
  const { auth, logout } = useAuth();

  const { isPending, mutateAsync: deleteMotivationGroupMutation } = useMutation(
    {
      mutationFn: (groupId) =>
        deleteMotivationGroupInMotivationDrive({
          token: auth?.token,
          logout,
          groupId,
        }),
      onSuccess: (response) => {
        console.log("Successfully Delete Motivation Group", response);
      },
      onError: (error) => {
        console.log("Failed to Delete Motivation Group", error);
      },
    }
  );

  return {
    isPending,
    deleteMotivationGroupMutation,
  };
};
