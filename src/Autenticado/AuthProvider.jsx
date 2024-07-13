import { useContext, createContext, useState, useEffect } from "react";
import { AuthResponse } from "../types/types";
import { User } from "../types/types";
import { API_URL } from "./constants";
import { json } from "react-router-dom";

const AuthContext = createContext({
    isAuthenticated: false,
    getAccessToken: () => {},
    saveUser: (userData) => {},
    getRefreshToken: () => {},
    getUser: () => {},
    logout: () => {},
});

export function AuthProvider({ children }){
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState("");
    const [user, setUser] = useState({});

    async function requestNewAccessToken(refreshToken) {
        const response = await fetch(`${API_URL}/refresh-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        });
      
        if (response.ok) {
          const json = (await response.json());
      
          if (json.error) {
            throw new Error(json.error);
          }
          return json.body.accessToken;
        } else {
          throw new Error("Unable to refresh access token.");
        }
      }

    async function getUserInfo(accessToken){
        try {
            const response = await fetch(`${API_URL}/user`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                },
            });
            
            if(response.ok){
                const json = await response.json();
                if(json.error){
                    throw new Error(json.error);
                }

                return json;
            } else {
                throw new Error(response.statusText);
            }

        } catch (error) {
            console.log("El error es: ", error);
        }
    }

    const getRefreshToken = () => {
        return localStorage.getItem("refreshToken");
    };
    
    const getAccessToken = () => {
        return localStorage.getItem("accessToken");
    };

    function logout() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken")
        setUser(undefined);
        setIsAuthenticated(false);
      }

    
    async function checkAuth() {
        const token = getRefreshToken();
        if(token) {
            const newAccessToken = await requestNewAccessToken(token);
            if(newAccessToken) {
                const userInfo = await getUserInfo(newAccessToken);
                if(userInfo) {
                    saveSessionInfo(userInfo, newAccessToken, token);
                }
            }
        }
    };

    useEffect(()=>{
        checkAuth();
    }, []);

    function saveSessionInfo(userInfo, accessToken, refreshToken){
        setAccessToken(accessToken);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setIsAuthenticated(true);
        setUser(userInfo);
    }

    function saveUser(userData=AuthResponse){
        saveSessionInfo(userData.body, userData.body.accessToken, userData.body.refreshToken);
    }

    function getUser(){
        return user;
    }

    return(
        <AuthContext.Provider value={
            { 
                isAuthenticated, 
                getAccessToken, 
                getRefreshToken, 
                saveUser,
                getUser,
                logout,} }>

            { children }
        </AuthContext.Provider> 
    );
};

export const useAuth = () => useContext(AuthContext);