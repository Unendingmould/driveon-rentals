import { useEffect } from "react";

const SITE_NAME = "Trucksonflex";

export function usePageTitle(pageTitle?: string) {
  useEffect(() => {
    const nextTitle = pageTitle?.trim()
      ? `${pageTitle.trim()} | ${SITE_NAME}`
      : SITE_NAME;
    document.title = nextTitle;
  }, [pageTitle]);
}
