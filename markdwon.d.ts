

declare module 'markdown' {
  type MarkDown = {
    toHTML: (s: string) => string
  }
  export var markdown: MarkDown
}