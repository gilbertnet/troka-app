'use client'

import { useEffect } from 'react'

export default function ScrollResetOnLoad() {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    })
  }, [])

  return null
}
