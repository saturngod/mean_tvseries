export class PageInfo {
    #totalPage!: number;
    #first!: boolean;
    #last!: boolean;
    

    get totalPage() {return this.#totalPage;}
    get first() {return this.#first;}
    get last() {return this.#last;}
    

    set totalPage(value: number) { this.#totalPage = value;}
    set first(value: boolean) { this.#first = value;}
    set last(value: boolean) { this.#last = value;}

}