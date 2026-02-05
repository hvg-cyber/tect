/*
    Constructor does not normally return anything
*/
function test() {
    class NativeHostService {
        constructor() {
            this.b = 10
            return {
                a: 5,
                obj: this
            }
        }
    }
    const nativeHostService = new NativeHostService()
    console.log(nativeHostService)
    console.log(nativeHostService.a)
    console.log(nativeHostService.obj.b)
}

test()
