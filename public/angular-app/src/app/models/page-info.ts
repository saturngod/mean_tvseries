export class PageInfo {
    #totalPage!: string;
    #first!: boolean;
    #last!: boolean;
    

    get totalPage() {return this.#totalPage;}
    get first() {return this.#first;}
    get last() {return this.#last;}
    

    set totalPage(value: string) { this.#totalPage = value;}
    set first(value: boolean) { this.#first = value;}
    set last(value: boolean) { this.#last = value;}

}