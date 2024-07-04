



// 'use client'

// import { Alert, Button, TextField, IconButton, InputAdornment, Typography } from '@mui/material';
// import { useFormik } from 'formik';
// import { Context } from '@/context/UserContext';
// import { useContext, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import CachedIcon from '@mui/icons-material/Cached';
// import Link from 'next/link';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import axios from 'axios';

// export default function Login() {
//     const { setUserToken } = useContext<any>(Context);
//     const [apiError, setApiError] = useState<string | undefined>();
//     const router = useRouter();
//     const [isLoading, setIsLoading] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);

//     const handleClickShowPassword = () => setShowPassword((show) => !show);

//     const formik = useFormik<any>({
//         initialValues: {
//             email: '',
//             password: '',
//         },
//         onSubmit: loginNow,
//     });

//     async function loginNow(formValues: { email: string; password: string }) {
//         setIsLoading(true);
//         try {
//             const response = await axios.post(`https://linked-posts.routemisr.com/users/signin`, formValues);
//             setIsLoading(false);
//             if (response.data.message === 'success') {
//                 localStorage.setItem('userToken', response.data.token);
//                 setUserToken(response.data.token);
//                 router.push('/');
//             }
//         } catch (err) {
//             setIsLoading(false);
//             setApiError(err.response?.data?.error);
//             formik.setFieldValue('password', '');
//         }
//     }

//     return (
//         <form onSubmit={formik.handleSubmit} className='flex shadow-md p-5 gap-5 w-full flex-col justify-center items-center lg:w-2/3 mx-auto mt-52 my-20'>
//             {apiError && <Alert severity="error">{apiError}</Alert>}
//             <h1 className='text-5xl font-bold my-5 text-slate-800'>Login</h1>
//             <div className='w-full md:w-1/2 lg:w-4/6'>
//                 <TextField
//                     name='email'
//                     type='email'
//                     value={formik.values.email}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     label='Enter Your Email'
//                     fullWidth
//                     autoComplete="email"
//                 />
//             </div>
//             <div className='w-full md:w-1/2 lg:w-4/6'>
//                 <TextField
//                     type={showPassword ? 'text' : 'password'}
//                     name='password'
//                     value={formik.values.password}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     label='Enter Your Password'
//                     fullWidth
//                     autoComplete="current-password"
//                     InputProps={{
//                         endAdornment: (
//                             <InputAdornment position="end">
//                                 <IconButton
//                                     aria-label="toggle password visibility"
//                                     onClick={handleClickShowPassword}
//                                     edge="end"
//                                 >
//                                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                                 </IconButton>
//                             </InputAdornment>
//                         ),
//                     }}
//                 />
//             </div>
//             <Button type='submit' variant="outlined" color='success'>
//                 {isLoading ? <CachedIcon /> : 'Login'}
//             </Button>
//             <span>Don t have an account yet? <Link href={'/register'} className='font-semibold'>Register now</Link></span>
//         </form>
//     );
// }





'use client'

import { Alert, Button, TextField, IconButton, InputAdornment, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { Context } from '@/context/UserContext';
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import CachedIcon from '@mui/icons-material/Cached';
import Link from 'next/link';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';

export default function Login() {
    const { setUserToken } = useContext<any>(Context);
    const [apiError, setApiError] = useState<string | undefined>();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const formik = useFormik<any>({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: loginNow,
    });

    async function loginNow(formValues: { email: string; password: string }) {
        setIsLoading(true);
        try {
            const response = await axios.post(`https://linked-posts.routemisr.com/users/signin`, formValues);
            setIsLoading(false);
            if (response.data.message === 'success') {
                localStorage.setItem('userToken', response.data.token);
                setUserToken(response.data.token);
                router.push('/');
            }
        } catch (erreo:any) {
            setIsLoading(false);
            setApiError(erreo.response?.data?.error);
            formik.setFieldValue('password', '');
        }
    }

    return (
        <form onSubmit={formik.handleSubmit} className='flex shadow-md p-5 gap-5 w-full flex-col justify-center items-center lg:w-2/3 mx-auto mt-52 my-20'>
            {apiError && <Alert severity="error">{apiError}</Alert>}
            <h1 className='text-5xl font-bold my-5 text-slate-800'>Login</h1>
            <div className='w-full md:w-1/2 lg:w-4/6'>
                <TextField
                    name='email'
                    type='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label='Enter Your Email'
                    fullWidth
                    autoComplete="email"
                />
            </div>
            <div className='w-full md:w-1/2 lg:w-4/6'>
                <TextField
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label='Enter Your Password'
                    fullWidth
                    autoComplete="current-password"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
            <Button type='submit' variant="outlined" color='success'>
                {isLoading ? <CachedIcon /> : 'Login'}
            </Button>
            <span>Don&apos;t have an account yet? <Link href={'/register'} className='font-semibold'>Register now</Link></span>
        </form>
    );
}
