import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ETipoMensagem } from '../../../../shared/Models/enums/shared.enums';
import { MensagemService } from '../../../../shared/services/Mensagem.service';
import { Desaparecido } from '../../models/desaparecido.model';
import { DesaparecidosService } from '../../services/desaparecido.service';

@Component({
  selector: 'app-form-informacoes',
  imports: [MatDialogModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './form-informacoes.component.html',
  styleUrl: './form-informacoes.component.scss',
  standalone: true,
  providers: [DesaparecidosService],
})
export class FormInformacoesComponent {
  readonly dialogRef = inject(MatDialogRef<FormInformacoesComponent>);
  readonly data = inject<Desaparecido>(MAT_DIALOG_DATA);

  arquivosSelecionados: File[] = [];
  urlsImagens: string[] = [];

  arrastando = false;

  form!: UntypedFormGroup;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _desaparecidoService: DesaparecidosService,
    private _mensagemService: MensagemService
  ) {
    this._criarForm();
  }

  salvarInformacoes() {
    const { informacao, descricao, data, ocoId } = this.form.value;

    const formData = new FormData();
    formData.append('informacao', informacao);
    formData.append('descricao', descricao);
    formData.append('data', data);
    formData.append('ocoId', ocoId);

    this.arquivosSelecionados.forEach((f) => {
      formData.append('files', f, f.name);
    });

    this._desaparecidoService.salvarInformacoes(formData).subscribe({
      next: () => {
        this.dialogRef.close();
        this._mensagemService.mensagem(
          'Informações salvas!',
          ETipoMensagem.SUCCESS
        );
      },
      error: this._mensagemService.mensagemDeError(
        'Erro ao salvar novas informações!'
      ),
    });
  }

  // Função para capturar o arquivo selecionado (input tradicional)
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.processarArquivos(Array.from(input.files));
    }
  }

  // Processa todos os arquivos selecionados
  processarArquivos(files: File[]) {
    this.arquivosSelecionados = files;
    this.urlsImagens = [];

    files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.urlsImagens.push(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Eventos de Drag and Drop
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.arrastando = true;
  }

  onDragLeave() {
    this.arrastando = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.arrastando = false;

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const arquivos = Array.from(event.dataTransfer.files);
      this.processarArquivos(arquivos);
    }
  }

  private _criarForm(): void {
    this.form = this._formBuilder.group({
      informacao: [null, Validators.required],
      data: [null, Validators.required],
      ocoId: [this.data.ultimaOcorrencia.ocoId],
      descricao: [null],
    });
  }
}
