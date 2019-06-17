import { IllegalArgumentException } from '../../ts/exception/IllegalArgumentException';
import { TriangleFormData } from '../../ts/model/TriangleFormData';
import { TriangleType } from '../../ts/model/TriangleType';
import { Triangle } from '../../ts/model/Triangle';

describe('Triangle', () => {
  const nonPositiveLengthError = new IllegalArgumentException(
    "Length of sides cannot be less or equal to zero");
  const inequalityError = new IllegalArgumentException(
    "Sum of any two sides must be greater than the remaining side");

  const createTriangle = (a: number, b: number, c: number): Triangle => {
    return new Triangle(
      a.toString(),
      b.toString(),
      c.toString());
  };

  it('should be able to validate', () => {
    expect(createTriangle(2, 2, 1).validate()).toBe(true);
  });

  it('should be able to draw', () => {
    const triangleSpy: jasmine.Spy = spyOn<Triangle>(Triangle.prototype, 'draw');

    createTriangle(2, 2, 1).draw();

    expect(Triangle.prototype.draw).toHaveBeenCalledTimes(1);
  });

  it('should get type ISOSCELES', () => {
    const triangle: Triangle = createTriangle(2, 2, 1);

    expect(triangle.validate()).toBe(true);
    expect(triangle.getTriangleType()).toBe(TriangleType.ISOSCELES);
  });

  it('should get type EQUILATERAL', () => {
    const triangle: Triangle = createTriangle(2, 2, 2);

    expect(triangle.validate()).toBe(true);
    expect(triangle.getTriangleType()).toBe(TriangleType.EQUILATERAL);
  });

  it('should get type SCALENE', () => {
    const triangle: Triangle = createTriangle(10, 11, 12);
    expect(triangle.validate()).toBe(true);

    expect(triangle.getTriangleType()).toBe(TriangleType.SCALENE);
  });

  it('should invalidate when any edge length <= 0', () => {
    const triangle: Triangle = createTriangle(-1, 1, 2);
    expect(() => triangle.validate()).toThrow(nonPositiveLengthError);
  });

  it('should invalidate when inequality rule is broken', () => {
    const triangle: Triangle = createTriangle(2, 2, 10);
    expect(() => triangle.validate()).toThrow(inequalityError);
  });
});