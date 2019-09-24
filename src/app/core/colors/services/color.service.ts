import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  // Taken from https://awik.io/determine-color-bright-dark-using-javascript/
  public checkIfColorIsLight(color: any): boolean {
    let r: any;
    let g: any;
    let b: any;

    if (color.match(/^rgb/)) {
      color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
      r = color[1];
      g = color[2];
      b = color[3];
    } else {
      color = +('0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));

      // tslint:disable-next-line: no-bitwise
      r = color >> 16;
      // tslint:disable-next-line: no-bitwise
      g = color >> 8 & 255;
      // tslint:disable-next-line: no-bitwise
      b = color & 255;
    }

    const hsp = Math.sqrt(
      0.299 * (r * r) +
      0.587 * (g * g) +
      0.114 * (b * b)
    );

    return hsp > 127.5;
  }
}
