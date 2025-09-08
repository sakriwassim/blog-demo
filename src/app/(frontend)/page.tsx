import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'
import { Page } from '@playwright/test'

import HeroBlock from './components/hero_block'
import NewsletterBlock from './components/NewsletterBlock'
import Content from './components/content'
import Post from './components/posts'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  const { docs: [page] } = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'here is the slug '
      }
    }
  })

  if (!page) {
    return < div >No pages found</div>
  }

  const renderBlock = (block: Page['layout'][0]) => {
    switch (block.blockType) {
      case 'hero':
        return <HeroBlock block={block} key={block.id} />
      case 'content':
        return <Content block={block} key={block.id} />
      case 'newsletter-form':
        return <NewsletterBlock block={block} key={block.id} />
      case 'example-collection':
        return <Post block={block} key={block.id} />
      default:
        return null
    }
  }

  return (
    <div>
      {page.title}
      {/* <pre>{JSON.stringify(page.layout[0], null, 2)}</pre> */}
      <div>{page.layout.map(block => renderBlock(block))}</div>
    </div>
  )
}
