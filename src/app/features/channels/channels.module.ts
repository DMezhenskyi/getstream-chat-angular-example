import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewChannelComponent } from './new-channel/new-channel.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NewChannelComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  exports: [
    NewChannelComponent
  ]
})
export class ChannelsModule { }
