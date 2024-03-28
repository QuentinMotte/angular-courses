import {Directive} from "@angular/core";
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";

@Directive({
  selector: '[restrictedWords]',
  standalone: true,
  providers: [{
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: RestrictedWordsValidator
  }],
})
export class RestrictedWordsValidator implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const restrictedWords = ['foo', 'bar', 'baz']
    if (!control.value) return null
    const invalidWords = restrictedWords
      .map(word => control.value.includes(word) ? word : null)
      .filter(word => word !== null)
    return invalidWords.length > 0 ? {restrictedWords: true} : null
  }

}
