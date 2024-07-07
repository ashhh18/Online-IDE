import { useParams } from "react-router-dom"
import "./index.scss"
import { EditorContainer } from "./EditorContainer";

export const CodeArea = () => {
    const params = useParams();
    const { fileId, folderId } = params;
    return (
        <div className="area-box">
            <div className="header-box">
                {/* logo */}
            </div>
            <div className="content-box">
                <div className="editor-box">
                    <EditorContainer/>
                </div>
                <div className="input-box">
                    <div className="input-header">
                        <b>Input:</b>
                        <label htmlFor="input" className="input-icons">
                            <span className="material-icons">cloud_upload</span>
                            <b className="">import input</b>
                        </label>
                        <input type="file" id="input" style={{ display: 'none' }} />
                    </div>
                    <textarea></textarea>
                </div>
                <div className="input-box">
                    <div className="input-header">
                        <b>Output:</b>
                        <button>
                            <span className="material-icons">cloud_download</span>
                            <p>export</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}