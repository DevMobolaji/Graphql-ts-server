export interface resolverMap {
    [key: string]: {
        [key: string]: (parent: any, args: any, content: {}, info: any) => any;
    }
}