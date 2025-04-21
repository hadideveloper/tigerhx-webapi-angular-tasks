export interface PrinterStatus {
  isOnline: boolean;
  hasPaper?: boolean;
  isCoverOpen?: boolean;
  errorMessage?: string;
}
