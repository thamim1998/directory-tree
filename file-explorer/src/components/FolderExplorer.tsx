import React, { useState } from "react";
import Folder from "../data/Folder";
import { FcFolder, FcFile  } from "react-icons/fc";

type folderProps = {
  explorer: Folder;
  handleInsertNode: (folderId: number, name: string, isFolder: boolean) => void;
  handleDeleteNode:(folderId:number) => void;
};

const FolderExplorer: React.FC<folderProps> = ({ explorer, handleInsertNode, handleDeleteNode }) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: null as null | boolean,
    isFolder: false,
  });

  const handleNewFolder = (e: React.MouseEvent<HTMLButtonElement>, isFolder: boolean) => {
    e.stopPropagation();

    setShowInput({
      visible: true,
      isFolder: isFolder,
    });
  };

  const addFolder = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.currentTarget.value && e.key == "Enter") {
      await handleInsertNode(explorer.id, e.currentTarget.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };


  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleDeleteNode(explorer.id);
  };

  if (explorer.isFolder) {
    return (
      <div>
        <div className="folder" onClick={() => setExpand(!expand)}>
          <span className="folder-icon">
            <FcFolder size={24} /> {explorer.name}
          </span>

          <div>
            <button onClick={(e) => handleNewFolder(e, true)}>+ Folder</button>
            <button onClick={(e) => handleNewFolder(e, false)}>+ File</button>
            <button onClick={(e) => handleDelete(e)}> - delete </button>
          </div>
        </div>

        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="input-container">
              <span>{showInput.isFolder ? <FcFolder size={20} /> : <FcFile size={20} />}</span>
              <input
                type="text"
                autoFocus
                className="input-container-field"
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                onKeyDown={addFolder}
              />
            </div>
          )}
          {explorer.items.map((item) => {
            return (
              <span key={item.id}>
                <FolderExplorer  handleDeleteNode={handleDeleteNode} handleInsertNode={handleInsertNode} explorer={item} />{" "}
              </span>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="file">
        <span className="folder-icon">
          <FcFile size={24} /> {explorer.name}
        </span>
      </div>
    );
  }
};

export default FolderExplorer;
