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
    #height(node){
     if(node.right===null || node.right.value===undefined && node.left===null||node.left.value===undefined) return 0;
    const leftHeight=this.#height(node.left); 
    const righHeight=this.#height(node.right);
    return Math.max(leftHeight,righHeight)+1;
    }
    height(value){
        const node=this.find(value);
        return this.#height(node);
    }

    depth(value){
        const node= this.find(value);
        return (this.height(this.root.value)-this.height(node.value));
    }

    #findMinOfSubtree(rt){
     if(rt===null) return;
     if(rt.left.value===undefined && rt.right.value===undefined) return rt;
     if(rt.left.value===undefined) return rt;
     return this.#findMinOfSubtree(rt.left)
    }
    #find(rt,value){
        let found= new Node();
        if(rt===null ||value===null) return;
        if(rt.value>value) found=this.#find(rt.left,value);
        else if(rt.value<value) found=this.#find(rt.right,value);
        else found=rt;
        return found;
    }

    find(value){
        return this.#find(this.root,value);
    }
    #levelorder(rt,queue,callback){
        if (rt===null||rt===undefined) return;
        else if(queue.length===0)(queue.push(rt));
        if(rt.left.value!==undefined||rt.left===null) queue.push(rt.left);
        if(rt.right.value!==undefined || rt.right===null) queue.push(rt.right);
       
        if(queue.length>0){
            callback(queue[0]);
            queue.shift();
            this.#levelorder(queue[0],queue,callback);
        } 
        
        

    }
    levelOrder(callback){
        if(!callback) throw new Error('Please pass in a callback function');
        let queue=[];
        this.#levelorder(this.root,queue,callback);
    }
    #inOrder(rt,callback){
     if(rt===null||rt===undefined) return;
     if(rt.left!==null && rt.left.value!==undefined) this.#inOrder(rt.left,callback);
     callback(rt);
     if(rt.right.value!==undefined)this.#inOrder(rt.right,callback)
    }
    inOrder(callback){
        if(!callback) throw new Error("The inOrder methods requires and callback parameter");
        this.#inOrder(this.root,callback);
    }
    #preOrder(rt,callback){
        if(rt===null||rt===undefined) return;
        callback(rt);
        if(rt.left.value!==undefined &&rt.left!==null) this.#preOrder(rt.left,callback)
        if(rt.right.value!==undefined) this.#preOrder(rt.right,callback);
    }
    preOrder(callback){
        if(!callback) throw new Error("The preOrder method expects a call back function");
        this.#preOrder(this.root,callback);

    }
    #postOrder(rt,callback){
        if(rt===null||rt===undefined) return;
        if(rt.left.value!==undefined &&rt.left!==null) this.#preOrder(rt.left,callback)
        if(rt.right.value!==undefined) this.#preOrder(rt.right,callback);
        callback(rt);
    }
    postOrder(callback){
        if(!callback) throw new Error("The postOrder method expects a call back function");
        this.#postOrder(this.root,callback);

    }
    #deleteNode(rt,value){
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