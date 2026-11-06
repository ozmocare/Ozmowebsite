import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Renders blog Markdown. Raw HTML is not rendered (react-markdown default), so a post
 * can't inject scripts. Styled with the Tailwind typography plugin.
 */
export default function Markdown({ children, className = "" }: { children: string; className?: string }) {
  return (
    <div
      className={`prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-extrabold prose-headings:uppercase prose-headings:tracking-tight prose-a:text-brand prose-strong:text-white prose-blockquote:border-l-brand prose-blockquote:text-white/80 prose-img:rounded-2xl prose-li:marker:text-brand ${className}`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => {
            const external = href?.startsWith("http");
            return (
              <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                {children}
              </a>
            );
          },
          // eslint-disable-next-line @next/next/no-img-element
          img: ({ src, alt }) => <img src={typeof src === "string" ? src : ""} alt={alt ?? ""} loading="lazy" />,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
