import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  pure: false
})
export class SortPipe implements PipeTransform {

  transform(value: any[], criteria: SortCriteria): any[] {
    console.log('Piped');
    console.log(value);
    if (!value || !criteria)
      return value;
    
    let p: string = criteria.property;

    let sortFn:(a: any, b: any) => any = (a, b) => {
      let value: number = 0;
      if (a[p] === undefined) value = -1;
      else if (b[p] === undefined) value = 1;
      else value = a[p] > b[p] ? 1 : (b[p] > a[p] ? -1 : 0);
      return criteria.descending ? (value * -1) : value;
    };

    value.sort(sortFn);
    return value;
  }

}

export interface SortCriteria {
  property: string;
  descending?: boolean;
}