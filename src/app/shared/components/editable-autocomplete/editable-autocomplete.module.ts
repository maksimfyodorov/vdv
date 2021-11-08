import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditableAutocompleteComponent } from './editable-autocomplete.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [EditableAutocompleteComponent],
  imports: [
    CommonModule,
    AutoCompleteModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
  ],
  exports: [
    EditableAutocompleteComponent,
    AutoCompleteModule,
    ButtonModule
  ],
})
export class EditableAutocompleteModule { }
