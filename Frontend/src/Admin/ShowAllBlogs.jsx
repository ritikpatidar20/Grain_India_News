import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';
import { BlogCardShimmer } from '../components/BlogCardShimmer';
import { BASE_URL } from '../components/helper';

const ShowAllBlogs = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/v1/blog`,{
                    
                        headers:{
                          'Accept': 'application/json, text/plain, */*'
                        },
                });
                const blogsArray = Array.isArray(response.data.data.data) 
                    ? response.data.data.data 
                    : [response.data.data.data];

                // Sort blogs by updatedAt in descending order
                const sortedBlogs = blogsArray.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

                setBlogs(sortedBlogs);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div>
            <h1 className='text-center text-2xl font-bold mb-4'>All Blogs</h1>
            <div className="blog-list grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4">
                {blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <BlogCard key={blog._id} blog={blog} />
                    ))
                ) : (
                    Array.from({ length: 20 }).map((_, i) => (
                        <BlogCardShimmer key={i} />
                    ))
                )}
            </div>
        </div>
    );
};

export default ShowAllBlogs;
