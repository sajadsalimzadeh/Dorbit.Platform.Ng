export enum JobAuditLogType {
  Create = 0,
  Start = 1,
  Cancel = 2,
  Pause = 3,
  Resume = 4,
}

export interface JobAuditLogDto {
  type: JobAuditLogType;
  time: string;
  userId: string;
  userName: string;
}

export enum JobStatus {
  Draft = 0,
  Running = 1,
  Pause = 2,
  Finish = 10,
}

export interface JobDto {
  id: string;
  name: string;
  startTime: string;
  cancelTime: string;
  endTime: string;
  status: JobStatus;
  pausable: boolean;
  progress: number;
  auditLogs: JobAuditLogDto;
}

export enum LogLevel {
  Trace,
  Debug,
  Information,
  Warning,
  Error,
  Critical,
  None,
}

export interface JobLogDto {
  level: LogLevel;
  message: string;
  stackTrace: string;
}
