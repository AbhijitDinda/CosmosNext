import { useMutation } from '@tanstack/react-query';

import { addDesignation } from '@/apis/designation';
import { useAuth } from "@/hooks/context/uesAuth";


export const useAddDesignation = () => {
    const {auth,logout} = useAuth();


    const { isPending, isSuccess, error, mutateAsync: addDesignationMutation } = useMutation({
        mutationFn: (designationData) => addDesignation({designationData, token: auth?.token, logout }),
        onSuccess: (response) => {
            console.log('Scuccessfully designation Added', response);
        },
        onError: (error) => {
            console.log('Failed to Add designation', error);

        }
    });

    return {
        isPending,
        isSuccess,
        error,
        addDesignationMutation
    };
};