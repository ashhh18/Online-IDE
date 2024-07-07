import { useContext } from "react"
import "./CreateFolderMode.scss"
import { ModeContext } from "../ModeProvider"
import { CodebaseContext } from "../CodebaseProvider"

export const CreateFolderMode = () => {
    const modeFeatures = useContext(ModeContext);
    const {createNewFolder} = useContext(CodebaseContext);
    const closeMode = () => {
        modeFeatures.closeMode();
    };
    const onSubmitMode = (e) => {
        e.preventDefault();
        const folderName = e.target.folderName.value;
        createNewFolder(folderName);
        closeMode();
    }

    return <div className="mode-box">
        <form className="mode-body" onSubmit={onSubmitMode}>
            <span onClick={closeMode} className="materials-icons close">close</span>
            <h1>create new folder</h1>
            <div className="item">
                <p>enter name</p>
                <input name="folderName"/>
                <button type="submit">create</button>
            </div>
        </form>
    </div>
}