import { useMutation } from '@tanstack/react-query';

import { signInRequest } from '@/apis/Auth';
import { useAuth } from "@/hooks/context/uesAuth";

export const useSignin = () => {
    const { setAuth } = useAuth();

    const { isPending, isSuccess, error, mutateAsync: signinMutation } = useMutation({
        mutationFn: signInRequest,

        onSuccess: (response) => {
            console.log('Successfully signed in', response);
        
            if (response?.token) {
                localStorage.setItem('token', response.token);
                setAuth({
                    token: response.token,
                });
            } else {
                // Show error or handle unexpected response format
                // console.error('Login failed: Token not received.');
                // You can optionally throw an error here to trigger onError
                throw new Error('Invalid credentials');
            }
        },

        
        onError: (error) => {
            console.log('Failed to sign in', error);

        }

        
    });

    return {
        isPending,
        isSuccess,
        error,
        signinMutation
    };
};