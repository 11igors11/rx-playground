export class TreeService {

    public run() {

        const tree = {
            a: {
                ab: {
                    abca: 1,
                    abcb: 2,
                    values: {
                      innerfirst: 11,
                      innerSecond: 22
                    }
                },
                ac: {
                    acda: 3,
                    acdb: -4
                }
            },
            b: {
                bc: {
                    bda: 7,
                    bdb: 1
                },
                bd: {
                    bda: 2,
                    bdb: 23
                }
            }
        };

        console.log(`tree: ${JSON.stringify(tree)}`);

        const func = console.log;

        console.log(`depth first`);
        this.dfs(tree, func);
        console.log(`breadth first`);
        this.bfs(tree, func);
    }

    private dfs(tree: Object, func: Function) {
        const walk = (data: any)=>{
            const keys = Object.keys(data);
            if(keys.length) {
                keys.forEach((key: string) => this.dfs(data[key], func));
            } else {
                func(data);
            }
        };

        walk(tree);
    }

    private bfs(tree: Object, func: Function) {

        const getValues = ((object: Object) => {
            return Object.keys(object).map((key: string) => object[key]);
        });

        const queue = [getValues(tree)];

        while(queue.length) {
            const node: any = queue.shift();
            const children = getValues(node);
            
            if(children.length) {
                queue.push(...children);
            } else {
                func(node);
            }

        }
    }
}