import { useEffect, useState } from "react";
import "./App.css";
import FolderExplorer from "./components/FolderExplorer";
import useTreeTraversal from "./hooks/useTreeTraversal";
import Folder from "./data/Folder";

function App() {
  const [explorerData, setExplorerData] = useState<Folder | null>();

  const fetchFolderStructure = async (): Promise<void> => {
    try {
      const response = await fetch("http://localhost:5000/api/folders");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: Folder = await response.json();
      setExplorerData(data);
    } catch (error) {
      console.error("Error fetching folder structure:", error);
    }
  };


    const addFolderApi = async (folderId : number, name: string, isFolder : boolean) => {
      try {
        const response = await fetch("http://localhost:5000/api/folders/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ folderId, name, isFolder }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const updatedData: Folder = await response.json();
        setExplorerData(updatedData); // Update local state
      } catch (error) {
        console.error("Error adding folder:", error);
      }
    }

  useEffect(() => {
    fetchFolderStructure();
  }, []);

  const { insertNode, deleteNode } = useTreeTraversal();


  const handleDeleteNode = (folderId: number) => {
    if (!explorerData) {
      console.error("Explorer data is not loaded.");
      return;
    }
    const finalTree = deleteNode(explorerData, folderId);
    console.log("finalTree", finalTree);
    if (finalTree) {
      setExplorerData(finalTree); // Update state with the new tree
    } else {
      setExplorerData({
        id: -1,
        name: "Root",
        isFolder: true,
        items: [],
      });
    }
  };

  return (
    <div> {explorerData && <FolderExplorer handleDeleteNode={handleDeleteNode} handleInsertNode={addFolderApi} explorer={explorerData} />} </div>
  );
}

export default App;
