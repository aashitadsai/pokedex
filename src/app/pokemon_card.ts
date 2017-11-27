export class pokemon_card {
    front_default:string;
    back_default:string;    
    name:string;
    pokemon_url:string;
}

export class abilities {
    name:string;
    description:string;
}

export class pokemon_detail {
    name:string;
    front_default:string;
    back_default:string;
    base_experience:number;
    height:number;
    weight:number;
    abilities:abilities[];
}