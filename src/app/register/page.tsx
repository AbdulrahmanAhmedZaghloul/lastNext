'use client'

import { Button, TextField, Typography, IconButton, InputAdornment, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import CachedIcon from '@mui/icons-material/Cached';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';

export default function Register() {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);
    const router = useRouter();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowRePassword = () => setShowRePassword((show) => !show);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            dateOfBirth: '',
            gender: '',
        },
        onSubmit: registerNow,
    });

    async function registerNow(formValues: { name: string; email: string; password: string; rePassword: string; dateOfBirth: string; gender: string }) {
        setIsLoading(true);
        try {
            const response = await axios.post(`https://linked-posts.routemisr.com/users/signup`, formValues);
            console.log(response);
            setIsLoading(false);
            if (response.data.message === 'success') {
                router.push('/login');
            }
        } catch (err) {
            setIsLoading(false);
            console.log(err);
        }
    }

    return (
        <form onSubmit={formik.handleSubmit} className='flex shadow-md p-5 gap-5 w-full flex-col justify-center items-center lg:w-2/3 mx-auto mt-52 my-20'>
            <h1 className='text-5xl font-bold my-5 text-slate-800'>Register</h1>
            <div className='w-full md:w-1/2 lg:w-4/6'>
                <TextField name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} label='Enter Your Name' fullWidth />
            </div>
            <div className='w-full md:w-1/2 lg:w-4/6'>
                <TextField name='email' type='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} label='Enter Your Email' fullWidth />
            </div>
            <div className='w-full flex items-center justify-center flex-col gap-y-5 lg:flex-row'>
                <div className='w-full md:w-1/2 lg:w-2/6'>
                    <div className='p-1'>
                        <TextField
                            type={showPassword ? 'text' : 'password'}
                            name='password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            label='Enter Your Password'
                            fullWidth
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
                </div>
                <div className='w-full md:w-1/2 lg:w-2/6'>
                    <div className='p-1'>
                        <TextField
                            type={showRePassword ? 'text' : 'password'}
                            name='rePassword'
                            value={formik.values.rePassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            label='Enter Your RePassword'
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowRePassword}
                                            edge="end"
                                        >
                                            {showRePassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className='w-full md:w-1/2 lg:w-4/6'>
                <TextField type='date' name='dateOfBirth' value={formik.values.dateOfBirth} onChange={formik.handleChange} onBlur={formik.handleBlur} fullWidth />
            </div>
            <div className='w-full md:w-1/2 lg:w-4/6'>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="gender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                </RadioGroup>
            </div>
            <Button type='submit' variant="outlined" color='success'>{isLoading ? <CachedIcon /> : 'Register'}</Button>
            <span>You have an account? <Link href={'/login'} className='font-semibold'>Login now</Link></span>
        </form>
    );
}
