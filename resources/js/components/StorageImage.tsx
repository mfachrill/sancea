import { useQuery } from "@tanstack/react-query";
import { ImageIcon } from "lucide-react";

import { getSignedUrl } from "@/lib/catalog";

export function StorageImage({
  path,
  alt,
  className = "",
}: {
  path: string | null | undefined;
  alt: string;
  className?: string;
}) {
  const { data: url } = useQuery({
    queryKey: ["storage-url", path],
    queryFn: () => getSignedUrl(path),
    enabled: Boolean(path),
    staleTime: 1000 * 60 * 60,
  });

  if (!path || !url) {
    return (
      <div className={`flex items-center justify-center bg-cream text-gold-dark ${className}`}>
        <ImageIcon size={22} strokeWidth={1.2} />
      </div>
    );
  }

  return <img src={url} alt={alt} loading="lazy" className={className} />;
}
