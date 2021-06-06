import { Medicao } from "./medicao.model";

export class Colmeia {
    id!: number;
    codigo!: string;
    dataCadastro!: string;
    medicoes!: Array<Medicao>;

    constructor() {
        this.medicoes = [];
    }
}