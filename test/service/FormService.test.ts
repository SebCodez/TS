import { FormService } from '../../ts/service/FormService';
import { TriangleFormData } from '../../ts/model/TriangleFormData';
import { Triangle } from '../../ts/model/Triangle';

describe('FormService', () => {
  let formService: FormService;
  let formDataMock: TriangleFormData;

  beforeEach(() => {
    formDataMock = {
      'side-A': '1',
      'side-B': '2',
      'side-C': '2'
    };

    formService = new FormService();
  });

  it('should be able to create a shape', () => {
    // Arrange
    const triangleSpy = spyOn(Triangle.prototype, 'validate');

    // Act
    formService.createShape(formDataMock);

    // Assert
    expect(triangleSpy).toHaveBeenCalledTimes(1);
  });
});