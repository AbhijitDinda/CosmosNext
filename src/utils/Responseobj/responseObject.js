

export const unauthorizedErrorResponse = async (error,logout) => {

    if (error.response?.status === 401) {
        await logout();

        // localStorage.removeItem('token');
        // setAuth({
        //     token: null
        // })

    }

};
