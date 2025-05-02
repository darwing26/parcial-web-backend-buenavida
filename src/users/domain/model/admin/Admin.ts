import Usuario, { UserAttributes } from "../user/Usuario";

export default class Admin extends Usuario {


    constructor(adminAttributes : AdminAttributes) {
        super({
            id : adminAttributes.id,
            nombre: adminAttributes.nombre,
            correo: adminAttributes.correo,
            password: adminAttributes.password
        })
    }

    public override isNull = (): boolean => {
        return false
    }

}

export interface AdminAttributes extends UserAttributes {


}