
export abstract class Profile {
    abstract id: number;
    abstract name: string;
    abstract text: string;
    abstract datetime: Date;

    [Symbol.toPrimitive](hint?: string) {
        console.log(hint);
        switch (hint) {
            case 'number':
                return this.id;
            default:
                return this.toString();
        }
    }
    
    toString(): string {
        console.log("toString");
        return `${this.id}:${this.name}:${this.text}:${this.datetime}`;
    }

    valueOf(): number {
        console.log("valueOf");
        return this.id;
    }

    static datetimeOrder(p1: Profile, p2: Profile): number {
        return p1.datetime.getTime() - p2.datetime.getTime();
    }

    static datetimeOrderDesc(p1: Profile, p2: Profile): number {
        return - this.datetimeOrder(p1, p2);
    }

    static nameOrder(p1: Profile, p2: Profile): number {
        return p1.name.localeCompare(p2.name);
    }
}