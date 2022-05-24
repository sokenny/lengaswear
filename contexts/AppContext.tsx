import React from 'react';
import { useScrolledBottom } from "@/utils/index";
import { useMemo } from "react";

interface AppContextInterface {
    scrolledBottom: boolean;
}

const AppContext = React.createContext<AppContextInterface | null>(null);

export function AppProvider(props:any){
    const scrolledBottom:boolean = useScrolledBottom();
    const value = useMemo(()=>{
        return {
            scrolledBottom
        }
    }, [scrolledBottom]);
    return <AppContext.Provider value={value} {...props} />
}

export function useAppContext(){
    const context = React.useContext(AppContext);
    if(!context){
        throw new Error("useAppContext must be used within a AppProvider");
    }
    return context;
}