import { useParams } from "react-router-dom"
import "./index.scss"
import { EditorContainer } from "./EditorContainer";
// import { useCallback, useState } from "react";
import { useCallback, useState } from "react";
import { makeSub } from "../../Providers/servics";

export const CodeArea = () => {
    const params = useParams();
    const [inputVal, setInputVal] = useState('');
    const [showLoader, setShowLoader] = useState(false);
    const [outputVal, setOutputVal] = useState('');
    const { fileId, folderId } = params;

    const onImportInput = (e) => {
        const file = e.target.files[0];
        const fileType = file.type.includes("text");
        if (fileType) {
            const fileReader = new FileReader();
            fileReader.readAsText(file);
            fileReader.onload = (e) => {
                setInputVal(e.target.result);
            }
        } else {
            alert("invalid");
        }
    }

    const onExportOutput = () => {
        const val = outputVal.trim();
        if (!val) {
            alert("incomplete");
            return;
        }
        const tempBlob = new Blob([outputVal], { type: "text/plain" });
        const downloadUrl = URL.createObjectURL(tempBlob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = `output.txt`;
        link.click();
    }

    const callback = ({ apiStatus, data, message }) => {
        if (apiStatus === 'loading') {
            setShowLoader(true);
        } else if (apiStatus === 'error') {
            setShowLoader(false);
            setOutputVal("something wrong");
        } else {
            setShowLoader(false);
            if (data.status.id === 3) {
                setOutputVal(atob(data.stdout));
            } else {
                setOutputVal(atob(data.stderr));
            }
        }
    };

    const runCode = useCallback(({ code, language }) => {
        console.log("Running code with language:", language);
        makeSub(code, language, inputVal, callback);
    }, [inputVal]);

    return (
        <div className="area-box">
            <div className="header-box">
                {/* logo */}
            </div>
            <div className="content-box">
                <div className="editor-box">
                    <EditorContainer fileId={fileId} folderId={folderId} runCode={runCode} />
                </div>
                <div className="input-box">
                    <div className="input-header">
                        <b className="inp-btn">Input:</b>
                        <label htmlFor="input" className="input-icons">
                            <span className="material-icons">cloud_upload</span>
                            <b className="">import input</b>
                        </label>
                        <input type="file" id="input" style={{ display: 'none' }} onChange={onImportInput} />
                    </div>
                    <textarea value={inputVal} onChange={(e) => setInputVal(e.target.value)}></textarea>
                </div>
                <div className="input-box">
                    <div className="input-header">
                        <b>Output:</b>
                        <button onClick={onExportOutput}>
                            <span className="material-icons">cloud_download</span>
                            <p>export</p>
                        </button>
                    </div>
                    <textarea readOnly value={outputVal} onChange={(e) => setOutputVal(e.target.value)}></textarea>
                </div>
                {showLoader && <div className="full-loader">
                    <div className="loader">

                    </div>
                </div>}
            </div>
        </div>
    )
}