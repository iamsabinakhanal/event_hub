//service side processing for authentication actions
"use server";

import {registerUser, loginUser} from "../api/auth";
import { setAuthToken, setUserData } from "../cookies";

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
            // Save token and user data to cookies
            if(result.token){
                await setAuthToken(result.token);
            }
            if(result.data){
                await setUserData(result.data);
            }
            return{
                success:true,
                message:"Login successful",
                data: result.data
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