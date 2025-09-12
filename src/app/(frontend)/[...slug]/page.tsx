import { headers as getHeaders } from 'next/headers.js'
import { Block, getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import '../styles.css'
import { Page } from '@playwright/test'

import HeroBlock from '../components/hero_block'
import NewsletterBlock from '../components/NewsletterBlock'
import Content from '../components/content'
import Post from '../components/posts'


export default async function HomePage({ params }: { params: { slug: string } }) {
    const slug = (params.slug as unknown as string[]).join('/')


    // const headers = await getHeaders()
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    // const { user } = await payload.auth({ headers })
    // const searchParams = useSearchParams()

    // const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`
    // const slug = useParams()?.slug


    const { docs: [page] } = await payload.find({
        collection: 'pages',
        where: {
            slug: {
                equals: slug
            }
        }
    })

    if (!page) {
        return <div>No pages found</div>
    }

    const renderBlock = (block: any) => {
        switch (block.blockType) {
            case 'section':
                return <section>
                    <p><b>{block.title}</b></p>
                    <div dangerouslySetInnerHTML={{ __html: block.description }}></div>

                </section>
            case 'hero':
                return (
                    <Image alt="play-ojo" src={"caseStudyImage"} className=" xl:mx-auto m-auto mb-10 " />

                )
            case 'newsletter-form':
                return <NewsletterBlock block={block} key={block.id} />
            case 'example-collection':
                return <Post block={block} key={block.id} />
            default:
                return null
        }
    }
    console.log("wassim page .. ", page)

    return (
        <div className="">
            <div>{page.layout.map(block => renderBlock(block))}</div>

            <div className="max-w-[1440px] mx-auto lg:px-12 md:px-4 px-2.5 ">
                <GetInTouchSection title="Looking to expand the user base of your app?" description="Talk to our Growth Team" />
            </div>
        </div>
    )

}
