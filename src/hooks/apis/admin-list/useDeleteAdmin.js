import { useMutation } from '@tanstack/react-query';
import { deleteAdmin } from '@/apis/admin-list';
import { useAuth } from "@/hooks/context/uesAuth";

export const useDeleteAdmin = () => {
    const { auth, logout } = useAuth();

    const { isLoading: isPending, isSuccess, error, mutateAsync: deleteAdminMutation } = useMutation({
        mutationFn: (adminId) => deleteAdmin({ token: auth?.token, logout, admin_id: adminId }),
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
        deleteAdminMutation
    };
};