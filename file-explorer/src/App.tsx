import { useState } from 'react'
import './App.css'
import explorer from './data/folderData'
import FolderExplorer from './components/FolderExplorer';

function App() {
const [explorerData, setExplorerData] = useState(explorer);

console.log(explorerData);

  return (
   <div> <FolderExplorer explorer={explorerData} /> </div>
  )
}

export default App
