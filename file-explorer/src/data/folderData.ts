import Folder from './Folder'

type Explorer = Folder;

const explorer : Explorer = {
    id: 1,
    name:"root",
    isFolder: true,
    items: [
        {
          id:2,
          name: "public",
          isFolder: true,
          items: [
           
          ]
        },
       
      ]
}

export default explorer;