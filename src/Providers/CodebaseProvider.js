import { createContext, useContext, useEffect, useState } from "react";
import { v4 } from "uuid";

export const CodebaseContext = createContext();

const initData = [
    {
        id: v4(),
        title: "ulog",
        files: [
            {
                id: v4(),
                title: 'index',
                code: 'cout << "hi ulog";',
                language: 'cpp',
            }
        ]
    },
    {
        id: v4(),
        title: "ash",
        files: [
            {
                id: v4(),
                title: 'index',
                code: 'cout << "hi ulog";',
                language: 'cpp',
            }
        ]
    },
];

export const defaultCode = {
    'cpp': 'cout << yo',
    'javascript': 'console.log()'
}

export const CodebaseProvider = ({ children }) => {
    const [folders,setFolders] = useState(()=>{
        const localData = localStorage.getItem('data');
        if (localData){
            return JSON.parse(localData);
        }
        return initData;
    });

    const createNewCode = (newCode) => {
        const { folderName, fileName, language } = newCode;
        const newFolders = [...folders];
        newFolders.push({
            id: v4(),
            title: folderName,
            files: [
                {
                    id: v4(),
                    title: fileName,
                    language: language,
                    code: defaultCode[language]
                }
            ]
        });
        localStorage.setItem('data', JSON.stringify(newFolders));
        setFolders(newFolders);
    }

    const createNewFolder = (folderName) => {
        const newFolder = {
            id: v4(),
            title: folderName,
            files: []
        };
        const allFolders = [...folders, newFolder];
        localStorage.setItem('data', JSON.stringify(allFolders)); 
        setFolders(allFolders);
    }

    const deleteFolder = (id) => {
        const updatedFolderList = folders.filter((folderItem)=>{
            return folderItem.id !== id;
        })
        localStorage.setItem('data',JSON.stringify(updatedFolderList));
        setFolders(updatedFolderList);
    }

    const editFolder = (newFolderName,id) => {
        const updateList = folders.map((folderItem)=>{
            if (folderItem.id === id){
                folderItem.title = newFolderName;
            }
            return folderItem;
        })
        localStorage.setItem('data',JSON.stringify(updateList));
        setFolders(updateList);
    }

    const editFile = (newName, folderId, fileId) => {
        const copiedFolders = [...folders];
        for (let i=0;i<copiedFolders.length;i++){
            if (folderId===copiedFolders[i].id){
                const files = copiedFolders[i].files;
                for (let j=0;j<files.length;j++){
                    if (fileId===files[i].id){
                        files[i].title = newName;
                        break;
                    }
                }
                break;
            }
        }
        localStorage.setItem('data',JSON.stringify(copiedFolders));
        setFolders(copiedFolders);
    }

    const deleteFile = (folderId,fileId) => {
        const temp = [...folders];
        for (let i=0;i<temp.length;i++){
            if (temp[i].id === folderId){
                const fl = [...temp[i].files];
                temp[i].files = fl.filter((file)=>{
                    return file.id !== fileId;
                })
                break;
            }
        }
        localStorage.setItem('data',JSON.stringify(temp));
        setFolders(temp);
    }

    const createCard = (folderId,file) => {
        const temp = [...folders];
        for (let i=0;i<temp.length;i++){
            if (temp[i].id===folderId){
                temp[i].files.push(file);
                break;
            }
        }
        localStorage.setItem('data',JSON.stringify(temp));
        setFolders(temp);
    }

    useEffect(() => {
        if (!localStorage.getItem('data')) {
            localStorage.setItem('data', JSON.stringify(folders));
        }
    }, []);

    const codeFeatures = {
        folders,
        createNewCode,
        createNewFolder,
        deleteFolder,
        editFolder,
        editFile,
        deleteFile,
        createCard
    }

    return (
        <CodebaseContext.Provider value={codeFeatures}>
            {children}
        </CodebaseContext.Provider>
    );
}
