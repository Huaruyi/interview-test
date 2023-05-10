class TreeNode {
    public key: number;
    public left: TreeNode;
    public right: TreeNode;

    constructor(key: number) {
        this.key = key;
    }
    
}

class SearchTree {
    private root!: TreeNode | null;
    private traversal: number[] = [];

    // 添加节点
    public add(key: number) {
        const node = new TreeNode(key);

        if (!this.root) {
            this.root = node;
            return;
        }

        let p = this.root;

        while(1) {
            if (p.key > key) {

                if (p.left) {
                    p = p.left;
                } else {
                    p.left = node;
                    return;
                }
            } else {
                if (p.right) {
                    p = p.right;
                } else {
                    p.right = node;
                    return;
                }
            }


        }
    }

    private insertNode(node: TreeNode, newNode: TreeNode) {
       if (!node) {
           return node;
       }

       if (node.key > newNode.key) {
           node.left = this.insertNode(node.left, newNode);
       } else {
           node.right = this.insertNode(node.right, newNode);
       }

       return node;
    }

    public hasValue(value: number): boolean {
        let flag: boolean = false;
        let node = this.root;
    
        while (node) {
            if (node.key === value) {
                flag = true;
                break;
            }

            if (node.key > value) {
                node = node.left;
            } else {
                node = node.right;
            }
        }


        console.log(flag);

        return flag;
    }

    /**
     * BST中序遍历
     */
    public print() {
        const result = [];
        const stack = [];
        let p = this.root;

        while (p || stack.length > 0) {
            while (p) {
                stack.push(p);
                p = p.left;
            }

            if (stack.length > 0) {
                p = stack.pop();
                result.push(p.key);
                p = p.right;
            }
        }

        console.log(result);
    }

    /**
     *  1删除需要有两个指针，一个是当前节点，一个是当前节点的父节点。（因为指针问题需要使用父节点删除）
        2先要找到要删除的节点，和要找到删除的节点的父节点。
        3会出现多种情况
                节点没找到
                节点是叶子节点
                节点是只有一个子节点
                节点有两个子节点
        4未找到不删除
        5叶子节点直接用父节点把相应的节点设置为null
        6只有一个子节点就将子节点替换当前节点
        7有两个子节点就从右节点找到最小的一个替换当前节点
     * @param value 
     * @returns 
     */
    public remove(value: number) {
        let node = this.root;
        let preNode = node;

        // 寻找目标node
        while (node) {
            if (node.key === value) {
                break;
            }
    
            if (node.key > value) {
                preNode = node;
                node = node.left;
            } else {
                preNode = node;
                node = node.right;
            }
        }

        if (!node) {
            return;

        }

        // leaf node
        if (!node.left && !node.right) {
            if (node === this.root) {
                this.root = null;
                return;
            }

            if (preNode.left === node) {
                preNode.left = null;
            } else {
                preNode.right = null;
            }

            node = null;
        } else if (node.left || node.right) {
            if (node === this.root) {
                if (node.left) {
                    this.root = node.left;
                } else {
                    this.root = node.right;
                }
            }

            if (preNode.left === node) {
                preNode.left = node.left ? node.left : node.right;
            } else {
                preNode.right = node.left? node.left : node.right;
            }

            node = null;
        } else {
            let parent = node;
            let child = node.right;

            while (child.left) {
                parent = child;
                child = child.left;
            }

            node.key = child.key;
            
            if (parent === node) {
                node.right = child.right;
            } else {
                parent.left = child.right;
            }

            child = null;
        }
    }

}

let t = new SearchTree()
t.add(2)
t.hasValue(2)  // true
t.add(4)
t.add(4)
t.add(3)
t.print()      // 升序输出，[2, 3, 4, 4]
t.remove(2)