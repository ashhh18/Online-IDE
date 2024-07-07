import { useContext } from "react"
import "./index.scss"
import { CodebaseContext } from "../../../Providers/CodebaseProvider";
import { modeConstants } from "../../../Providers/ModeProvider";
import { ModeContext } from "../../../Providers/ModeProvider";
import { useNavigate } from "react-router-dom";

// const val = useContext(CodebaseContext);
const Folder = ({ folderTitle, cards, folderId }) => {
    const {deleteFolder,deleteFile} = useContext(CodebaseContext);
    const {openMode, setPayLoad} = useContext(ModeContext);
    const navigate =  useNavigate();

    const onDeleteFolder = () => {
        deleteFolder(folderId);
    }

    const onEditFolder = () => {
        setPayLoad(folderId);
        openMode(modeConstants.EDIT_FOLDER);
    }

    const onNewCard = () => {
        setPayLoad(folderId);
        openMode(modeConstants.CREATE_CARD);
    }

    return(
        <div className="folder-box">
            <div className="folder-header">
                <div className="folder-header-item">
                    <span className="material-icons" style={{ color: "#FFCA29" }}>folder</span>
                    <span>{folderTitle}</span>
                </div>
                <div className="folder-header-item">
                    <span onClick={onDeleteFolder} className="material-icons" style={{ color: 'white' }}>delete</span>
                    <span onClick={onEditFolder} className="material-icons" style={{ color: 'white' }}>edit</span>
                    <button onClick={onNewCard}
                    className="add-folder">
                        <span className="material-icons">add</span>
                        <span>New codebase</span>
                    </button>
                </div>
            </div>
            <div className="cards-box">
                {
                    cards?.map((file, index) => {
                        const onEditFile = () => {
                            setPayLoad({fileId:file.id, folderId:folderId});
                            openMode(modeConstants.EDIT_FILE);
                        }
                        const onDeleteFile = () => {
                            deleteFile(folderId,file.id);
                        }
                        const navigatePls = () => {
                            navigate(`/happycoding/${file.id}/${folderId}`)
                        }   
                        return (
                            <div className="card" key={index} onClick={navigatePls}>
                                <div className="title-box">
                                    <span>{file?.title}</span>
                                    <span>Language: {file?.language}</span>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <span className="material-icons" onClick={onDeleteFile}>delete</span>
                                    <span className="material-icons"onClick={onEditFile}>edit</span>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    );
}

export const RightComp = () => {
    const {folders} = useContext(CodebaseContext);
    const modeFeatures = useContext(ModeContext);

    const openCreateNewFolderMode = () => {
        modeFeatures.openMode(modeConstants.CREATE_FOLDER);
    };

    // alert(folders.type);
    return <div className="right-box">
        <div className="header">
            <div className="title"><span>My</span>Codebase</div>
            <button  className="add-folder" onClick={openCreateNewFolderMode}>
                <span className="material-icons">add</span>
                <span>New Folder</span>
            </button>
        </div>
        {
            folders.map((folder, index) => {
                return <Folder folderTitle={folder.title} cards={folder.files} key={folder.id} folderId={folder.id}/>
            })
        }
    </div>
}