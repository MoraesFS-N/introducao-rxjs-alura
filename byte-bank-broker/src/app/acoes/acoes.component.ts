import { merge, Subscription } from 'rxjs';
import { AcoesService } from './acoes.service';
import { Acoes } from './modelo/acoes';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';

const TIME_KEY = 300;

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
        debounceTime(TIME_KEY),
        tap(() => {console.log('Fluxo do Filtro')}),
        tap(console.log),
        filter((valorDigitado) => valorDigitado.length >= 3 || !valorDigitado),
        distinctUntilChanged(),
        switchMap((valorDigitado) => this.acoesService.getAcoes(valorDigitado)),
        tap(console.log))


  acoes$ = merge(this.todaAcoes$, this.filtroPeloInput$)

  constructor( private acoesService: AcoesService ) {}



}
