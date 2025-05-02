import Admin from "./Admin";

export default class NullAdmin extends Admin {

    constructor() {
        super({
            id : 0,
            nombre: 'Unknow',
            correo: 'Unknow',
            password: 'Unknow',
        });
    }

    public override isNull = (): boolean => {
        return true
    }
}