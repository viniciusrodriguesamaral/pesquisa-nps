import { NgForm } from '@angular/forms';

export abstract class AbstractFormComponent {

    homeState = 'in';
    msgEmpty = 'Nenhum registro encontrado para os parâmetros informados.';

    constructor() { }

    protected getForm(): NgForm {
        return undefined;
    }

    isNull(value): boolean {
        return value === null || value === undefined;
    }

    showError(input, form): boolean {
        return input && input.invalid && (input.touched || form.submitted);
    }

    mascaraTelefone(input): string {
        return !input || input.length <= 14 ? '(00) 0000-00009' : '(00) 00000-0000';
    }

    showErrorCNPJ(input, form): boolean {
        return this.showValidationError(input, form) && input.errors.cnpj;
    }

    showErrorCPF(input, form): boolean {
        return this.showValidationError(input, form) && input.errors.cpf;
    }

    showValidationError(input, form): boolean {
        return input && input.errors && (input.touched || form.submitted);
    }

    // tslint:disable-next-line: typedef
    compareSelect(o1, o2) {
        if (!o1 && !o2) { return true; }
        if (!o1 || !o2) { return false; }
        return o1.id === o2.id;
    }

    // tslint:disable-next-line: typedef
    compareSelectString(o1, o2) {
        if (!o1 && !o2) { return true; }
        if (!o1 || !o2) { return false; }
        // tslint:disable-next-line: triple-equals
        return o1.toString() == o2.toString();
    }

    getCpfNomeFormatado(cpf: string, nome: string): string {
        return this.formatarCpf(cpf) + ' - ' + nome;
    }

    deepcopy<T>(o: T): T {
        return JSON.parse(JSON.stringify(o));
    }

    downloadFile(data, filename, mime): any {
        // solucao para varios navegadores
        const blob = new Blob([data], { type: mime || 'application/octet-stream' });
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
            window.navigator.msSaveBlob(blob, filename);
            return;
        }
        const blobURL = window.URL.createObjectURL(blob);
        const tempLink = document.createElement('a');
        tempLink.style.display = 'none';
        tempLink.href = blobURL;
        tempLink.setAttribute('download', filename);
        if (typeof tempLink.download === 'undefined') {
            tempLink.setAttribute('target', '_blank');
        }
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        setTimeout(() => {
            window.URL.revokeObjectURL(blobURL);
        }, 100);
    }

    formatarCpf(cpf: string): string {
        return `${cpf.substr(0, 3)}.${cpf.substr(3, 3)}.${cpf.substr(6, 3)}-${cpf.substr(9, 2)}`;
    }

    random(qtdeAlgarismos: number): number {
        let numero: string = this.sortearNumero().toString();
        while (numero.length < qtdeAlgarismos) {
            numero += this.sortearNumero();
        }
        // tslint:disable-next-line: radix
        return Number.parseInt(numero);
    }

    sortearNumero(): number {
        return Math.floor(Math.random() * 9 + 1);
    }

    emptyDate(data: any): boolean {
        if (typeof (data) === 'number' || typeof (data) === 'boolean') {
            return false;
        }
        if (typeof (data) === 'undefined' || data === null) {
            return true;
        }
        if (typeof (data.length) !== 'undefined') {
            return data.length === 0;
        }
        let count = 0;
        for (const i in data) {
            if (data.hasOwnProperty(i)) {
                count++;
            }
        }
        return count === 0;
    }

  caracteresRestantes(qtd: number, input: any): number {
    if (!input) {
      return qtd;
    }
    return qtd - input.length;
  }
}
