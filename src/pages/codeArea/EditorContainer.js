import { useState, useRef, useContext, useEffect } from "react";
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

// const defaultCodeMap = {
//     cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!";\n    return 0;\n}',
//     js: 'console.log("Hello, World!");',
//     java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
//     python: 'print("Helloooooo, World!")'
// };

export const EditorContainer = ({ fileId, folderId }) => {
    const { getDefaultCode, getLanguage, saveCode, updateLanguage } = useContext(CodebaseContext);
    const [code, setCode] = useState(() => {
        return getDefaultCode(fileId, folderId);
});
    // const [code, setCode] = useState('cpp');
    const [lang, setLang] = useState(() => getLanguage(fileId, folderId));
    const [theme, setTheme] = useState('vs-dark');
    const codeRef = useRef(code);

    // Ensure codeRef is in sync with the code state
    // useEffect(() => {
    //     codeRef.current = code;
    // }, [code]);

    const onChangeCode = (newCode) => {
        // setCode(newCode); 
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
                setLang(whichLang);
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
        link.download = `code.${fileExtension[lang]}`;
        link.click();
    };

    const changeLanguage = (e) => {
        updateLanguage(fileId,folderId,e.target.value);
        setCode(getDefaultCode(fileId,folderId));
        setLang(e.target.value);
        // setCode(defaultCodeMap[newLang]);
    };

    const themeChange = (e) => {
        setTheme(e.target.value);
    };

    const onSave = () => {
        saveCode(fileId,folderId,codeRef.current);
        alert("code saved");
    }

    return (
        <div className="root-editor-box">
            <div className="editor-header">
                <div className="editor-left-box">
                    <b>{"title of code"}</b>
                    <span className="material-icons">edit</span>
                    <button onClick={onSave}>save code</button>
                </div>
                <div className="editor-right-box">
                    <select onChange={changeLanguage} value={lang}>
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
                    language={lang}
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
                <button>run code</button>
            </div>
        </div>
    );
};