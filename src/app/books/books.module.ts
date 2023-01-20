import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { BooksRoutingModule } from './books-routing.module';
import { HomeComponent } from './home/home.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { StoreFeatureModule, StoreModule } from '@ngrx/store';
import { booksreducer } from './store/books.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BooksEffect } from './store/books.effect';
import { AddComponent } from './add/add.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';





@NgModule({
  declarations: [
    HomeComponent,
    AddComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    MatCardModule,
    MatButtonModule,
    StoreModule.forFeature("mybooks",booksreducer),
    EffectsModule.forFeature([BooksEffect]),
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule




  ]

})
export class BooksModule { }
