export interface Crypt {
  encrypt: (value: string) => Promise<string>
}
