import { Injectable, Injector } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(public inj: Injector,
    private messageService: MessageService) { 
      this.messageService = inj.get(MessageService);
  }

  async addSuccessMessage(mensagem: string) {
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: mensagem });
  }

  async addErroMessage(mensagem: string) {
    this.messageService.add({ severity: 'error', summary: 'Erro', detail: mensagem });
  }

  async addWarningMessage(mensagem: string) {
    this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: mensagem });
  }

  async addInfoMessage(mensagem: string) {
    this.messageService.add({ severity: 'info', summary: 'Aviso', detail: mensagem });
  }
}
