import { Plugin, PluginContext } from 'aloha-sdk'

export default class AlohaSamplePlugin extends Plugin {
  constructor(context: PluginContext) {
    super(context)
  }

  async toolCall(toolName: string, toolArgs: Record<string, any>): Promise<string> {
    if (toolName === "tellTime") {
        return this.tellTime(toolArgs.format)
    }

    throw new Error(`Tool ${toolName} is not available`)
  }

  tellTime(format: string) {
    const date = new Date()
    if (format === "iso") {
        return `The current time in \`${format}\` is **${date.toISOString()}**`
    }
    
    return `The current time in \`${format}\` is **${date.toLocaleString()}**`
  }
}