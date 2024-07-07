import { useContext } from "react"
import "./CreateCodeMode.scss"
import { ModeContext } from "../ModeProvider"
import { CodebaseContext } from "../CodebaseProvider";

export const CreateCodeMode = () => {
    const modeFeatures = useContext(ModeContext);
    const codeFeatures = useContext(CodebaseContext);
    const closeMode = () => {
        modeFeatures.closeMode();
    };
    const onSubmitMode = (e) => {
        e.preventDefault();
        const folderName = e.target.folderName.value;
        const fileName = e.target.fileName.value;
        const language = e.target.language.value;
        codeFeatures.createNewCode({
            folderName,
            fileName,
            language
        })
        closeMode();
    }

    return <div className="mode-box">
        <form className="mode-body" onSubmit={onSubmitMode}>
            <span onClick={closeMode} className="materials-icons close">close</span>
            <h1>create code base</h1>
            <div className="item">
                <p>enter folder</p>
                <input name="folderName"/>
            </div>
            <div className="item">
                <p>enter card</p>
                <input name="fileName"/>
            </div>
            <div className="item">
                <select name="language">
                    <option value="cpp">cpp</option>
                    <option value="javascript">javascript</option>
                    <option value="java">java</option>
                    <option value="python">python</option>
                </select>
                <button type="submit">  
                    create
                </button>
            </div>
        </form>
    </div>
}