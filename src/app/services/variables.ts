export class Variables {
    private static instance: Variables;
    //Assign "new Singleton()" here to avoid lazy initialisation
    private title: string;

    constructor() {
        if (Variables.instance) {
            throw new Error("Error - use Singleton.getInstance()");
        }
        this.title = 'Home';
    }

    static getInstance(): Variables {
        Variables.instance = Variables.instance || new Variables();
        return Variables.instance;
    }

    setTitle(title: string) {
        this.title = title;
    }

    getTitle() {
        return this.title;
    }
}