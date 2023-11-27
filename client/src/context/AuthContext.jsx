//AuthContext.jsx
import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // ***************************************************************
    //Register
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);

    //Skeleton to be passed to Register.jsx and get the info and setIt.
    const register = {
        name: "",
        email: "",
        password: ""
    };

    const [registerInfo, setRegisterInfo] = useState(register)

    console.log("Userr", user);

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);

    const registerUser = useCallback(async (e) => {
        e.preventDefault();

        setIsRegisterLoading(true);
        setRegisterError(null);

        const response = await postRequest(`${baseUrl}/user/register`, JSON.stringify(registerInfo));

        setIsRegisterLoading(false);

        if (response.error) {
            return setRegisterError(response)
        }

        localStorage.setItem('User', JSON.stringify(response))
        setUser(response);
    }, [registerInfo]);


    // ***************************************************************
    //Login
    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);


    //Skeleton to be passed to Login.jsx and get the info and setIt.
    const login = {
        email: "",
        password: ""
    }
    const [loginInfo, setLoginInfo] = useState(login);


    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info);
    }, []);

    const loginUser = useCallback((async (e) => {
        e.preventDefault();
        setIsLoginLoading(true);
        setLoginError(null);

        const response = await postRequest(`${baseUrl}/user/login`, JSON.stringify(loginInfo));

        setIsLoginLoading(false);

        if (response.error) {
            return setLoginError(response)
        }

        localStorage.setItem('User', JSON.stringify(response))
        setUser(response)

    }), [loginInfo])


    //*****************************************************
    // Logout
    const logoutUser = () => {
        localStorage.removeItem("User");
        setUser(null);
        setRegisterInfo(register);
        setLoginInfo(login);
    }


    //*****************************************************
    // LocalStorage 

    useEffect(() => {
        const user = localStorage.getItem("User");
        setUser(JSON.parse(user));
    }, []);


    //*****************************************************


    console.log("registerInfo", registerInfo);
    console.log("loginInfo", loginInfo);

    return (
        <AuthContext.Provider value={{ user, registerInfo, updateRegisterInfo, registerUser, registerError, isRegisterLoading, logoutUser, loginInfo, updateLoginInfo, loginUser, loginError, isLoginLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

