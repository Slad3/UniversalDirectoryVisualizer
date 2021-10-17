//Node class is intended to store information about folders and files that are visited in the process of tree traversal
import java.util.LinkedList;

public class Node {
    private String path;
    private Node parent;
    private LinkedList<Node> children;
    private int treeLevel;
    //TO-DO: Discuss nessecary data members

    public Node(){
        //Construct Node from File or Folder
        if(this.parent != null){
            this.treeLevel = this.parent.treeLevel + 1;
        }
        else{
            this.treeLevel = 0;
        }
        
    }

    public String getPath(){
        return this.path;
    }

    public Node getParent(){
        return this.parent;
    }

    public Node getChild(int i){
        return this.children.get(i);
    }

    public LinkedList<Node> getChildren(){
        return this.children;
    }

    public int countChildren(){
        return this.children.size();
    }

    public int getTreeLevel(){
        return this.treeLevel;
    }

}