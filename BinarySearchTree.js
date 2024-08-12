class Node{
    constructor(value){
        this.value=value;
        this.left=null;
        this.right=null;
    }
}

class Tree{
    constructor(array){
        this.buildTree(array);
    }
    root=new Node();

    insert(value){
        this.#insert(this.root,value);
    }

    #insert(rt,value){
        const node= new Node(value);
       if(rt.value===undefined){
            Object.assign(rt,node);
            rt.right= new Node();
            rt.left= new Node();
            return;
       } 
       (node.value>rt.value)? this.#insert(rt.right,node.value) : this.#insert(rt.left,node.value);
       
    }

    #findMinOfSubtree(rt){
    //  console.log('min is ',rt);
     if(rt===null) return;
     if(rt.left.value===undefined && rt.right.value===undefined) return rt;
     if(rt.left.value===undefined) return rt;
     return this.#findMinOfSubtree(rt.left)
    }
    #deleteNode(rt,value){
        console.log(value);
        const node= new Node(value);
        if(rt===null) return;
        if(rt.value>node.value) {
            this.#deleteNode(rt.left,value);
            return;
        }
        if(rt.value<node.value){
            this.#deleteNode(rt.right,value);
            return;
        } 
          //found the item
            if(rt.left.value===undefined && rt.right.value===undefined){// node has no child
                const nullNode=new Node();
                Object.assign(rt,nullNode);
                return;
            }
            if(rt.right.value===undefined){ //node has only left child
                rt.value=rt.left.value;
                rt.left=null;
                return;
            }
            if(rt.left.value===undefined){ //node has only right child
                rt.value=rt.right.value;
                rt.right=null;
                return;
            }
           
         const minOfSubtree= this.#findMinOfSubtree(rt).value  //node has two children
         this.#deleteNode(rt,minOfSubtree);
         rt.value= minOfSubtree;
    }

    deleteItem(value){
        this.#deleteNode(this.root,value);

    }

    #arrayToBST(array){
        const len=array.length;
        if(len>1){
            const mid= Math.floor(len/2);
            const leftArray= array.slice(0,mid);
            const rightArray= array.slice(mid+1,len);
            this.#insert(this.root,array[mid]);
            this.#arrayToBST(leftArray);
            this.#arrayToBST(rightArray);
        
        }else{
             this.#insert(this.root,array[0]);
        }
    }

    buildTree(array){
        array.sort((a,b)=>a-b); //sort the array
        array=[...new Set(array)];   //remove duplicates
        console.log(array);
        this.#arrayToBST(array); //convert the sorted array into a balanced tree 
    }

}

export default Tree;