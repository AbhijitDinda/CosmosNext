import { useMutation } from '@tanstack/react-query';

import { editAdmin } from '@/apis/admin-list';
import { useAuth } from "@/hooks/context/uesAuth";


export const useEditAdmin = () => {
    const {auth,logout} = useAuth();


    const { isPending, isSuccess, error, mutateAsync: EditAdminMutation } = useMutation({
        mutationFn: (adminData) => editAdmin({ ...adminData, token: auth?.token ,logout }),
        onSuccess: (response) => {
            console.log('Scuccessfully Admin updated', response);
        },
        onError: (error) => {
            console.log('Failed to update Admin', error);
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        EditAdminMutation
    };
};