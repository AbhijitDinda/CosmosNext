import { useMutation } from '@tanstack/react-query';

import { updateDesignation } from '@/apis/designation';
import { useAuth } from "@/hooks/context/uesAuth";


export const useEditDesignation = () => {
    const {auth,logout} = useAuth();


    const { isPending, isSuccess, error, mutateAsync: EditDesignationMutation } = useMutation({
        mutationFn: (DesignationData) => {updateDesignation({ ...DesignationData, token: auth?.token ,logout }),
        console.log("khanki ",DesignationData)
    },
        onSuccess: (response) => {
            console.log('Scuccessfully Designation updated', response);
        },
        onError: (error) => {
            console.log('Failed to update Designation', error);
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        EditDesignationMutation
    };
};