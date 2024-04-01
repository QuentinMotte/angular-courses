import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ContactsService} from "../contacts/contacts.service";
import {addressTypesValues, phoneTypesValues} from "../contacts/contact.model";
import {restrictedWords} from "../validators/restricted-words.validators";
import {DateValueAccessorDirective} from "../date-value-accessor/date-value-accessor.directive";
import {ProfileIconSelectorComponent} from "../profile-icon-selector/profile-icon-selector.component";

@Component({
  imports: [CommonModule, ReactiveFormsModule, DateValueAccessorDirective, ProfileIconSelectorComponent],
  standalone: true,
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  phoneTypes = phoneTypesValues
  addressTypes = addressTypesValues

  contactForm = this.fb.nonNullable.group({
    icon: '',
    id: '',
    personal: false,
    firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    lastName: '',
    dateOfBirth: <Date | null>null,
    favoritesRanking: <number | null>null,
    phones: this.fb.array([this.createPhoneGroup()]),
    address: this.fb.nonNullable.group({
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      addressType: ''
    }),
    notes: ['', restrictedWords(['foo', 'bar'])]
  })


  constructor(
    private route: ActivatedRoute,
    private contactsSvc: ContactsService,
    private router: Router,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return

    this.contactsSvc.getContact(contactId).subscribe(
      contact => {
        if (!contact) return;

        for (let i = 1; i < contact.phones.length; i++) {
          this.addPhone()
        }
        this.contactForm.setValue(contact)
      }
    )
  }

  createPhoneGroup() {
    const phoneGroup = this.fb.nonNullable.group({
      phoneNumber: '',
      phoneType: '',
      preferred: false
    })

    phoneGroup.controls.preferred.valueChanges.subscribe(
      (preferred: boolean) => {
        if (preferred) {
          this.phones.forEach(phone => {
            if (phone !== phoneGroup) {
              phone.controls.preferred.setValue(false)
            }
          })
        }
      }
    )

    return phoneGroup
  }

  addPhone() {
    this.contactForm.controls.phones.push(this.createPhoneGroup())
  }

  get firstName() {
    return this.contactForm.controls.firstName
  }

  get phones() {
    return this.contactForm.controls.phones.controls
  }

  get address() {
    return this.contactForm.controls.address
  }

  get notes() {
    return this.contactForm.controls.notes
  }

  saveContact() {

    this.contactsSvc.saveContact(this.contactForm.getRawValue()).subscribe(
      () => this.router.navigate(['/contacts'])
    )
  }
}
