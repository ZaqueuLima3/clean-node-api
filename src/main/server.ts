import { MongoHelper } from '@/infra/database/mongodb/helpers/MongoHelper'
import env from '@/main/config/env'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('@/main/config/app')).default
    app.listen(env.port, () => console.log(`Server running at https://localhost:${env.port}`))
  })
  .catch(console.error)
