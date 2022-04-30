import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { debounceTime, Observable, startWith, switchMap } from 'rxjs';
import { Channel, UserResponse } from 'stream-chat';
import { ChatClientService, DefaultStreamChatGenerics } from 'stream-chat-angular';

@Component({
  selector: 'app-invite-button',
  templateUrl: './invite-button.component.html',
  styleUrls: ['./invite-button.component.scss']
})
export class InviteButtonComponent implements OnInit {

  @Input()
  channel!: Channel;

  showDialog = false;

  userSearchField = new FormControl();

  availableUsers$!: Observable<UserResponse<DefaultStreamChatGenerics>[]>;

  constructor(private chatClientService: ChatClientService) { }

  ngOnInit(): void {
    this.availableUsers$ = this.userSearchField.valueChanges.pipe(
      debounceTime(300),
      startWith(''),
      switchMap(queryString => this.chatClientService.autocompleteUsers(queryString))
    )
  }

  addToChat({ option: {value:userId} }: MatAutocompleteSelectedEvent) {
    this.channel.addMembers([userId])
  }

}
