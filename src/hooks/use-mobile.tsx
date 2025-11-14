import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      setIsMobile(false)
      return
    }

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    const onChange = (event: MediaQueryListEvent | MediaQueryList) => {
      const matches = "matches" in event ? event.matches : window.innerWidth < MOBILE_BREAKPOINT
      setIsMobile(matches)
    }

    // Initial value based on media query when available, otherwise window width
    setIsMobile(mql.matches || window.innerWidth < MOBILE_BREAKPOINT)

    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", onChange)
      return () => {
        mql.removeEventListener("change", onChange)
      }
    }

    if (typeof (mql as any).addListener === "function") {
      ;(mql as any).addListener(onChange)
      return () => {
        ;(mql as any).removeListener(onChange)
      }
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return !!isMobile
}
