import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Escolaridade'
})
export class EscolaridadePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value == 1) {
      value = 'Infantil'
    }
    else if(value == 2){
      value = 'Fundamental'
    }else if(value == 3){
      value = 'Médio'
    }
    else{
      value = 'Superior'
    }
    return value;
  }

}
