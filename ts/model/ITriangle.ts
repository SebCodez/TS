import { IShape } from './IShape';
import { Triangle } from './Triangle';
import { TriangleType } from './TriangleType';

export interface ITriangle extends IShape {
  edgeA: Number;
  edgeB: Number;
  edgeC: Number;

  getTriangleType(triangle: Triangle): TriangleType;
}