import "./EditorContainer.scss"
import { Editor } from "@monaco-editor/react"

const editorOps = {
    fontSize: 18,
    wordWrap: 'on',
}

export const EditorContainer = () => {
    const onChangeCode = (newCode) => {
        
    }

    return (
        <div className="root-editor-box">
            <div className="editor-header">
                <div className="editor-left-box">
                    <b>{"title of card"}</b>
                    <span className="material-icons">edit</span>
                    <button>save code</button>
                </div>
                <div className="editor-right-box">
                    <select>
                        <option value="cpp">cpp</option>
                        <option value="js">js</option>
                        <option value="java">java</option>
                        <option value="python">python</option>
                    </select>
                    <select>
                        <option value="vs-dark">vs-dark</option>
                        <option value="vs-light">vs-light</option>
                    </select>
                </div>
            </div>
            <div className="editor-body">
                <Editor
                    height={"100%"}
                    language={"cpp"}
                    options={editorOps}
                    theme={'vs-dark'}
                    onChange={onChangeCode}
                />
            </div>
            <div className="editor-footer">
                <button>
                    <span className="material-icons">fullscreen</span>
                    <span>full screen</span>
                </button>
                <label htmlFor="import-code">import code</label>
                <input type="file" id="import-code" style={{display:'none'}}/>
                <button>export code</button>
                <button>run code</button>
            </div>
        </div>
    )
}