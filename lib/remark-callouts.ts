import { visit } from 'unist-util-visit'
import type { Root } from 'mdast'

const calloutConfig: Record<string, { emoji: string; label: string }> = {
  note: { emoji: '📝', label: 'Note' },
  info: { emoji: 'ℹ️', label: 'Info' },
  tip: { emoji: '💡', label: 'Tip' },
  warning: { emoji: '⚠️', label: 'Warning' },
  caution: { emoji: '⚡', label: 'Caution' },
  danger: { emoji: '🚨', label: 'Danger' },
}

export default function remarkCallouts() {
  return (tree: Root) => {
    visit(tree, (node: any) => {
      if (
        node.type === 'containerDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'textDirective'
      ) {
        const calloutType = node.name
        const config = calloutConfig[calloutType]

        if (config) {
          const data = node.data || (node.data = {})

          const titleNode = {
            type: 'paragraph',
            data: {
              hName: 'div',
              hProperties: {
                className: ['callout-title']
              }
            },
            children: [
              {
                type: 'text',
                value: `${config.emoji} ${config.label}`
              }
            ]
          }

          const contentNode = {
            type: 'div',
            data: {
              hName: 'div',
              hProperties: {
                className: ['callout-content']
              }
            },
            children: node.children
          }

          data.hName = 'div'
          data.hProperties = {
            className: ['callout', `callout-${calloutType}`],
            'data-callout': calloutType
          }

          node.children = [titleNode, contentNode]
        }
      }
    })
  }
}
