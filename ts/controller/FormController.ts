import { FormService } from '../service/FormService';
import { TriangleFormData } from '../model/TriangleFormData';

export class FormController {
  private formService: FormService;
  private formElement: HTMLFormElement;

  constructor(id: string) {
    this.formService = new FormService();
    this.initForm(id);
  }

  private initForm(id: string): void {
    this.formElement = document.getElementById(id) as HTMLFormElement;
    this.formElement.onsubmit = (e: Event) => this.submit(e);
    this.formElement.onreset = () => this.resetFormAndCanvas();
  }

  private submit(event: Event): void {
    event.preventDefault();

    const formObj: TriangleFormData = this.parseForm(this.formElement.elements);

    try {
      this.formService.createShape(formObj);
    } catch (e) {
      this.formElement.className += 'invalid';
      this.displayError(e);
      //TODO: Clarify if client wants fields to reset
      //this.formElement.reset();
    }
  }

  private resetFormAndCanvas(): void {
    this.formElement.className = '';
    const surface = document.getElementById('results-wrapper');
    surface.style.display = 'none';
  }

  private parseForm(elements: HTMLFormControlsCollection): TriangleFormData {
    return [].reduce.call(elements, (data, element) => {
      if (element.name) {
        data[element.name] = element.value;
      }
      return data;
    }, {});
  }

  private displayError(msg: string): void {
    alert(msg);
  }
}