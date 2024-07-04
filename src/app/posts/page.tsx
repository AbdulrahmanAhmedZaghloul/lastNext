'use client';
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, deletePost, getAllPosts, setTimeForAddComment, updatePost } from '@/lib/posts';
import { Alert, Box, Button,  TextField, CircularProgress, IconButton } from '@mui/material';
import { deleteComment, setTimeForDelete, setTimeForUpdate, updateComment } from '@/lib/comments';
import { getUserInfo } from '@/lib/user';
import CheckIcon from '@mui/icons-material/Check';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import BackspaceIcon from '@mui/icons-material/Backspace';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function Posts() {
    const [btn, setBtn] = useState(true);
    const [updatebtn, setUpdatebtnBtn] = useState(false);
    const [updatevalue, setUpdateValue] = useState();
    const [content, setContent] = useState();
    const [commentsOpen, setCommentsOpen] = useState({}); // حالة فتح التعليقات لكل منشور
    const [isLoading, setIsLoading] = useState(false); // حالة التحميل
    const [imageLoading, setImageLoading] = useState({}); // حالة تحميل الصور
    const [isUpdateFormVisible, setIsUpdateFormVisible] = React.useState(false);
    const [updatedPost, setUpdatedPost] = React.useState({ body: '', image: '' });
    let { userPosts, allPosts, addedComment } = useSelector((state: any) => state.posts);
    let { userInfo } = useSelector((state: any) => state.users);
    let { isUpdateComment, isDeleteComment } = useSelector((state: any) => state.comments);

    let dispatch = useDispatch();

    function makeComment(e: Event): any {
        e.preventDefault();
        setIsLoading(true); 
        let data = {
            content: (e.target as HTMLFormElement).content.value,
            post: (e.target as HTMLFormElement).id.value
        };
        dispatch<any>(createComment(data)).then(() => {
            setTimeout(() => { dispatch(setTimeForAddComment()) }, 2000);
            setIsLoading(false); 
        }).catch(() => {
            setIsLoading(false);
        });
    }

    function prepareUpdate(commentId: string) {
        setBtn(false);
        setUpdatebtnBtn(true);
        setUpdateValue(commentId);
    }

    function test(e: React.ChangeEvent<HTMLInputElement>) {
        setContent(e.target.value);
    }
    const handleUpdatePost = async () => {
        const { body, image } = updatedPost;
        console.log("Updating post userInfo:", userPosts); 

        try {
            const formData = new FormData();
            formData.append("body", body);
            formData.append("image", image instanceof File ? image : userInfo.image);
            let operr = await dispatch(updatePost({ allPosts: allPosts?._id, formData }));
            console.log(operr);

            setIsUpdateFormVisible(false);
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };
    function updateContact() {
        setBtn(true);
        setUpdatebtnBtn(false);
        setIsLoading(true); 
        let dataa = {
            updatevalue: updatevalue,
            content: content
        };
        dispatch<any>(updateComment(dataa)).then(() => {
            setTimeout(() => { dispatch(setTimeForUpdate()) }, 2000);
            setIsLoading(false); 
        }).catch(() => {
            setIsLoading(false); 
        });
    }

    function deleteContent(commentId: string) {
        setIsLoading(true); 
        dispatch<any>(deleteComment(commentId)).then(() => {
            setTimeout(() => { dispatch(setTimeForDelete()) }, 2000);
            setIsLoading(false); 
        }).catch(() => {
            setIsLoading(false); 
        });
    }

    function deletePosts(postId: string) {
        setIsLoading(true); 
        dispatch<any>(deletePost(postId)).finally(() => {
            setIsLoading(false); 
        });
    }

    const handleImageLoad = (id: string) => {
        setImageLoading(prevState => ({ ...prevState, [id]: false }));
    };

    const handleImageError = (id: string) => {
        setImageLoading(prevState => ({ ...prevState, [id]: false }));
    };
    const toggleUpdateFormVisibility = () => {
        setIsUpdateFormVisible(!isUpdateFormVisible);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedPost({ ...updatedPost, [name]: value });
    };

    const handleImageChange = (e) => {
        setUpdatedPost({ ...updatedPost, image: e.target.files[0] });
    };

    const toggleComments = (postId: string) => {
        setCommentsOpen(prevState => ({
            ...prevState,
            [postId]: !prevState[postId]
        }));
    };

    useEffect(() => {
        dispatch(getUserInfo());
    }, []);

    useEffect(() => {
        setIsLoading(true); // تفعيل حالة التحميل
        dispatch<any>(getAllPosts()).finally(() => {
            setIsLoading(false); // إيقاف حالة التحميل بعد الانتهاء (لا يهم إذا كانت ناجحة أو فاشلة)
        });
    }, [allPosts, userInfo]);

    return (<>
        {allPosts?.map((post: any) => (
            <Card key={post._id} sx={{ maxWidth: 545, margin: "20px auto" }}>
                <div className='flex items-center justify-between'>
                    <CardHeader
                        avatar={<Avatar src={post?.user?.photo} sx={{ bgcolor: red[500] }}></Avatar>}
                        title={post?.user.name}
                        subheader={format(new Date(post?.createdAt), 'hh:mm aaaa dd MMMM yyyy')}
                    />
                    {userInfo?._id == post?.user?._id && (
                        <button className='p-4' onClick={() => deletePosts(post?._id)}><BackspaceIcon /></button>
                    )}
                    {userInfo?._id == post?.user?._id && (
                        <IconButton aria-label="settings" onClick={toggleUpdateFormVisibility}>
                            <MoreVertIcon />
                        </IconButton>)}
                </div>
                <div style={{ position: 'relative' }}>
                    {imageLoading[post._id] && (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: "150px",
                                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    )}
                    <CardMedia
                        component="img"
                        height="150"
                        image={post?.image}
                        alt="post image"
                        onLoad={() => handleImageLoad(post._id)}
                        onError={() => handleImageError(post._id)}
                        style={{ display: imageLoading[post._id] ? 'none' : 'block' }}
                    />
                </div>
                <CardContent>
                    <Typography sx={{ fontSize: '1.2rem', color: 'black', fontWeight: '700' }} variant="body2">
                        {post?.body}
                    </Typography>
                </CardContent>
                {userInfo?._id === post?.user?._id && isUpdateFormVisible ? (
                    <CardContent>
                        <TextField
                            label="Body"
                            variant="outlined"
                            name="body"
                            value={updatedPost.body}
                            onChange={handleInputChange}
                            fullWidth
                            multiline
                            rows={4}
                            margin="normal"
                        />
                        <input type="file" name="image" onChange={handleImageChange} />
                        <Button variant="contained" color="primary" onClick={handleUpdatePost}>
                            Update Post
                        </Button>
                    </CardContent>
                ) : null}
                <button className='commentsOpen' onClick={() => toggleComments(post._id)} variant="contained">
                    {commentsOpen[post._id] ? <LockOpenIcon /> : <LockIcon />}
                </button>
                {commentsOpen[post._id] && (
                    <CardContent>
                        <Typography sx={{ marginBottom: '5px', p: '10px' }}>Comments :</Typography>
                        {post.comments.map((comment: any) => (
                            <Box className='comments' sx={{ p: '15px', borderRadius: '7px', color: 'white', marginTop: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }} key={comment._id}>
                                <div className='flex items-center gap-3'>
                                    <div className='p-3'>
                                        <Avatar src={comment?.commentCreator?.photo}></Avatar>
                                        <p className='text-sm mt-2 m-auto'> {comment?.commentCreator?.name}</p>
                                    </div>
                                    <div>
                                        {format(new Date(comment?.createdAt), 'hh:mm aaaa dd MMMM yyyy')}
                                        <Typography sx={{ padding: "10px" }} paragraph>{comment?.content}</Typography>
                                    </div>
                                </div>
                                {comment?.commentCreator?._id == userInfo?._id && (
                                    <div className='flex gap-3'>
                                        <Button onClick={() => deleteContent(comment?._id)} sx={{ bgcolor: 'tomato', ml: 'auto' }} variant="contained"><DeleteIcon /></Button>
                                        <Button onClick={() => prepareUpdate(comment?._id)} sx={{ bgcolor: 'skyblue', ml: 'auto' }} variant="contained">Update</Button>
                                    </div>
                                )}
                            </Box>
                        ))}
                        <form onSubmit={makeComment}>
                            {isUpdateComment && (
                                <Alert sx={{ mt: '10px' }} icon={<CheckIcon fontSize="inherit" />} severity="success">
                                    Comment Updated Successfull
                                </Alert>
                            )}
                            {isDeleteComment && (
                                <Alert sx={{ mt: '10px' }} icon={<CheckIcon fontSize="inherit" />} severity="success">
                                    Comment Deleted Successfull
                                </Alert>
                            )}
                            <TextField onChange={test} name='content' sx={{ width: '100%', mt: '10px' }} id="outlined-basic" placeholder='Add Comment...' variant="outlined" />
                            {addedComment && (
                                <Alert sx={{ mt: '10px' }} icon={<CheckIcon fontSize="inherit" />} severity="success">
                                    Comment Added Successfull
                                </Alert>
                            )}
                            {btn && (
                                <Button name='id' value={post?._id} type='submit' sx={{ mt: '10px' }} variant="contained">Add Comment</Button>
                            )}
                        </form>
                        {updatebtn && (
                            <Button onClick={updateContact} sx={{ mt: '10px', bgcolor: 'skyblue' }} variant="contained">Update Comment</Button>
                        )}
                    </CardContent>
                )}
            </Card>
        ))}
        {isLoading && (
            <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
                <CircularProgress />
            </Box>
        )}
    </>

    );
}
