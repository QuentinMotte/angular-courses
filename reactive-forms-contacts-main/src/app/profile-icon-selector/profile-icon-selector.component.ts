import {Component, forwardRef, Provider} from '@angular/core';
import {profileIconNames} from "./profile-icon-names";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

const PROFILE_ICON_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ProfileIconSelectorComponent),
  multi: true
}

@Component({
  selector: 'con-profile-icon-selector',
  standalone: true,
  imports: [],
  templateUrl: './profile-icon-selector.component.html',
  styleUrl: './profile-icon-selector.component.css',
  providers: [PROFILE_ICON_VALUE_ACCESSOR]
})
export class ProfileIconSelectorComponent implements ControlValueAccessor {
  profileIcons = profileIconNames
  showAllIcons = true
  selectedIcon!: string | null

  onChange!: Function
  onTouched!: Function

  onSelectIcon(icon: string) {
    this.showAllIcons = false
    this.selectedIcon = icon
    this.onChange(icon)
  }

  writeValue(icon: string | null) {
    this.selectedIcon = icon
    this.showAllIcons = !(icon && icon !== '');
  }

  registerOnChange(fn: Function) {
    this.onChange = (icon: string) => {
      fn(icon)
    }
  }

  registerOnTouched(fn: Function) {
    this.onTouched = fn
  }

}
