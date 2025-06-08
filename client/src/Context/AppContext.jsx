import { useContext, useEffect } from "react";
import { createContext } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import toast from "react-hot-toast";
import React from "react";

const AppContext = createContext();
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [input, setInput] = useState("");

    const navigate = useNavigate();
    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get('/api/blog/all');
            data.success ? setBlogs(data.blogs) : toast.error(data.message);
        } catch (error) {
            toast.error(error?.message || "Unexpected error occurred in fetching blogs");
        }
    }
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setToken(token);
            axios.defaults.headers.common['Authorization'] = `${token}`
        }
        fetchBlogs();
    }, [])
    const value = { axios, navigate, token, setToken, blogs, setBlogs, input, setInput };
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
};