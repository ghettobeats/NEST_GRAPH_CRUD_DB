
//!Se crea una interface y no una clase porque no se crearan instancias
export interface jwtPayload{

    id: string;
    iat: number;
    exp: number;

}