import { useContext } from "react";
import "./EditFileMode.scss";
import { ModeContext } from "../ModeProvider";
import { CodebaseContext } from "../CodebaseProvider";

export const EditFile = () => {
    const {closeMode,payLoad} = useContext(ModeContext);
    const {editFile} = useContext(CodebaseContext);
    const onSubmitMode = (e) => {
        e.preventDefault();
        const fileName = e.target.fileName.value;
        editFile(fileName,payLoad.folderId,payLoad.fileId);
        closeMode();
    }

    return <div className="mode-box">
        <form className="mode-body" onSubmit={onSubmitMode}>
            <span onClick={closeMode} className="materials-icons close">close</span>
            <h1>edit file name</h1>
            <div className="item">
                <p>enter name</p>
                <input name="fileName"/>
                <button type="submit">done</button>
            </div>
        </form>
    </div>  
}