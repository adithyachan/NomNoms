import LoadingLayout from "@/layouts/LoadingLayout"
import { useState } from "react"

export default function RestaurantPreview() {
  const [prefsSet, setPrefsSet] = useState(false)

  if (!prefsSet) {
    return <LoadingLayout />
  }

  return (
    <>
    </>
  )
}