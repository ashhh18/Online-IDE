import { useContext } from "react"
import "./EditFolderMode.scss"
import { modeConstants, ModeContext } from "../ModeProvider"
import { CodebaseContext } from "../CodebaseProvider"

export const EditFolderMode = () => {
    const {closeMode,payLoad} = useContext(ModeContext);
    const {editFolder} = useContext(CodebaseContext);

    const onSubmitMode = (e) => {
        e.preventDefault();
        const folderName = e.target.folderName.value;
        editFolder(folderName,payLoad);
        closeMode();
    }

    return <div className="mode-box">
        <form className="mode-body" onSubmit={onSubmitMode}>
            <span onClick={closeMode} className="material-icons">close</span>
            <h1>edit folder name</h1>
            <div className="item">
                <p>enter name</p>
                <input name="folderName"/>
                <button type="submit">done</button>
            </div>
        </form>
    </div>
}
