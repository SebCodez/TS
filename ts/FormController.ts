
import { FormService } from './FormService';

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

    const jsonForm = this.formToJSON(this.formElement.elements);

    try {
      this.formService.submit(jsonForm);
    } catch (e) {
      this.formElement.className += 'invalid';
      this.displayError(e);
      //TODO: Clarify if client wants fields to reset
      //this.formElement.reset();
    }
  }

  private formToJSON(elements: HTMLFormControlsCollection): JSON {
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