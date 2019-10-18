import { Req, Res } from 'react-imvc'

export function test(app: {
  use: (pattern?: string, ...args: Function[]) => void
}) {
  app.use('/test', (_: Req, res: Res) => {
    res.json('ok')
  })
}
