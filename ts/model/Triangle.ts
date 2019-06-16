import { ITriangle } from './ITriangle';
import { TriangleType } from './TriangleType';
import { IllegalArgumentException } from '../exception/IllegalArgumentException';

export class Triangle implements ITriangle {
  edgeA: number;
  edgeB: number;
  edgeC: number;

  constructor(
      private a: string,
      private b: string,
      private c: string) {
    this.edgeA = Number(a);
    this.edgeB = Number(b);
    this.edgeC = Number(c);

    if (!(this.edgeA && this.edgeB && this.edgeC)) {
      throw new IllegalArgumentException(
        "Invalid edges");
    }
  }

  public validate(): boolean {
    if (this.isAnySideTooShort()) {
      throw new IllegalArgumentException(
        "Length of sides cannot be less or equal to zero");
      return false;
    }

    if (this.violatesTriangleInequality()) {
      throw new IllegalArgumentException(
        "Sum of any two sides must be greater than the remaining side");
      return false;
    }

    return true;
  }

  public draw(): void {
    let sides: number[] = [this.edgeA, this.edgeB, this.edgeC];
    sides.sort(function(a, b) { return b - a });

    const scale = 100 / sides[0];
    const peakX: string = (scale * sides[1] * Math.sin(Math.PI / 2 -
      Math.acos((Math.pow(sides[0], 2) + Math.pow(sides[1], 2) -
      Math.pow(sides[2], 2)) / (2 * sides[0] * sides[1])))).toFixed(1);
    const peakY: string = (scale * Math.sqrt(Math.pow(sides[1], 2) -
      Math.pow(Number(peakX) / scale, 2))).toFixed(1);
    const colorA = "#000da7";
    const colorB = "#ff8f8f";
    const surface = document.getElementById('results-wrapper');

    surface.innerHTML =
      this.getTriangleType().toString() + '<br/><br/><svg height="'
      + peakY + '" width="100"><polygon points="0,0 100,0 '
      + peakX + ',' + peakY + '" style="fill:' + colorA
      + ';stroke:' + colorB + ';stroke-width:1" /></svg>';
    // When rendering is intensive, we'd apply double buffering
    surface.style.display = 'block';
  }

  public getTriangleType(): TriangleType {
    if (this.areSidesEqual()) {
      return TriangleType.EQUILATERAL;
    }

    if (this.areAtLeastTwoSidesEqual()) {
      return TriangleType.ISOSCELES;
    }

    return TriangleType.SCALENE;
  }

  private isAnySideTooShort(): boolean {
    return this.edgeA <= 0
        || this.edgeB <= 0
        || this.edgeC <= 0;
  }

  private violatesTriangleInequality(): boolean {
    return this.edgeA >= this.edgeB + this.edgeC
        || this.edgeB >= this.edgeA + this.edgeC
        || this.edgeC >= this.edgeA + this.edgeB;
  }

  private areSidesEqual(): boolean {
    return this.edgeA == this.edgeB
        && this.edgeB == this.edgeC;
  }

  private areAtLeastTwoSidesEqual(): boolean {
    return this.edgeA == this.edgeB
        || this.edgeB == this.edgeC
        || this.edgeC == this.edgeA;
  }

}