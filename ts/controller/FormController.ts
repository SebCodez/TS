import { FormService } from '../service/FormService';
import { TriangleFormData } from '../model/TriangleFormData';

export class FormController {
  private formService: FormService;
  private formElement: HTMLFormElement;

  constructor(id) {
    this.formService = new FormService();
    this.formElement = document.getElementById(id) as HTMLFormElement;
    this.formElement.onsubmit = (e: Event) => this.submit(e);
    this.formElement.onreset = () => {
      this.formElement.className = '';
      
    }
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

  private parseForm(elements: HTMLFormControlsCollection): TriangleFormData {
    return [].reduce.call(elements, (data, element) => {
      if (element.name) {
        data[element.name] = element.value;
      }
      return data;
    }, {});
  }

  private displayError(msg: string) {
    alert(msg);
  }
}