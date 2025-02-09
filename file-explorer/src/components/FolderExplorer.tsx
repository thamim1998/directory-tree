import React, { useState } from "react";
import Folder from "../data/Folder";
import { FcFolder, FcFile } from "react-icons/fc";

type folderProps = {
  explorer: Folder;
};

const FolderExplorer: React.FC<folderProps> = ({ explorer }) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: null as null | boolean,
    isFolder: false,
  });

  const handleNewFolder = (
    e: React.MouseEvent<HTMLButtonElement>,
    isFolder: boolean
  ) => {
    e.stopPropagation();

    setShowInput({
      visible: true,
      isFolder: isFolder,
    });
  };

  if (explorer.isFolder) {
    return (
      <div>
        <div className="folder" onClick={() => setExpand(!expand)}>
          <span className="folder-icon">
            {" "}
            <FcFolder size={24} /> {explorer.name}
          </span>

          <div>
            <button onClick={(e) => handleNewFolder(e, true)}>+ Folder</button>
            <button onClick={(e) => handleNewFolder(e, false)}>+ File</button>
          </div>
        </div>

        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="input-container">
              <span>
                {showInput.isFolder ? (
                  <FcFolder size={20} />
                ) : (
                  <FcFile size={20} />
                )}
              </span>
              <input
                type="text"
                autoFocus
                className="input-container-field"
                onBlur={() => setShowInput({ ...showInput, visible: false })}
              />
            </div>
          )}
          {explorer.items.map((item) => {
            return (
              <span>
                <FolderExplorer explorer={item} />{" "}
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
