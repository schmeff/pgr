type ObjectType = { [key: string]: any };

declare global {
    function createSpyObj(name: string, functions: string[] | ObjectType): any;
}
export {}
