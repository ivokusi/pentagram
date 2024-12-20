"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useUser } from "@clerk/clerk-react"
import { RedirectToSignIn } from "@clerk/clerk-react"

export default function LandingPage() {
  const [redirectToSignIn, setRedirectToSignIn] = useState(false)
  const { isSignedIn } = useUser()
  const router = useRouter()

  const handleCreateClick = () => {
    if (isSignedIn) {
      router.push("/create")
    } else {
      setRedirectToSignIn(true)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <h1 className="text-5xl font-bold mb-6">Welcome to Pentagram</h1>
      
      <div className="max-w-2xl mx-auto space-y-6">
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Turn your ideas into reality. 
        </p>
        
        <div className="flex justify-center space-x-4 mt-8">
          <Button 
            size="lg" 
            className="text-lg px-8 py-4"
            onClick={() => router.push("/explore")}
          >
            Explore
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-lg px-8 py-4"
            onClick={handleCreateClick}
          >
            Create
          </Button>
        </div>
      </div>
      {redirectToSignIn && <RedirectToSignIn />}
    </div>
  );
}
