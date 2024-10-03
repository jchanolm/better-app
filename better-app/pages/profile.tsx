import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

export default function Profile() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    router.push("/")
    return <p>Access Denied</p>
  }

  return (
    <div>
      <h1>Profile</h1>
      {session?.user?.email && <p>Email: {session.user.email}</p>}
      {/* Add more profile information here */}
    </div>
  )
}