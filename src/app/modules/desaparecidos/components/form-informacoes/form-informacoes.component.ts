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

  arquivoSelecionado!: File;
  urlImagem: string | null = null;
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
    formData.append(
      'files',
      this.arquivoSelecionado,
      this.arquivoSelecionado?.name
    );

    this._desaparecidoService.salvarInformacoes(formData).subscribe({
      next: () => this.dialogRef.close(),
      error: this._mensagemService.mensagemDeError(
        'Erro ao salvar novas informações!'
      ),
    });
  }

  // Função para capturar o arquivo selecionado (input tradicional)
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.processarArquivo(input.files[0]);
    }
  }

  // Função para processar o arquivo
  processarArquivo(file: File) {
    this.arquivoSelecionado = file;

    // Se for uma imagem, gerar um preview
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.urlImagem = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      this.urlImagem = null;
    }
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
      this.processarArquivo(event.dataTransfer.files[0]);
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
