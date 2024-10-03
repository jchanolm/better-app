import React from 'react';
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  return (props: P) => {
    const router = useRouter()
    const { data: session, status } = useSession()
    const isUser = !!session?.user
    React.useEffect(() => {
      if (status === "loading") return // Do nothing while loading
      if (!isUser) router.push("/")
    }, [isUser, status, router])

    if (isUser) {
      return <WrappedComponent {...props} />
    }

    // Session is being fetched, or no user.
    // If no user, useEffect() will redirect.
    return <div>Loading...</div>
  }
}

export default withAuth