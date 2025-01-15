import { useMutation } from '@tanstack/react-query';

import { addAdmin } from '@/apis/admin-list';
import { useAuth } from "@/hooks/context/uesAuth";


export const useAddAdmin = () => {
    const {auth,logout} = useAuth();


    const { isPending, isSuccess, error, mutateAsync: addAdminMutation } = useMutation({
        mutationFn: (adminData) => addAdmin({ ...adminData, token: auth?.token ,logout }),
        onSuccess: (response) => {
            console.log('Scuccessfully Admin Added', response);
        },
        onError: (error) => {
            console.error('Failed to Add Admin', error);

        }
    });

    return {
        isPending,
        isSuccess,
        error,
        addAdminMutation
    };
};