import { useMutation } from "@tanstack/react-query";
import { deleteStyleInApproach } from "@/apis/test-group/approach-assessment";
import { useAuth } from "@/hooks/context/uesAuth";

export const useDeleteStyle = () => {
  const { auth, logout } = useAuth();

  const { isPending, mutateAsync: deleteStyleMutation } = useMutation({
    mutationFn: (id) =>
      deleteStyleInApproach({ token: auth?.token, logout, id }),
    onSuccess: (response) => {
      console.log("Successfully Style Deleted", response);
    },
    onError: (error) => {
      console.log("Failed to Delete Style", error);
    },
  });

  return {
    isPending,
    deleteStyleMutation,
  };
};
