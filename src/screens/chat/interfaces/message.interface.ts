export interface Message {
  sender: string;
  content: string;
  time: string;
  fileUri?: string;
  fileType?: string;
}
