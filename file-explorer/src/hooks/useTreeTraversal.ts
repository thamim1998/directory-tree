import Folder from "../data/Folder";

const useTreeTraversal = () => {
  function insertNode(tree: Folder , folderId: number, name: string, isFolder: boolean): Folder {
    if (tree.id == folderId && tree.isFolder) {
      tree.items.unshift({
        name: name,
        id: new Date().getTime(),
        isFolder,
        items: [],
      });
      return tree;
    }

    const updatedItems = tree.items.map((child) => {
      return insertNode(child, folderId, name, isFolder);
    });

    return { ...tree, items: updatedItems };
  }

  function deleteNode(tree: Folder, folderId: number): Folder | null {
    // If current node matches, return null to delete it
    if (tree.id === folderId) return null;
  
    // Recursively update children
    const updatedItems = tree.items
      .map((child) => deleteNode(child, folderId)) // Get updated children
      .filter((child) => child !== null) as Folder[]; // Remove deleted nodes
  
    // Return new object with updated items
    return { ...tree, items: updatedItems };
  }
  
  return { insertNode, deleteNode };
};
export default useTreeTraversal;
