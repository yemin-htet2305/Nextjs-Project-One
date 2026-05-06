import React from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Code } from 'bright'
import TurndownService from 'turndown'

Code.theme = {
  light: 'github-light',
  dark: 'github-dark',
  lightSelector: 'html.light',
}

// Configure turndown
const turndown = new TurndownService({
  codeBlockStyle: 'fenced',
  fence: '```',
  headingStyle: 'atx',
})

// Preserve language class on code blocks (e.g., language-typescriptreact)
turndown.addRule('fencedCodeBlock', {
  filter: (node) =>
    node.nodeName === 'PRE' &&
    node.firstChild?.nodeName === 'CODE',
  replacement: (_content, node) => {
    const codeNode = (node as HTMLElement).firstChild as HTMLElement
    const className = codeNode.getAttribute('class') || ''
    const lang = className.match(/language-(\w+)/)?.[1] || ''
    const code = codeNode.textContent || ''
    return `\n\n\`\`\`${lang}\n${code}\n\`\`\`\n\n`
  },
})

// Strip unsafe / unsupported elements
turndown.remove(['script', 'style', 'iframe'])

// Detect if content is HTML (vs already markdown)
function isHtml(str: string): boolean {
  return /<\/?[a-z][\s\S]*>/i.test(str.trim())
}

// Convert HTML → markdown safely; pass markdown through unchanged
function normalizeContent(content: string): string {
  if (!isHtml(content)) return content
  try {
    return turndown.turndown(content)
  } catch (err) {
    console.error('Turndown conversion failed:', err)
    // Fallback: strip HTML tags and return plain text
    return content.replace(/<[^>]*>/g, '')
  }
}

export default function Preview({ content }: { content: string }) {
  const markdown = normalizeContent(content)

  return (
    <div className="prose max-w-none prose-headings:text-gray-200">
      <MDXRemote
        source={markdown}
        components={{
          pre: (props) => (
            <Code {...props} lineNumbers className="shadow-light-200" />
          ),
        }}
      />
    </div>
  )
}