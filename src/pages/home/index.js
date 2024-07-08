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
                <div className="logo">
                    <img className="img-logo" src="./logo2.png"/>
                </div>
                <div className="item-box">
                    <h1>Welcome to Ulog online code editor !!!</h1>
                    {/* <h1>Online IDE</h1>
                    <h2>CODE COMPILER</h2> */}
                    <button onClick=
                    {openCreateCodeMode}>
                        {/* <span className="material-icons">add</span> */}
                        <span>Happy Coding</span>
                    </button>
                </div>
            </div>
        </div>
    )
};