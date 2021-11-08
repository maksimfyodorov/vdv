import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import { ToastModule } from 'primeng/toast';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { BlaStateComponent } from './notification-content-templates/8.1.4/bla-state/bla-state.component';
import { VideoStateComponent } from './notification-content-templates/8.2.20/video-state/video-state.component';
import { TextMessageComponent } from './notification-content-templates/common/text-message/text-message.component';
import { ExecutionReportComponent } from './notification-content-templates/common/execution-report/execution-report.component';
import { CreationRequestComponent } from './notification-content-templates/8.1.6/creation-request/creation-request.component';
import { RequestOfStaffingAndSecurityComponent } from './notification-content-templates/8.1.6/request-of-staffing-and-security/request-of-staffing-and-security.component';
import { DocumentWasReceivedComponent } from './notification-content-templates/8.1.6/document-was-received/document-was-received.component';
import { StaffingCommunicationNodeComponent } from './notification-content-templates/8.1.6/staffing-communication-node/staffing-communication-node.component';



@NgModule({
  declarations: [NotificationComponent, BlaStateComponent, VideoStateComponent, TextMessageComponent, ExecutionReportComponent, CreationRequestComponent, RequestOfStaffingAndSecurityComponent, DocumentWasReceivedComponent, StaffingCommunicationNodeComponent],
  imports: [
    CommonModule,
    ToastModule,
    SharedModule,
    TableModule,
  ],
  exports: [
    NotificationComponent,
  ],
})
export class NotificationModule { }
