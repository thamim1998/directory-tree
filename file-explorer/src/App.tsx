import { useState } from 'react'
import './App.css'
import explorer from './data/folderData'
import FolderExplorer from './components/FolderExplorer';
import useTreeTraversal from './hooks/useTreeTraversal';

function App() {
const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode, deleteNode } = useTreeTraversal();

  const handleInsertNode = (folderId: number, item : string, isFolder : boolean) => {
   const finalTree = insertNode(explorerData, folderId, item, isFolder);

   setExplorerData(finalTree);
  }

  const handleDeleteNode = (folderId: number) => {
    const finalTree = deleteNode(explorerData, folderId)
    console.log('finalTree', finalTree)
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
  }

  return (
   <div> <FolderExplorer handleDeleteNode={handleDeleteNode} handleInsertNode = {handleInsertNode} explorer={explorerData} /> </div>
  )
}

export default App
