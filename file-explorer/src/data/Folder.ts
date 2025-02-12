type Folder = {
    id: number;
    name: string;
    isFolder: boolean;
    items: Folder[];
  }

  export default Folder;