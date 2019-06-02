declare module 'exec-sh' {
  export interface ExecSh {
    (commands: string[], errorCallback: (error?: Error) => void): void;
  }

  const execSh: ExecSh;

  export default execSh;
}
