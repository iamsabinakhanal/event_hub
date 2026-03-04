import axios from "./axios";
import { API } from "./endpoints";

// Dashboard API
export const getDashboard = async() => {
    try{
        const response = await axios.get(
            API.ADMIN.DASHBOARD
        );
        return response.data;
    }catch(err: Error | any){
        throw new Error(
            err.response?.data?.message
            || err.message
            || "Failed to fetch dashboard data"
        );
    }
}

// Admin Users API
export const getAllUsers = async() => {
    try{
        const response = await axios.get(
            API.ADMIN.USERS.GET_ALL
        );
        return response.data;
    }catch(err: Error | any){
        throw new Error(
            err.response?.data?.message
            || err.message
            || "Failed to fetch users"
        );
    }
}

export const getUserById = async(id: string) => {
    try{
        const response = await axios.get(
            API.ADMIN.USERS.GET_ONE(id)
        );
        return response.data;
    }catch(err: Error | any){
        throw new Error(
            err.response?.data?.message
            || err.message
            || "Failed to fetch user"
        );
    }
}

export const createUser = async(userData: any) => {
    try{
        const response = await axios.post(
            API.ADMIN.USERS.CREATE,
            userData
        );
        return response.data;
    }catch(err: Error | any){
        throw new Error(
            err.response?.data?.message
            || err.message
            || "Failed to create user"
        );
    }
}

export const updateUser = async(id: string, userData: any) => {
    try{
        const response = await axios.put(
            API.ADMIN.USERS.UPDATE(id),
            userData
        );
        return response.data;
    }catch(err: Error | any){
        throw new Error(
            err.response?.data?.message
            || err.message
            || "Failed to update user"
        );
    }
}

export const deleteUser = async(id: string) => {
    try{
        const response = await axios.delete(
            API.ADMIN.USERS.DELETE(id)
        );
        return response.data;
    }catch(err: Error | any){
        throw new Error(
            err.response?.data?.message
            || err.message
            || "Failed to delete user"
        );
    }
}

// Admin Blogs API
export const getAllAdminBlogs = async() => {
    try{
        const response = await axios.get(
            API.ADMIN.BLOGS.GET_ALL
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

export const getAdminBlogById = async(id: string) => {
    try{
        const response = await axios.get(
            API.ADMIN.BLOGS.GET_ONE(id)
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

export const createAdminBlog = async(blogData: any) => {
    try{
        const response = await axios.post(
            API.ADMIN.BLOGS.CREATE,
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

export const updateAdminBlog = async(id: string, blogData: any) => {
    try{
        const response = await axios.put(
            API.ADMIN.BLOGS.UPDATE(id),
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

export const deleteAdminBlog = async(id: string) => {
    try{
        const response = await axios.delete(
            API.ADMIN.BLOGS.DELETE(id)
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
