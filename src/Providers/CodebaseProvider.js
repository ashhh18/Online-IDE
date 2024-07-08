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
    'cpp': `#include <iostream>
using namespace std;
int main()
{
    cout << "bubu" << endl;
    return 0;
}
    `,
    'javascript': `function main() {
    console.log("Hello, World!");
}`,
    'java' : `public class Main{
    public static void main(String[] args)}{
    System.out.print("bubu");
}`,
    'python':`def main():
print("Hello, World!")

if __name__ == "__main__":
    main()
`
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

    // const getDefaultCode = async (fileId, folderId) => {
    //     for (let i = 0; i < folders.length; i++) {
    //         if (folders[i].id === folderId) {
    //             for (let j = 0; j < folders[i].files.length; j++) {
    //                 const curFile = folders[i].files[j];
    //                 if (fileId === curFile.id) {
    //                     return curFile.code; // Return saved code instead of default code
    //                 }
    //             }
    //         }
    //     }
    // };

    const getDefaultCode = (fileId,folderId) => {
        for (let i=0;i<folders.length;i++){
            if (folders[i].id === folderId){
                for (let j=0;j<folders[i].files.length;j++){
                    const curFile = folders[i].files[j];
                    if (fileId===curFile.id){
                        return curFile.code;
                    }
                }
            }
        }
    };

    const updateLanguage = (fileId,folderId,lang) => {
        const temp = [...folders];
        for (let i=0;i<temp.length;i++){
            if (temp[i].id === folderId){
                for (let j=0;j<temp[i].files.length;j++){
                    const curFile = temp[i].files[j];
                    if (fileId===curFile.id){
                        temp[i].files[j].code = defaultCode[lang];
                        temp[i].files[j].language = lang;
                    }
                }
            }
        }
        localStorage.setItem('data',JSON.stringify(temp));
        setFolders(temp);
    }


    const getLanguage = (fileId,folderId) => {
        // const temp = [...folders];
        for (let i=0;i<folders.length;i++){
            if (folders[i].id === folderId){
                for (let j=0;j<folders[i].files.length;j++){
                    const curFile = folders[i].files[j];
                    if (fileId===curFile.id){
                        return curFile.language;
                    }
                }
            }
        }
    }

    const getName = (fileId,folderId) => {
        // const temp = [...folders];
        for (let i=0;i<folders.length;i++){
            if (folders[i].id === folderId){
                for (let j=0;j<folders[i].files.length;j++){
                    const curFile = folders[i].files[j];
                    if (fileId===curFile.id){
                        return curFile.title;
                    }
                }
            }
        }
    }


    const saveCode = (fileId, folderId, newCode) => {
        const temp = [...folders];
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].id === folderId) {
                for (let j = 0; j < temp[i].files.length; j++) { 
                    const cur = temp[i].files[j];
                    if (fileId === cur.id) {
                        temp[i].files[j].code = newCode;
                    }
                }
            }
        }
        localStorage.setItem('data', JSON.stringify(temp));
        setFolders(temp);
    };

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
        createCard,
        getDefaultCode,
        getLanguage,
        updateLanguage,
        saveCode,
        getName
    }

    return (
        <CodebaseContext.Provider value={codeFeatures}>
            {children}
        </CodebaseContext.Provider>
    );
}

// import { createContext, useContext, useEffect, useState } from "react";
// import { v4 } from "uuid";

// export const CodebaseContext = createContext();

// const initData = [
//     {
//         id: v4(),
//         title: "ulog",
//         files: [
//             {
//                 id: v4(),
//                 title: 'index',
//                 code: 'cout << "hi ulog";',
//                 language: 'cpp',
//             }
//         ]
//     },
//     {
//         id: v4(),
//         title: "ash",
//         files: [
//             {
//                 id: v4(),
//                 title: 'index',
//                 code: 'cout << "hi ulog";',
//                 language: 'cpp',
//             }
//         ]
//     },
// ];

// export const defaultCode = {
//     'cpp': `#include <iostream>
//     using namespace std;
//     int main(){
//     cout << "bubu";
//     return 0;
//     }`,
//     'javascript': 'console.log("hey")',
//     'java': 
//     `public class Main{
//         public static void main(String[] args){
//         System.out.print("yoo");
//     }}`,
//     'python': 'print("hey")'
// }

// export const CodebaseProvider = ({ children }) => {
//     const [folders, setFolders] = useState(() => {
//         const localData = localStorage.getItem('data');
//         if (localData) {
//             try {
//                 return JSON.parse(localData);
//             } catch (e) {
//                 console.error("Invalid JSON in localStorage:", e);
//                 return initData;
//             }
//         }
//         return initData;
//     });

//     const createNewCode = (newCode) => {
//         const { folderName, fileName, language } = newCode;
//         const newFolders = [...folders];
//         newFolders.push({
//             id: v4(),
//             title: folderName,
//             files: [
//                 {
//                     id: v4(),
//                     title: fileName,
//                     language: language,
//                     code: defaultCode[language]
//                 }
//             ]
//         });
//         localStorage.setItem('data', JSON.stringify(newFolders));
//         setFolders(newFolders);
//     }

//     const createNewFolder = (folderName) => {
//         const newFolder = {
//             id: v4(),
//             title: folderName,
//             files: []
//         };
//         const allFolders = [...folders, newFolder];
//         localStorage.setItem('data', JSON.stringify(allFolders)); 
//         setFolders(allFolders);
//     }

//     const deleteFolder = (id) => {
//         const updatedFolderList = folders.filter((folderItem) => {
//             return folderItem.id !== id;
//         });
//         localStorage.setItem('data', JSON.stringify(updatedFolderList));
//         setFolders(updatedFolderList);
//     }

//     const editFolder = (newFolderName, id) => {
//         const updateList = folders.map((folderItem) => {
//             if (folderItem.id === id) {
//                 folderItem.title = newFolderName;
//             }
//             return folderItem;
//         });
//         localStorage.setItem('data', JSON.stringify(updateList));
//         setFolders(updateList);
//     }

//     const editFile = (newName, folderId, fileId) => {
//         const copiedFolders = [...folders];
//         for (let i = 0; i < copiedFolders.length; i++) {
//             if (folderId === copiedFolders[i].id) {
//                 const files = copiedFolders[i].files;
//                 for (let j = 0; j < files.length; j++) {
//                     if (fileId === files[j].id) {
//                         files[j].title = newName;
//                         break;
//                     }
//                 }
//                 break;
//             }
//         }
//         localStorage.setItem('data', JSON.stringify(copiedFolders));
//         setFolders(copiedFolders);
//     }

//     const deleteFile = (folderId, fileId) => {
//         const temp = [...folders];
//         for (let i = 0; i < temp.length; i++) {
//             if (temp[i].id === folderId) {
//                 temp[i].files = temp[i].files.filter((file) => {
//                     return file.id !== fileId;
//                 });
//                 break;
//             }
//         }
//         localStorage.setItem('data', JSON.stringify(temp));
//         setFolders(temp);
//     }

//     const createCard = (folderId, file) => {
//         const temp = [...folders];
//         for (let i = 0; i < temp.length; i++) {
//             if (temp[i].id === folderId) {
//                 temp[i].files.push(file);
//                 break;
//             }
//         }
//         localStorage.setItem('data', JSON.stringify(temp));
//         setFolders(temp);
//     }

//     const getDefaultCode = (fileId, folderId) => {
//         for (let i = 0; i < folders.length; i++) {
//             if (folders[i].id === folderId) {
//                 for (let j = 0; j < folders[i].files.length; j++) {
//                     const curFile = folders[i].files[j];
//                     if (fileId === curFile.id) {
//                         return curFile.code;
//                     }
//                 }
//             }
//         }
//     }

//     const getLanguage = (fileId, folderId) => {
//         for (let i = 0; i < folders.length; i++) {
//             if (folders[i].id === folderId) {
//                 for (let j = 0; j < folders[i].files.length; j++) {
//                     const curFile = folders[i].files[j];
//                     if (fileId === curFile.id) {
//                         return curFile.language;
//                     }
//                 }
//             }
//         }
//     }

//     const saveCode = (fileId, folderId, newCode) => {
//         const temp = [...folders];
//         for (let i = 0; i < temp.length; i++) {
//             if (temp[i].id === folderId) {
//                 for (let j = 0; j < temp[i].files.length; j++) { 
//                     const cur = temp[i].files[j];
//                     if (fileId === cur.id) {
//                         temp[i].files[j].code = newCode;
//                     }
//                 }
//             }
//         }
//         localStorage.setItem('data', JSON.stringify(temp));
//         setFolders(temp);
//     };

//     const saveLanguage = (fileId, folderId, newLanguage) => {
//         const temp = [...folders];
//         for (let i = 0; i < temp.length; i++) {
//             if (temp[i].id === folderId) {
//                 for (let j = 0; j < temp[i].files.length; j++) { 
//                     const cur = temp[i].files[j];
//                     if (fileId === cur.id) {
//                         temp[i].files[j].language = newLanguage;
//                     }
//                 }
//             }
//         }
//         localStorage.setItem('data', JSON.stringify(temp));
//         setFolders(temp);
//     };

//     useEffect(() => {
//         if (!localStorage.getItem('data')) {
//             localStorage.setItem('data', JSON.stringify(folders));
//         }
//     }, []);

//     const codeFeatures = {
//         folders,
//         createNewCode,
//         createNewFolder,
//         deleteFolder,
//         editFolder,
//         editFile,
//         deleteFile,
//         createCard,
//         getDefaultCode,
//         getLanguage,
//         saveCode,
//         saveLanguage
//     }

//     return (
//         <CodebaseContext.Provider value={codeFeatures}>
//             {children}
//         </CodebaseContext.Provider>
//     );
// }
