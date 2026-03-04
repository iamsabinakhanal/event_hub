import axios from "./axios";
import { API } from "./endpoints";

export const createBook = async(bookData: any) => {
    try{
        const response = await axios.post(
            API.BOOKS.CREATE,
            bookData
        );
        return response.data;
    }catch(err: Error | any){
        throw new Error(
            err.response?.data?.message
            || err.message
            || "Failed to create book"
        );
    }
}

export const getAllBooks = async() => {
    try{
        const response = await axios.get(
            API.BOOKS.GET_ALL
        );
        return response.data;
    }catch(err: Error | any){
        throw new Error(
            err.response?.data?.message
            || err.message
            || "Failed to fetch books"
        );
    }
}

export const getBookById = async(id: string) => {
    try{
        const response = await axios.get(
            API.BOOKS.GET_ONE(id)
        );
        return response.data;
    }catch(err: Error | any){
        throw new Error(
            err.response?.data?.message
            || err.message
            || "Failed to fetch book"
        );
    }
}

export const updateBook = async(id: string, bookData: any) => {
    try{
        const response = await axios.put(
            API.BOOKS.UPDATE(id),
            bookData
        );
        return response.data;
    }catch(err: Error | any){
        throw new Error(
            err.response?.data?.message
            || err.message
            || "Failed to update book"
        );
    }
}

export const deleteBook = async(id: string) => {
    try{
        const response = await axios.delete(
            API.BOOKS.DELETE(id)
        );
        return response.data;
    }catch(err: Error | any){
        throw new Error(
            err.response?.data?.message
            || err.message
            || "Failed to delete book"
        );
    }
}
