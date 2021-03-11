import {Pipe, PipeTransform} from '@angular/core';
import * as isDate from 'lodash/isDate';

@Pipe({name: 'orderBy', pure: false})
export class OrderByPipe implements PipeTransform {
  private static _orderByComparator(a: any, b: any): number {
    if (isDate(a) && isDate(b)) {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    } else if (isNaN(parseFloat(a)) || !isFinite(a) || (isNaN(parseFloat(b)) || !isFinite(b))) {
      if (a && b) {
        if (a.toLowerCase() < b.toLowerCase()) {
          return -1;
        }
        if (a.toLowerCase() > b.toLowerCase()) {
          return 1;
        }
      } else {
        return -1;
      }
    } else {
      if (parseFloat(a) < parseFloat(b)) {
        return -1;
      }
      if (parseFloat(a) > parseFloat(b)) {
        return 1;
      }
    }

    return 0;
  }

  public transform(input: any, [config = '+']): any {
    if (!Array.isArray(input) || input === undefined || input.length === 0) {
      return input;
    }

    if (!Array.isArray(config) || (Array.isArray(config) && config.length === 1)) {
      const propertyToCheck: string = !Array.isArray(config) ? config : config[0];
      const desc = propertyToCheck.substr(0, 1) === '-';

      if (!propertyToCheck || propertyToCheck === '-' || propertyToCheck === '+') {
        return !desc ? input.sort() : input.sort().reverse();
      } else {
        const property: string =
          propertyToCheck.substr(0, 1) === '+' || propertyToCheck.substr(0, 1) === '-'
            ? propertyToCheck.substr(1)
            : propertyToCheck;

        return input.sort((a: any, b: any) => {
          return !desc
            ? OrderByPipe._orderByComparator(a[property], b[property])
            : -OrderByPipe._orderByComparator(a[property], b[property]);
        });
      }
    } else {
      return input.sort((a: any, b: any) => {
        for (let i: number = 0; i < config.length; i++) {
          const desc = config[i].substr(0, 1) === '-';
          const property =
            config[i].substr(0, 1) === '+' || config[i].substr(0, 1) === '-' ? config[i].substr(1) : config[i];

          const comparison = !desc
            ? OrderByPipe._orderByComparator(a[property], b[property])
            : -OrderByPipe._orderByComparator(a[property], b[property]);

          if (comparison !== 0) {
            return comparison;
          }
        }

        return 0;
      });
    }
  }
}
