import { useMutation } from '@tanstack/react-query';
import { deleteDesignationapi } from '@/apis/designation';
import { useAuth } from "@/hooks/context/uesAuth";

export const useDeleteDesignation = () => {
    const { auth, logout } = useAuth();

    const { isLoading: isPending, isSuccess, error, mutateAsync: deleteDesignation } = useMutation({
        mutationFn: (designationId) => deleteDesignationapi({designationId, token: auth?.token, logout }),
        onSuccess: (response) => {

            console.log('Successfully Admin Deleted', response);
        },
        onError: (error) => {

            console.log('Failed to Delete Admin', error);
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        deleteDesignation
    };
};