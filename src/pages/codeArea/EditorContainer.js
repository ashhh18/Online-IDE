import { useState, useRef, useContext } from "react";
import "./EditorContainer.scss";
import { Editor } from "@monaco-editor/react";
import { CodebaseContext } from "../../Providers/CodebaseProvider";

const editorOps = {
    fontSize: 18,
    wordWrap: 'on',
};

const fileExtension = {
    cpp: 'cpp',
    js: 'js',
    java: 'java',
    python: 'py'
};

const fileExtension2 = {
    cpp: 'cpp',
    js: 'js',
    java: 'java',
    py: 'python'
};

export const EditorContainer = ({ fileId, folderId, runCode }) => {
    const { getDefaultCode, getLanguage, saveCode, updateLanguage } = useContext(CodebaseContext);
    const [code, setCode] = useState(() => getDefaultCode(fileId, folderId));
    const [language, setLanguage] = useState(() => getLanguage(fileId, folderId));
    const [theme, setTheme] = useState('vs-dark');
    const [isFullScreen, setIsFullScreen] = useState(0);
    const codeRef = useRef(code);

    const onChangeCode = (newCode) => {
        codeRef.current = newCode;
    };

    const onImportCode = (event) => {
        const file = event.target.files[0];
        const fileType = file.type.includes("text");
        if (fileType) {
            const fileReader = new FileReader();
            fileReader.readAsText(file);
            fileReader.onload = function (value) {
                const importedCode = value.target.result;
                const fileName = file.name;
                const fileExt = fileName.split('.').pop();
                const whichLang = fileExtension2[fileExt] || 'plaintext';
                setCode(importedCode);
                setLanguage(whichLang);
                codeRef.current = importedCode;
            };
        } else {
            alert("invalid");
        }
    };

    const onExportCode = () => {
        const codeValue = codeRef.current;
        if (!codeValue) {
            alert("incomplete");
            return;
        }
        const tempBlob = new Blob([codeValue], { type: "text/plain" });
        const downloadUrl = URL.createObjectURL(tempBlob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = `code.${fileExtension[language]}`;
        link.click();
    };

    const changeLanguage = (e) => {
        updateLanguage(fileId, folderId, e.target.value);
        setCode(getDefaultCode(fileId, folderId));
        setLanguage(e.target.value);
    };

    const themeChange = (e) => {
        setTheme(e.target.value);
    };

    const onSave = () => {
        saveCode(fileId, folderId, codeRef.current);
        alert("code saved");
    };

    const fullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    const onRunCode = () => {
        console.log("Running code with language:", language);
        runCode({ code: codeRef.current, language });
    };

    return (
        <div className="root-editor-box" style={isFullScreen ? styles.fullScreen : { position: 'static' }}>
            <div className="editor-header">
                <div className="editor-left-box">
                    <b>{"title of code"}</b>
                    <span className="material-icons">edit</span>
                    <button onClick={onSave}>save code</button>
                </div>
                <div className="editor-right-box">
                    <select onChange={changeLanguage} value={language}>
                        <option value="cpp">cpp</option>
                        <option value="js">js</option>
                        <option value="java">java</option>
                        <option value="python">python</option>
                    </select>
                    <select onChange={themeChange} value={theme}>
                        <option value="vs-dark">vs-dark</option>
                        <option value="vs-light">vs-light</option>
                    </select>
                </div>
            </div>
            <div className="editor-body">
                <Editor
                    height={"100%"}
                    language={language}
                    options={editorOps}
                    theme={theme}
                    onChange={onChangeCode}
                    value={code}
                />
            </div>
            <div className="editor-footer">
                <button>
                    <span className="material-icons">fullscreen</span>
                    <span>full screen</span>
                </button>
                <label htmlFor="import-code" className="btn">
                    <span className="material-icons">cloud_upload</span>
                    <span>import code</span>
                </label>
                <input type="file" id="import-code" style={{ display: 'none' }} onChange={onImportCode} />
                <button onClick={onExportCode}>export code</button>
                <button className="btn" onClick={onRunCode}>
                    <span className="material-icons">play_arrow</span>
                    <span>run code</span>
                </button>
            </div>
        </div>
    );
};

const styles = {
    fullScreen: {
        position: 'absolute',
        top: 0,
        left:0,
        right:0,
        bottom:0,
        zIndex:10,
    }
}