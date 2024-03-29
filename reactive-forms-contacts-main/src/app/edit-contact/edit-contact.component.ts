import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {ContactsService} from "../contacts/contacts.service";
import {addressTypesValues, phoneTypesValues} from "../contacts/contact.model";

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  phoneTypes = phoneTypesValues
  addressTypes = addressTypesValues

  contactForm = this.fb.nonNullable.group({
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: <Date | null>null,
    favoritesRanking: <number | null>null,
    phone: this.fb.nonNullable.group({
      phoneNumber: '',
      phoneType: ''
    }),
    address: this.fb.nonNullable.group({
      streetAddress: '',
      city: '',
      state: '',
      postalCode: '',
      addressType: ''
    }),
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

        this.contactForm.setValue(contact)
      }
    )
  }

  saveContact() {
    this.contactsSvc.saveContact(this.contactForm.getRawValue()).subscribe(
      () => this.router.navigate(['/contacts'])
    )
  }
}
