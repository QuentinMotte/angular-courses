import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsModule, NgForm} from "@angular/forms";
import {addressTypesValues, Contact, phoneTypesValues} from "../contacts/contact.model";
import {ContactsService} from "../contacts/contacts.service";
import {RestrictedWordsValidator} from "../validators/restricted-words-validator.directive";
import {DateValueAccessorDirective} from "../date-value-accessor/date-value-accessor.directive";
import {ProfileIconSelectorComponent} from "../profile-icon-selector/profile-icon-selector.component";

@Component({
  imports: [CommonModule, FormsModule, RestrictedWordsValidator, DateValueAccessorDirective, ProfileIconSelectorComponent],
  standalone: true,
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  phoneTypes = phoneTypesValues
  addressTypes = addressTypesValues
  contact: Contact = {
    id: '',
    icon: '',
    personal: true,
    firstName: '',
    lastName: '',
    dateOfBirth: new Date(),
    favoritesRanking: 0,
    phone: {
      phoneNumber: '',
      phoneType: ''
    },
    address: {
      streetAddress: '',
      city: '',
      state: '',
      postalCode: '',
      addressType: ''
    },
    notes: ''
  }

  constructor(private route: ActivatedRoute, private contactSvc: ContactsService, private router: Router) {
  }

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return
    this.contactSvc.getContact(contactId).subscribe(contact => {
      if (!contact) return
      this.contact = contact
    })
  }

  saveContact(form: NgForm) {
    console.log(form.value)
    this.contactSvc.saveContact(form.value).subscribe(() => {
      this.router.navigate(['/contacts'])
    })
  }
}
