//service side processing for authentication actions
"use server";

import {registerUser, loginUser, forgetPassword, resetPassword, getProfile, updateProfile} from "../api/auth";
import { setAuthToken, setUserData, clearAuthCookies, getAuthToken } from "../cookies";

export const handleRegister=async(registerData:any)=>{
    //call backend api
    try{
        const result=await registerUser(registerData);
        //handle how to send data back to component
        if(result.success){
            return{
                success:true,
                message:"Registration successful",
                data: result.data
            };
        }
        return{
            success:false,
            message: result.message ||"Registration failed"
        }
        } catch (err:Error|any){
            return{
                success:false,message:err.message||"Registration failed"
            }
        }
    }
    export const handleLogin =async(loginData:any)=>{
    //call backend api
    try{
        const result=await loginUser(loginData);
        //handle how to send data back to component
        if(result.success){
            const token =
                result.token ||
                result.data?.token ||
                result.data?.accessToken ||
                result.data?.tokens?.accessToken ||
                result.data?.tokens?.access?.token ||
                null;
            const userData = result.data?.user || result.data || null;

            // Save token and user data to cookies
            if(token){
                await setAuthToken(token);
            }
            if(userData){
                await setUserData(userData);
            }
            
            // Return success to allow client to trigger redirect
            return{
                success:true,
                message:"Login successful",
                data: userData,
                role: userData?.role || result.role || ''
            };
        }
        return{
            success:false,
            message: result.message ||"login failed"
        }
        } catch (err:Error|any){
            return{
                success:false,message:err.message||"login  failed"
            }
        }
    }

export const logoutUser = async () => {
    try {
        // Clear auth token and user data from cookies
        await clearAuthCookies();
        return {
            success: true,
            message: "Logout successful"
        };
    } catch (err: Error | any) {
        return {
            success: false,
            message: err.message || "Logout failed"
        };
    }
};

export const handleForgetPassword = async (email: string) => {
    try {
        const result = await forgetPassword(email);
        if (result.success) {
            return {
                success: true,
                message: result.message || "Password reset link sent to email",
                data: result.data
            };
        }
        return {
            success: false,
            message: result.message || "Failed to send password reset link"
        };
    } catch (err: Error | any) {
        return {
            success: false,
            message: err.message || "Failed to send password reset link"
        };
    }
};

export const handleResetPassword = async (token: string, newPassword: string) => {
    try {
        const result = await resetPassword(token, newPassword);
        if (result.success) {
            return {
                success: true,
                message: result.message || "Password reset successfully",
                data: result.data
            };
        }
        return {
            success: false,
            message: result.message || "Failed to reset password"
        };
    } catch (err: Error | any) {
        return {
            success: false,
            message: err.message || "Failed to reset password"
        };
    }
};

export const handleGetProfile = async () => {
    try {
        const token = await getAuthToken();
        if (!token) {
            return {
                success: false,
                message: "Not authenticated"
            };
        }
        
        const result = await getProfile();
        if (result.success) {
            return {
                success: true,
                message: result.message || "Profile fetched successfully",
                data: result.data
            };
        }
        return {
            success: false,
            message: result.message || "Failed to fetch profile"
        };
    } catch (err: Error | any) {
        return {
            success: false,
            message: err.message || "Failed to fetch profile"
        };
    }
};

export const handleUpdateProfile = async (profileData: FormData) => {
    try {
        const token = await getAuthToken();
        if (!token) {
            return {
                success: false,
                message: "Not authenticated"
            };
        }
        
        const result = await updateProfile(profileData);
        if (result.success) {
            // Update user data in cookies
            if (result.data) {
                await setUserData(result.data);
            }
            return {
                success: true,
                message: result.message || "Profile updated successfully",
                data: result.data
            };
        }
        return {
            success: false,
            message: result.message || "Failed to update profile"
        };
    } catch (err: Error | any) {
        return {
            success: false,
            message: err.message || "Failed to update profile"
        };
    }
};

export const getUserFromCookies = async () => {
    try {
        const userData = await getUserData();
        if (!userData) {
            return {
                success: false,
                message: "No user data found",
            };
        }
        return {
            success: true,
            data: userData,
        };
    } catch (err: Error | any) {
        return {
            success: false,
            message: err.message || "Failed to read user data",
        };
    }
};