import { registerEnumType } from "@nestjs/graphql";

export enum roles { 
    admin = "admin",
    user  = "user",
    superUser = "superUser"

    //Tambien se pueden hacer como normalmente para que coja valores numericos
    //admin,
    // user,
    // superUser
}

registerEnumType(roles, {name: 'roles'})