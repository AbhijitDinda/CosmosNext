import { useMutation } from '@tanstack/react-query';

import { CreateAssessment } from '@/apis/assesments';
import { useAuth } from "@/hooks/context/uesAuth";


export const useCreateAssessment = () => {
    const {auth,logout} = useAuth();

    const { isLoading, isSuccess, error, mutateAsync: createAssessmentMutation } = useMutation({
        mutationFn: (assessmentData) => CreateAssessment({ ...assessmentData, token: auth?.token ,logout }),
        onSuccess: (response) => {
            console.log('Successfully Assessment Created', response);
        },
        onError: (error) => {
            console.log('Failed to create Assessment', error);
        }
    });

    return {
        isLoading,
        isSuccess,
        error,
        createAssessmentMutation
    };
};