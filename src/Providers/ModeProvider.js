import { type } from "@testing-library/user-event/dist/type";
import { Children, createContext, useState } from "react";
import { CreateCodeMode } from "./Modes/CreateCodeMode";

export const ModeContext = createContext();

export const modeConstants = {
    CREATE_CODE : 'CREATE_CODE',
    CREATE_FOLDER: 'CREATE_FOLDER',
    EDIT_FOLDER: 'EDIT_FOLDER',
    EDIT_FILE: 'EDIT_FILE',
    CREATE_CARD: 'CREATE_CARD'
}

export const ModeProvider = ({children}) => {
    const [modeType,setModeType] = useState(null);
    const [payLoad, setPayLoad] = useState(null);
    const closeMode = () => {
        setModeType(null);
        setPayLoad(null);
    }
    const modeFeatures = {
        openMode: setModeType, 
        closeMode,
        activeMode: modeType, 
        payLoad,
        setPayLoad
    }
    return (
        <ModeContext.Provider value={modeFeatures}>
            {children}
        </ModeContext.Provider>
    );
}