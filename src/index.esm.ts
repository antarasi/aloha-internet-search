import { Plugin } from 'aloha-sdk'
import * as cheerio from 'cheerio'

export default class InternetSearchPlugin extends Plugin {
  async toolCall(toolName: string, args: { query: string }): Promise<string> {
    if (toolName === "searchInternet") {
      return this.webSearch(args.query)
    }

    throw new Error(`This tool is not available`)
  }

  async webSearch(query: string): Promise<string> {
    const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`
    const body = await this.getContext().renderUrl(url)
    const $ = cheerio.load(body)
    const results = $('.links_main')
      .map((_i, el) => {
        const $el = $(el)
        const url = $el.find('.result__title a').attr('href') || ''
        const iconUrl = $el.find('.result__icon img').attr('src') || ''
        return {
          title: $el.find('.result__title a').text(),
          url: url.startsWith('//') ? `https:${url}` : url,
          description: $el.find('.result__snippet').text()?.trim() || '',
          iconUrl: iconUrl.startsWith('//') ? `https:${iconUrl}` : iconUrl,
        }
      })
      .get()
  
    // Format results as markdown
    const markdownResults = results
      .map((result) => {
        const icon = result.iconUrl ? `![icon =20x20](${result.iconUrl}) ` : ''
        return `## ${icon}[${result.title}](${result.url})\n\n${result.description}\n`
      })
      .join('\n')
  
    return `Here's what I found on the web for \`${query}\`. Visit the links to get more accurate information.\n\n${markdownResults}`
  }
}