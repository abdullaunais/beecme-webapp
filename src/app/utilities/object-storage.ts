export class ObjectStorage {
    constructor() {}

    public set(key: string, obj: any) {
        localStorage.setItem(key, JSON.stringify(obj));
    }

    public get(key: string): any {
        if(localStorage.getItem(key) === null) {
            return null;
        } else {
            let objString = localStorage.getItem(key);
            return JSON.parse(objString);
        }
    }

    public remove(key: string) {
        localStorage.removeItem(key);
    }
}
