import axios from "./axios";
import { API } from "./endpoints";

export const createBlog = async(blogData: any) => {
    try{
        const response = await axios.post(
            API.BLOGS.CREATE,
            blogData
        );
        return response.data;
    }catch(err: Error | any){
        throw new Error(
            err.response?.data?.message
            || err.message
            || "Failed to create blog"
        );
    }
}

export const getAllBlogs = async() => {
    try{
        const response = await axios.get(
            API.BLOGS.GET_ALL
        );
        return response.data;
    }catch(err: Error | any){
        throw new Error(
            err.response?.data?.message
            || err.message
            || "Failed to fetch blogs"
        );
    }
}

export const getBlogById = async(id: string) => {
    try{
        const response = await axios.get(
            API.BLOGS.GET_ONE(id)
        );
        return response.data;
    }catch(err: Error | any){
        throw new Error(
            err.response?.data?.message
            || err.message
            || "Failed to fetch blog"
        );
    }
}

export const updateBlog = async(id: string, blogData: any) => {
    try{
        const response = await axios.put(
            API.BLOGS.UPDATE(id),
            blogData
        );
        return response.data;
    }catch(err: Error | any){
        throw new Error(
            err.response?.data?.message
            || err.message
            || "Failed to update blog"
        );
    }
}

export const deleteBlog = async(id: string) => {
    try{
        const response = await axios.delete(
            API.BLOGS.DELETE(id)
        );
        return response.data;
    }catch(err: Error | any){
        throw new Error(
            err.response?.data?.message
            || err.message
            || "Failed to delete blog"
        );
    }
}
