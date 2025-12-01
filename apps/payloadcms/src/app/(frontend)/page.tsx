// import PageTemplate, { generateMetadata } from './[slug]/page'

// export const dynamic = 'force-dynamic'

// export default PageTemplate

// export { generateMetadata }
import { redirect } from 'next/navigation'

export default async function Page() {
  redirect('/admin')

  // ...
}
