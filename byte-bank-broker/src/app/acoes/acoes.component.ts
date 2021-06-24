import { merge, Subscription } from 'rxjs';
import { AcoesService } from './acoes.service';
import { Acoes } from './modelo/acoes';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent  {

  acoesInput = new FormControl();
  todaAcoes$ = this.acoesService.getAcoes().pipe(tap(() => {console.log('Fluxo inicial')}));
  filtroPeloInput$ = this.acoesInput.valueChanges
    .pipe(
        tap(() => {console.log('Fluxo do Filtro')}),
        tap(console.log),
        filter((valorDigitado) => valorDigitado.length >= 3 || !valorDigitado),
        switchMap((valorDigitado) => this.acoesService.getAcoes(valorDigitado)));

  acoes$ = merge(this.todaAcoes$, this.filtroPeloInput$)

  constructor( private acoesService: AcoesService ) {}



}
