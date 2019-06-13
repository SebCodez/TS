
import { IShape } from './IShape';
import { Triangle } from './Triangle';

export class FormService {

  constructor() {}

  public submit(formData: JSON): void {
    const shape: IShape = this.shapeFactory(formData);

    if (shape.validate()) {
      shape.draw();
    }
  }

  private shapeFactory(formData: JSON): IShape {
    switch (Object.keys(formData).length) {
      case 3: {
        return new Triangle(
          formData['side-A'],
          formData['side-B'],
          formData['side-C']
        );
      };
    };
  }
}