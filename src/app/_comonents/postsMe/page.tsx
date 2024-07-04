'use client'
import React, { useEffect, useState } from 'react'
import { createPosts, deletePost, getUserPosts, setTimeForAddComment } from '../../../lib/posts';
import { changeProfilePhoto, getUserInfo } from '../../../lib/user';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../../../lib/posts';
import { Alert } from '@mui/material';
import { deleteComment, setTimeForDelete, setTimeForUpdate, updateComment } from '@/lib/comments';
import CheckIcon from '@mui/icons-material/Check';
import Image from 'next/image';
import type { RootState } from '@/lib/store'; // Adjust the path to your store

export default function PostsMe() {
    const { userInfo, userPhoto, isUpload } = useSelector((state: RootState) => state.users);
    const { userPosts, isCreate, addedComment } = useSelector((state: RootState) => state.posts);
    const { isUpdateComment, isDeleteComment } = useSelector((state: RootState) => state.comments);

    const dispatch = useDispatch()
    const [btn, setBtn] = useState<any>(true)
    const [updatebtn, setUpdatebtnBtn] = useState<any>(false)
    const [updatevalue, setUpdateValue] = useState<any>(null)
    const [content, setContent] = useState<any>(null)

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    dispatch<any>(createPosts(formData));
}

function handleProfilePhoto(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    dispatch<any>(changeProfilePhoto(formData));
}
    function makeComment(e: React.FormEvent<HTMLFormElement>): any {
        e.preventDefault();
        const data:any = {
            content: (e.target as any).content.value,
            post: (e.target as any).id.value
        };
        dispatch<any>(createComment(data))
        setTimeout(() => { dispatch<any>(setTimeForAddComment()) }, 2000)
    }

    function prepareUpdate(commentId: any): any {
        setBtn(false)
        setUpdatebtnBtn(true)
        setUpdateValue(commentId)
    }

    function test(e: React.ChangeEvent<HTMLInputElement>) {
        setContent(e.target.value)
    }

    function updateContact() {
        setBtn(true);
        setUpdatebtnBtn(false)
        const dataa:any = {
            updatevalue: updatevalue,
            content: content
        };
        dispatch<any>(updateComment(dataa));
        setTimeout(() => { dispatch(setTimeForUpdate()) }, 2000)
    }

    function closeUpdate() {
        setUpdatebtnBtn(false);
        setBtn(true);
    }

    function deleteContent(commentId: any) {
        dispatch<any>(deleteComment(commentId))
        setTimeout(() => { dispatch(setTimeForDelete()) }, 2000)
    }

    function deletePosts(postId: any) {
        dispatch<any>(deletePost(postId))
    }

    useEffect(() => {
        dispatch<any>(getUserInfo())
        dispatch<any>(getUserPosts(userInfo?._id))
    }, [userPhoto, userInfo?._id, userPosts, dispatch])

    return (
        <div className="flex shadow justify-between items-center py-7 my-16">
            <div className='w-1/2 p-10 m-auto flex justify-center items-center flex-col'>
                <Link href={'/changepassword'} className="py-2 w-1/2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ">Change Password</Link>
            </div>
            <div className='w-1/2 m-auto flex justify-center items-center flex-col'>
                {isUpload ? <Alert sx={{ mt: '10px' }} icon={<CheckIcon fontSize="inherit" />} severity="success">
                    Profile Photo Upload Successful
                </Alert> : null}
                <Image width={100} height={100} src={userInfo?.photo} alt="image" />
                <h5 className="mb-1 text-sm font-medium text-gray-900 ">{userInfo?.name}</h5>
            </div>
        </div>
    )
}
