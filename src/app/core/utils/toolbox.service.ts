import {Injectable} from '@angular/core';

@Injectable()
export class ToolBoxService {
  /**
   * @description Generates RFC4122-compliant v4 GUID.
   *
   * @return string value {string}
   */
  public genNewId(): string {
    function p8(flag) {
      const p = (Math.random().toString(16) + '000000000').substr(2, 8);
      return flag ? '-' + p.substr(0, 4) + '-' + p.substr(4, 4) : p;
    }

    return p8(false) + p8(true) + p8(true) + p8(false);
  }
}
