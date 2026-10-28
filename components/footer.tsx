import { GITHUB_URL, LINKED_IN_URL, X_URL, LEETCODE_URL, RESUME_URL, APP_NAME } from "@/constants";

const LINKS = [
  { url: GITHUB_URL, label: "GitHub" },
  { url: LINKED_IN_URL, label: "LinkedIn" },
  { url: LEETCODE_URL, label: "LeetCode" },
  { url: X_URL, label: "X" },
  { url: RESUME_URL, label: "Résumé" },
];

export const Footer = () => {
  return (
    <footer className="px-5 pt-[20svh] pb-8 text-small text-muted-foreground lg:px-10">
      <div className="grid gap-2 md:grid-cols-[1fr_auto_1fr] md:items-baseline md:gap-6">
        <p>{APP_NAME}, full-stack developer</p>
        <p className="flex flex-wrap gap-x-6 gap-y-1">
          {LINKS.map(link => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline-offset-4 hover:underline"
            >
              {link.label}
            </a>
          ))}
        </p>
        <p className="md:text-right">
          <span suppressHydrationWarning>{new Date().getFullYear()}</span>, Vadodara
        </p>
      </div>
    </footer>
  );
};
