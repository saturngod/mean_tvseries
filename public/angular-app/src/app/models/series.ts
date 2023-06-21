import { FormGroup } from "@angular/forms"

export class Episode {
    #_id!: string
    #episode_number!: number
    #name!: string
    #overview!: string
    #image!: string

    set _id(value: string) { this.#_id = value;}
    set episode_number(value: number) { this.#episode_number = value;}
    set name(value: string) { this.#name = value;}
    set overview(value: string) { this.#overview = value;}
    set image(value: string) { this.#image = value;}

    get _id() { return this.#_id}
    get episode_number() { return this.#episode_number}
    get name() { return this.#name}
    get overview() { return this.#overview}
    get image() { return this.#image}
    
}
export class Season {
    
    #_id!: string
    #air_date!: string
    #name!: string
    #overview!: string
    #poster_path!: string
    #season_number!: number
    #episodes!: Episode[]

    set _id(value:string){ this.#_id = value;}
    set air_date(value:string){ this.#air_date = value;}
    set name(value:string){ this.#name = value;}
    set overview(value:string){ this.#overview = value;}
    set poster_path(value:string){ this.#poster_path = value;}
    set season_number(value:number){ this.#season_number = value;}
    set episodes(value: Episode[]) { this.#episodes = value;}

    get _id() { return this.#_id;}
    get air_date() { return this.#air_date;}
    get name() { return this.#name;}
    get overview() { return this.#overview;}
    get poster_path() { return this.#poster_path;}
    get season_number() { return this.#season_number;}
    get episodes() { return this.#episodes;}

}
export class Series {
    #_id!: string
    #title!: string
    #first_air_date!: string
    #last_air_date!: string
    #description!: string
    #popularity!: number
    #number_of_seasons!: number
    #production!: string
    #origin_country!: string
    #rate!: number
    #backdrop!: string
    #poster!: string
    #genres!: string[]
    #seasons!: Season[]

    set _id(value:string) { this.#_id= value}
    set title(value:string) { this.#title= value}
    set first_air_date(value:string) { this.#first_air_date= value}
    set last_air_date(value:string) { this.#last_air_date= value}
    set description(value:string) { this.#description= value}
    set popularity(value:number) { this.#popularity= value}
    set number_of_seasons(value:number) { this.#number_of_seasons= value}
    set production(value:string) { this.#production= value}
    set origin_country(value:string) { this.#origin_country= value}
    set rate(value:number) { this.#rate= value}
    set backdrop(value:string) { this.#backdrop= value}
    set poster(value:string) { this.#poster= value}
    set genres(value:string[]) { this.#genres= value}
    set seasons(value: Season[]) { this.#seasons = value}

    get _id() {return this.#_id}
    get title() {return this.#title}
    get first_air_date() {return this.#first_air_date}
    get last_air_date() {return this.#last_air_date}
    get description() {return this.#description}
    get popularity() {return this.#popularity}
    get number_of_seasons() {return this.#number_of_seasons}
    get production() {return this.#production}
    get origin_country() {return this.#origin_country}
    get rate() {return this.#rate}
    get backdrop() {return this.#backdrop}
    get poster() {return this.#poster}
    get genres() {return this.#genres}
    get seasons() { return this.#seasons}

    fillFromForm(formGroup: FormGroup) {
        this.title = formGroup.value.title;
        this.first_air_date = formGroup.value.first_air_date;
        this.description = formGroup.value.description;
        this.origin_country = formGroup.value.origin_country;
        this.rate = formGroup.value.rate;
        this.poster = formGroup.value.poster;
    }

    toJSON() {
        return {
            "title": this.title,
            "first_air_date": this.first_air_date,
            "description": this.description,
            "origin_country": this.origin_country,
            "rate" : this.rate,
            "poster": this.poster
        };
    }
}