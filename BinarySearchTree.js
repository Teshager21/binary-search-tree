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
    insertNode(rt,node ){
        // console.log(rt)
       if(rt!==null && rt.value===undefined){
        // console.log('been here',rt)
            Object.assign(rt,node);
            rt.right= new Node();
            rt.left= new Node();
       } 
       else { 
        if(rt===null) {
            Object.assign(rt,node)
            //  console.log('heeeeeeeeeere',rt)
            return rt
        }
        else if(node.value>rt.value){
            this.insertNode(rt.right,node);
            // console.log('root',this.root,rt.right);
        }else {
            this.insertNode(rt.left,node);
            // console.log('root left',this.root,rt.left)
        }
       }
    }
    buildTree(array){
    array.sort((a,b)=>a-b); //sort the array
    array=[...new Set(array)];   //remove duplicates
    // console.log(array)
    //build nodes from the sorted array
    array.forEach(element => {
        const node=new Node(element);
        this.insertNode(this.root,node);
    });
    //connect them together to build a tree
    }

}

// const node = new Node('Apple');
// console.log(node);

export default Tree;