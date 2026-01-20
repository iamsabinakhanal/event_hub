//service side processing for authentication actions
"use service";

import {registerUser} from "../api/auth";

export const handleRegister=async(registerData:any)=>{
    //call backend api
    try{
        const result=await registerUser(registerData);
        //handle how to send data back to component
        if(result.sucess){
            return{
                sucess:true,
                message:"Registration successful",
                data: result.data
            };
        }
        return{
            sucess:false,
            message: result.message ||"Registration failed"
        }
        } catch (err:Error|any){
            return{
                sucess:false,message:err.message||"Registration failed"
            }
        }
    }
    export const handleLogin =async(registerData:any)=>{
    //call backend api
    try{
        const result=await registerUser(registerData);
        //handle how to send data back to component
        if(result.sucess){
            return{
                sucess:true,
                message:"Registration successful",
                data: result.data
            };
        }
        return{
            sucess:false,
            message: result.message ||"login failed"
        }
        } catch (err:Error|any){
            return{
                sucess:false,message:err.message||"login  failed"
            }
        }
    }