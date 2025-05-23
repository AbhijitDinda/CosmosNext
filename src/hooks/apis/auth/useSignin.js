import { useMutation } from '@tanstack/react-query';

import { signInRequest } from '@/apis/Auth';
import { useAuth } from "@/hooks/context/uesAuth";

export const useSignin = () => {
    const { setAuth } = useAuth();

    const { isPending, isSuccess, error, mutateAsync: signinMutation } = useMutation({
        mutationFn: signInRequest,
        // onSuccess: (response) => {
        //     console.log('Scuccessfully signed in', response);

        //     // const userObject = JSON.stringify(response.data);
            

        //     // localStorage.setItem('user', userObject);
        //     localStorage.setItem('token', response.token);
        //     setAuth({
        //         token: response.token,
        //     });


        // },
        onSuccess: (response) => {
            if (response?.token) {
                localStorage.setItem('token', response.token);
                setAuth({
                    token: response.token,
                });
            } else {
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