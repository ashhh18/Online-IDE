// import { Modal } from "@mui/material";
import "./index.scss"
import { RightComp } from "./RightComp";
import { Mode } from "../../Providers/Modes/Mode";
import { useContext } from "react";
import { ModeContext } from "../../Providers/ModeProvider";
import { modeConstants } from "../../Providers/ModeProvider";

export const HomePage = () => {
    const modeFeatures = useContext(ModeContext);
    const openCreateCodeMode = () => {
        modeFeatures.openMode(modeConstants.CREATE_CODE);
    };
    return (
        <div className="home-box">
            <RightComp/>
            <Mode/>
            <div className="left-box">
                <div className="item-box">
                    <h1>Online IDE</h1>
                    <h2>CODE COMPILER</h2>
                    <button onClick=
                    {openCreateCodeMode}>
                        <span
                        className="materials-icons">add
                        </span>
                        <span>Write Code ?</span>
                    </button>
                </div>
            </div>
        </div>
    )
};