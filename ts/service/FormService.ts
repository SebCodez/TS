import { IShape } from '../model/IShape';
import { Triangle } from '../model/Triangle';
import { TriangleFormData } from '../model/TriangleFormData';

export class FormService {
  private readonly sideA: string = 'side-A';
  private readonly sideB: string = 'side-B';
  private readonly sideC: string = 'side-C';

  constructor() {}

  public createShape(formData: TriangleFormData): void {
    const shape: IShape = this.shapeFactory(formData);

    if (shape.validate()) {
      shape.draw();
    }
  }

  private shapeFactory(formData: TriangleFormData): IShape {
    switch (Object.keys(formData).length) {
      case 3: {
        return new Triangle(
          formData[this.sideA],
          formData[this.sideB],
          formData[this.sideC]
        );
      };
    };
  }
}