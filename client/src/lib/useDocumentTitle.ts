import { useEffect } from "react";

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = `${title} | Workcraft Consult`;
  }, [title]);
}
