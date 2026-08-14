// mdast-util-to-hast reads data.hName/hProperties but doesn't type them.
// The export keeps this file a module rather than a global script, which is
// required for `declare module` below to augment mdast instead of replacing it.
export {}

declare module 'mdast' {
  interface Data {
    hName?: string
    hProperties?: Record<string, unknown>
  }
}
