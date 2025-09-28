import { redirect } from 'next/navigation'

export default function Page() {
    // Server-side redirect from root to /en
    redirect('/en')
}
