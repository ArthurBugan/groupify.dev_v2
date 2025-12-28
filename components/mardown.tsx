// src/components/Markdown.tsx
import parse, { type HTMLReactParserOptions, domToReact, Element } from 'html-react-parser'
import { renderMarkdown, type MarkdownResult } from '@/lib/markdown'
import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'

import { useRef } from 'react'

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

function AdSense({ adSlot, adClient }: { adSlot?: string; adClient?: string }) {
  const adRef = useRef<HTMLModElement>(null);
  
  useEffect(() => {
    const w = typeof window !== 'undefined' ? window : null;
    if (w && w.adsbygoogle && adRef.current && !adRef.current.getAttribute('data-adsbygoogle-status')) {
      try {
        (w.adsbygoogle = w.adsbygoogle || []).push({});
      } catch (e) {
        console.error('AdSense error:', e);
      }
    }
  }, []);

  return (
    <div className="my-12 flex justify-center overflow-hidden min-h-[90px] bg-muted/5 rounded-xl border border-dashed border-border/50">
      <ins 
        ref={adRef}
        className="adsbygoogle"
        data-ad-layout="in-article"
        data-ad-format="fluid"
        style={{ display: 'inline-block', width: '728px', height: '90px' }}
        data-ad-client={adClient || "ca-pub-4077364511521347"}
        data-ad-slot={adSlot || "8284537241"}
      />
    </div>
  );
}

// Helper to inject ads every N paragraphs
function injectAds(content: string, frequency = 4) {
  const paragraphs = content.split('\n\n');
  if (paragraphs.length <= frequency) return content;

  const newParagraphs = [];
  for (let i = 0; i < paragraphs.length; i++) {
    newParagraphs.push(paragraphs[i]);
    // Inject ad every 'frequency' paragraphs, but not after the last one
    if ((i + 1) % frequency === 0 && i !== paragraphs.length - 1) {
      newParagraphs.push('<ins class="adsbygoogle"></ins>');
    }
  }
  return newParagraphs.join('\n\n');
}

type MarkdownProps = {
  content: string
  className?: string
  autoInjectAds?: boolean
}

export function Markdown({ content, className, autoInjectAds = false }: MarkdownProps) {
  const [result, setResult] = useState<MarkdownResult | null>(null)

  useEffect(() => {
    const finalContent = autoInjectAds ? injectAds(content) : content;
    renderMarkdown(finalContent).then(setResult)
  }, [content, autoInjectAds])

  if (!result) {
    return <div className={cn("animate-pulse space-y-4", className)}>
      <div className="h-8 bg-muted rounded w-3/4" />
      <div className="h-4 bg-muted rounded w-full" />
      <div className="h-4 bg-muted rounded w-5/6" />
    </div>
  }

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element) {
        // Handle Google AdSense <ins> tags
        if (domNode.name === 'ins' && domNode.attribs.class === 'adsbygoogle') {
          return (
            <AdSense 
              adClient={domNode.attribs['data-ad-client']} 
              adSlot={domNode.attribs['data-ad-slot']} 
            />
          )
        }

        // Headings
        if (domNode.name === 'h1') {
          return <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8 mt-12 scroll-m-20">{domToReact(domNode.children, options)}</h1>
        }
        if (domNode.name === 'h2') {
          return <h2 className="text-3xl font-bold tracking-tight mb-6 mt-10 scroll-m-20 border-b pb-2 transition-colors first:mt-0">{domToReact(domNode.children, options)}</h2>
        }
        if (domNode.name === 'h3') {
          return <h3 className="text-2xl font-semibold tracking-tight mb-4 mt-8 scroll-m-20">{domToReact(domNode.children, options)}</h3>
        }
        if (domNode.name === 'h4') {
          return <h4 className="text-xl font-semibold tracking-tight mb-4 mt-6 scroll-m-20">{domToReact(domNode.children, options)}</h4>
        }
        if (domNode.name === 'h5') {
          return <h5 className="text-lg font-semibold tracking-tight mb-2 mt-4 scroll-m-20">{domToReact(domNode.children, options)}</h5>
        }
        if (domNode.name === 'h6') {
          return <h6 className="text-base font-semibold tracking-tight mb-2 mt-4 scroll-m-20 uppercase text-muted-foreground">{domToReact(domNode.children, options)}</h6>
        }

        // Horizontal Rule
        if (domNode.name === 'hr') {
          return <hr className="my-12 border-t-2 border-muted opacity-50" />
        }

        // Tables
        if (domNode.name === 'table') {
          return (
            <div className="my-8 w-full overflow-y-auto rounded-xl border border-border bg-card/50">
              <table className="w-full text-sm">
                {domToReact(domNode.children, options)}
              </table>
            </div>
          )
        }

        if (domNode.name === 'thead') {
          return <thead className="bg-muted/50 border-b border-border">{domToReact(domNode.children, options)}</thead>
        }
        if (domNode.name === 'tr') {
          return <tr className="border-b border-border last:border-0 transition-colors hover:bg-muted/30">{domToReact(domNode.children, options)} </tr>
        }
        if (domNode.name === 'th') {
          return <th className="px-4 py-3 text-left font-bold text-foreground [&[align=center]]:text-center [&[align=right]]:text-right">{domToReact(domNode.children, options)}</th>
        }
        if (domNode.name === 'td') {
          return <td className="px-4 py-3 text-muted-foreground [&[align=center]]:text-center [&[align=right]]:text-right">{domToReact(domNode.children, options)}</td>
        }

        // Inline formatting
        if (domNode.name === 'em') {
          return <em className="italic text-foreground/90">{domToReact(domNode.children, options)}</em>
        }
        if (domNode.name === 'del') {
          return <del className="text-muted-foreground line-through decoration-primary/50">{domToReact(domNode.children, options)}</del>
        }

        // List Items (handling task lists)
        if (domNode.name === 'li') {
          const isTask = domNode.children.some(child => 
            child instanceof Element && 
            child.name === 'input' && 
            child.attribs.type === 'checkbox'
          );
          
          return (
            <li className={cn(
              "mt-2 leading-relaxed",
              isTask && "flex items-start gap-3 list-none -ml-6"
            )}>
              {domToReact(domNode.children, options)}
            </li>
          )
        }

        // Checkbox inputs (for task lists)
        if (domNode.name === 'input' && domNode.attribs.type === 'checkbox') {
          return (
            <input 
              type="checkbox" 
              readOnly 
              checked={domNode.attribs.checked !== undefined}
              className="mt-1 h-4 w-4 rounded border-primary bg-background text-primary focus:ring-primary/30 accent-primary"
            />
          )
        }

        // Paragraphs
        if (domNode.name === 'p') {
          return (
            <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground text-lg">
              {domToReact(domNode.children, options)}
            </p>
          )
        }

        // Blockquotes
        if (domNode.name === 'blockquote') {
          return (
            <blockquote className="mt-6 border-l-4 border-primary pl-6 italic text-xl font-medium text-foreground bg-primary/5 py-4 rounded-r-lg">
              {domToReact(domNode.children, options)}
            </blockquote>
          )
        }

        // Lists
        if (domNode.name === 'ul') {
          return (
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2 marker:text-primary">
              {domToReact(domNode.children, options)}
            </ul>
          )
        }

        if (domNode.name === 'ol') {
          return (
            <ol className="my-6 ml-6 list-decimal [&>li]:mt-2 marker:text-primary font-medium">
              {domToReact(domNode.children, options)}
            </ol>
          )
        }

        // Links
        if (domNode.name === 'a') {
          const href = domNode.attribs.href
          const classes = "font-medium text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-all"
          
          if (href?.startsWith('/')) {
            return (
              <Link to={href} className={classes}>
                {domToReact(domNode.children, options)}
              </Link>
            )
          }
          return (
            <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
              {domToReact(domNode.children, options)}
            </a>
          )
        }

        // Code blocks
        if (domNode.name === 'pre') {
          return (
            <pre className="relative my-8 overflow-x-auto rounded-xl bg-slate-950 p-6 font-mono text-sm leading-relaxed text-slate-50 shadow-2xl border border-white/10">
              {domToReact(domNode.children, options)}
            </pre>
          )
        }

        if (domNode.name === 'code') {
          // Check if it's inline code or inside a pre
          const isInline = domNode.parent?.name !== 'pre'
          if (isInline) {
            return (
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-primary">
                {domToReact(domNode.children, options)}
              </code>
            )
          }
        }

        // Images
        if (domNode.name === 'img') {
          return (
            <figure className="my-10 space-y-3">
              <img
                {...domNode.attribs}
                loading="lazy"
                className="rounded-2xl shadow-2xl border border-border w-full object-cover transition-transform hover:scale-[1.01] duration-500"
              />
              {domNode.attribs.alt && (
                <figcaption className="text-center text-sm text-muted-foreground italic">
                  {domNode.attribs.alt}
                </figcaption>
              )}
            </figure>
          )
        }

        // Strong/Bold
        if (domNode.name === 'strong') {
          return (
            <strong className="font-bold text-foreground">
              {domToReact(domNode.children, options)}
            </strong>
          )
        }
      }
    },
  }

  return <div className={cn("markdown-content", className)}>{parse(result.markup, options)}</div>
}