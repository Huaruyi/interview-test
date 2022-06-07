class LazySingleton {
    // 实例作为静态的私有属性
    private static instance: LazySingleton
    public name: string
    private constructor(name: string) {
        this.name = name;
    }

    public static getInstance(name?: string): LazySingleton {

        if (!LazySingleton.instance) {
            LazySingleton.instance = new LazySingleton(name);
        }

        return LazySingleton.instance;
    }
}


class HungrySingleton {
    // 实例作为静态的私有属性
    private static instance: HungrySingleton = new HungrySingleton()
    name: string;


    public static getInstance(): HungrySingleton {

        return HungrySingleton.instance;
    }
}


let lazy_single = LazySingleton.getInstance('LazySingleton')
console.log(lazy_single.name)

let lazy_single2 = LazySingleton.getInstance()
console.log(lazy_single === lazy_single2)

lazy_single.name = 'test'
console.log(lazy_single.name)
console.log(lazy_single2.name)


let hungry_single = HungrySingleton.getInstance()
console.log(hungry_single.name)

// 输出 true
let hungry_single2 = HungrySingleton.getInstance()
console.log(hungry_single === hungry_single2)

hungry_single.name = 'test'
console.log(hungry_single.name)
console.log(hungry_single2.name)
