import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataBr'
})
export class DataBrPipe implements PipeTransform {

  transform(value: string): string {
    if( !value){
      return '';
    }
    const dataArray = value.split('-');
    if( dataArray.length > 3){
      return value
    }
    return dataArray[2] + '/' + dataArray[1] + '/' + dataArray[0];
  }

}
