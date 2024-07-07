import { useContext } from "react";
import { modeConstants, ModeContext } from "../ModeProvider";
import { CreateCodeMode } from "./CreateCodeMode";
import { CreateFolderMode } from "./CreateFolderMode";
import { EditFolderMode } from "./EditFolderMode";
import { EditFile } from "./EditFileMode";
import { CreateCardMode } from "./CreateCardMode";

export const Mode = () => {
    const modeFeatures = useContext(ModeContext);
    return <>
        {modeFeatures.activeMode === modeConstants.CREATE_CODE && <CreateCodeMode />}
        {modeFeatures.activeMode === modeConstants.CREATE_FOLDER && <CreateFolderMode />}
        {modeFeatures.activeMode === modeConstants.EDIT_FOLDER && <EditFolderMode />}
        {modeFeatures.activeMode === modeConstants.EDIT_FILE && <EditFile/>}
        {modeFeatures.activeMode === modeConstants.CREATE_CARD && <CreateCardMode/>}
    </>
}