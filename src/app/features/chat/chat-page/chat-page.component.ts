import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { catchError, Observable, of, switchMap, map, from } from 'rxjs';
import { Channel } from 'stream-chat';
import { ChannelActionsContext, ChannelPreviewContext, ChannelService, ChatClientService, CustomTemplatesService, DefaultStreamChatGenerics, StreamI18nService } from 'stream-chat-angular';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatPageComponent implements OnInit, AfterViewInit {

  chatIsReady$!: Observable<boolean>;

  @ViewChild('channelActionsTemplate')
  private channelActionsTemplate!: TemplateRef<ChannelActionsContext>;
  @ViewChild('channelPreview')
  private channelPreview!: TemplateRef<ChannelPreviewContext>;

  constructor(
    private chatService: ChatClientService,
    private channelService: ChannelService,
    private streamI18nService: StreamI18nService,
    private auth: AuthService,
    private customTemplatesService: CustomTemplatesService
  ) { }

  ngOnInit(): void {
    this.streamI18nService.setTranslation();
    this.chatIsReady$ = this.auth.getStreamToken().pipe(
      switchMap((streamToken) => this.chatService.init(
        environment.stream.key,
        this.auth.getCurrentUser().uid,
        streamToken 
      )),
      switchMap(() => this.channelService.init({
        type: 'messaging',
        members: { $in: [this.auth.getCurrentUser().uid] },
      })),
      map(() => true),
      catchError(() => of(false))
    )
  }
  ngAfterViewInit(): void {
      this.customTemplatesService.channelPreviewTemplate$.next(
        this.channelPreview
      )
      this.customTemplatesService.channelActionsTemplate$.next(
        this.channelActionsTemplate
      )
  }

  onCreate(name: string) {
    const dasherizedName = name.replace(/\s+/g, '-').toLowerCase();
    const channel = this.chatService.chatClient.channel(
      'messaging',
      dasherizedName,
      {
      name,
      members: [this.auth.getCurrentUser().uid]
    });
    from(channel.create());
  }

  activateChannel(channel: Channel<DefaultStreamChatGenerics>) {
    this.channelService.setAsActiveChannel(channel);
  }

}
