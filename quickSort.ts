function quickSort(arr: number[]): number[] {

    function myQuickSort(arr: number[], left: number, right: number): number[] {

        if (left >= right) {
            return;
        }

        let i: number = left;
        let j: number = right;
        let pivot: number = arr[i];

        // 用pivot作为中间值，将数组左右对半分
        while (i < j) {
            // 寻找右边比pivot更小的
            while (i < j && arr[j] >= pivot) {
                j--;
            }

            arr[i] = arr[j];

            // 寻找左边比pivot更大的
            while (i < j && arr[i] <= pivot) {
                i++;
            }

            arr[j] = arr[i];
        }

        arr[i] = pivot;



        // 递归，对两个子数组进行排序
        myQuickSort(arr, left, i - 1);
        myQuickSort(arr, i + 1, right);
    }

    myQuickSort(arr, 0, arr.length - 1);

   
    return arr
}

function generateCases(length: number, step: number = 1): number[] {
    const a: number[] = []
    let value = 0
    for (let i = 0; i < length; i++) {
        a.push(value)
        value += step
    }
    let tmp: number
    for (let i = 0; i < length; i++) {
        const f = Math.random() * (length - i)
        const r = i + Math.floor(f)
        tmp = a[r]
        a[r] = a[i]
        a[i] = tmp
    }
    return a
}

function checkRes(arr: number[], step: number): boolean {
    for (let i = 0; i < arr.length - 1; ++i) {
        if (arr[i] + step !== arr[i+1]) return false
    }
    return true
}


function testQuickSort() {
    for (let i = 6; i <= 100000; i = i * 2) {
        const randomStep = Math.ceil(Math.random() * 10)
        const arr = generateCases(i, randomStep)
        const start = Date.now()
        const ret = quickSort(arr)
        const end = Date.now()
        console.log(`Quick sort for ${i} numbers costs ${end - start}ms`)
        if (!checkRes(ret, randomStep)){
            console.log(`Fail`)
            return false
        } else {
            console.log("Passed")
        }
    }
    return true
}

testQuickSort()
//quickSort([ 60, 66, 90, 30, 96, 42, 6, 84, 0, 24, 18, 54, 48, 78, 102, 36, 72, 12 ])
