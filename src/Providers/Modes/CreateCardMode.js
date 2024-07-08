import { useContext } from "react";
import "./CreateCardMode.scss";
import { ModeContext } from "../ModeProvider";
import { CodebaseContext, defaultCode } from "../CodebaseProvider";
import { v4 } from "uuid";

export const CreateCardMode = () => {
    const {closeMode,payLoad} = useContext(ModeContext);
    const {createCard} = useContext(CodebaseContext);

    const onSubmitMode = (e) => {
        e.preventDefault();
        const fileName = e.target.fileName.value;
        const language = e.target.language.value;
        const file = {
            id:v4(),
            title:fileName,
            language, 
            code:defaultCode[language]
        }
        createCard(payLoad,file);
        closeMode();
    }

    return <div className="mode-box">
        <form className="mode-body" onSubmit={onSubmitMode}>
            <span onClick={closeMode} className="materials-icons close">close</span>
            <h1>create new folder</h1>
            <div className="item">
                <p>enter name</p>
                <input name="fileName"/>
                <button type="submit">create</button>
            </div>
            <div className="item">
                <select name="language">
                    <option value="cpp">cpp</option>
                    <option value="javascript">javascript</option>
                    <option value="java">java</option>
                    <option value="python">python</option>
                </select>
                {/* <button type="submit">  
                    create
                </button> */}
            </div>
        </form>
    </div>
}