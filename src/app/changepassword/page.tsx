// 'use client'

// import { Context } from '@/context/UserContext';
// import { changePassword } from '@/lib/user';
// import { useRouter } from 'next/navigation';
// import React, { useContext, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';

// export default function ChangePassword() {

//     let { setUserToken } = useContext<any>(Context)
//     let dispatch = useDispatch()
//     let router = useRouter()
//     let { responesData } = useSelector((state:any) => state.users)
//     console.log(responesData);
//     if (responesData?.message === 'success') {
//         localStorage.removeItem('userToken')
//         router.push('/login')
//         setUserToken(null)
//     }

//     function handleSubmit(e: Event):any {
//         e.preventDefault();
//         let data:any = {
//             password: e.target.password.value,
//             newPassword: e.target.rePassword.value,
//         }
//         dispatch<any>(changePassword(data));
//     }

//     return (<>
//     <div className='pt-28 pb-10'>
//         <div>
//         <h1 className='text-3xl p-3 text-center tracking-wider m-auto'>Change Password</h1>
//             <form onSubmit={handleSubmit} className="max-w-sm mx-auto border-2 p-5 rounded-lg ">
//                 <div className="mb-5">
//                     <input placeholder='Your Password' name='password' type="password" id="password" className="bg-gray-50 border border-gray-300  text-sm rounded-md block w-full p-3 mt-2" required />
//                 </div>
//                 <div className="mb-5">
//                 <input placeholder='Your New Password' name='rePassword' type="password" id="rePassword" className="bg-gray-50 border border-gray-300  text-sm rounded-md block w-full p-3 mt-2" required />
//                 </div>
//                 <button type="submit" className="text-white bg-gray-700 tracking-wide m-auto font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center flex justify-center">Change Password</button>
//             </form>
//         </div>
//     </div>
    
//     </>)
// }

'use client'

import { Context } from '@/context/UserContext';
import { changePassword } from '@/lib/user';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function ChangePassword() {
    let { setUserToken } = useContext<any>(Context)
    let dispatch = useDispatch()
    let router = useRouter()
    let { responesData } = useSelector((state:any) => state.users)
    console.log(responesData);
    if (responesData?.message === 'success') {
        localStorage.removeItem('userToken')
        router.push('/login')
        setUserToken(null)
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        let data = {
            password: target.password.value,
            newPassword: target.rePassword.value,
        }
        dispatch<any>(changePassword(data));
    }

    return (
        <div className='pt-28 pb-10'>
            <div>
                <h1 className='text-3xl p-3 text-center tracking-wider m-auto'>Change Password</h1>
                <form onSubmit={handleSubmit} className="max-w-sm mx-auto border-2 p-5 rounded-lg">
                    <div className="mb-5">
                        <input
                            placeholder='Your Password'
                            name='password'
                            type="password"
                            id="password"
                            className="bg-gray-50 border border-gray-300 text-sm rounded-md block w-full p-3 mt-2"
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <input
                            placeholder='Your New Password'
                            name='rePassword'
                            type="password"
                            id="rePassword"
                            className="bg-gray-50 border border-gray-300 text-sm rounded-md block w-full p-3 mt-2"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-gray-700 tracking-wide m-auto font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center flex justify-center"
                    >
                        Change Password
                    </button>
                </form>
            </div>
        </div>
    )
}
