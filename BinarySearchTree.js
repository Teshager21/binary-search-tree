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

    insert(rt,value){
        console.log('called..',value)
        const node= new Node(value);
       if(rt.value===undefined){
            Object.assign(rt,node);
            rt.right= new Node();
            rt.left= new Node();
            return;
       } 
       (node.value>rt.value)? this.insert(rt.right,node.value) : this.insert(rt.left,node.value);
       
    }

    #arrayToBST(array){
        console.log(array);
        const len=array.length;
        if(len>1){
            const mid= Math.floor(len/2);
            const leftArray= array.slice(0,mid);
            const rightArray= array.slice(mid+1,len);
            this.insert(this.root,array[mid]);
            this.#arrayToBST(leftArray);
            this.#arrayToBST(rightArray);
        
        }else{
             this.insert(this.root,array[0]);
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