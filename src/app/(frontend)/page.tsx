import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'
import { block } from 'sharp'

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

  const postCollectionBlock = page.layout.find(
    (block: any) => block.blockType === 'posts-collection'
  );
  const listofsectionsCollectionBlock = page.layout.map(block => block.blockType);

  const images = postCollectionBlock?.posts || [];

  const heroCollectionBlock = page.layout.find(
    (block: any) => block.blockType === 'hero'
  );

  const contentCollectionBlock = page.layout.find(
    (block: any) => block.blockType === 'content'
  );

  const joinUsCollectionBlock = page.layout.find(
    (block: any) => block.blockType === 'newsletter-form'
  );



  return (
    <div>
      {/* Head should be inside metadata or <Head />, not here */}
      <header>
        <h1>{page.title}</h1>
      </header>

      <div style=
        {{
          backgroundImage: `url(${heroCollectionBlock?.image?.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        id={`${heroCollectionBlock?.blockType}`}
      >
        <div className="banner ">
          <h1>{heroCollectionBlock?.heading}</h1>
          <p>{heroCollectionBlock?.subheading}</p>
        </div>
      </div>


      <nav className="main-nav">

        <ul >
          {listofsectionsCollectionBlock.map((section, index) => (
            <li key={index} >
              <li>
                <a href={`#${section}`} className="join">
                  {section}
                </a>
              </li>
            </li>
          ))}

        </ul>
      </nav>

      <main>
        <article id={`${contentCollectionBlock?.blockType}`}>
          <h2>{contentCollectionBlock?.heading}</h2>
          <p>
            {contentCollectionBlock?.content}
          </p>
          <img src={contentCollectionBlock?.image?.url} alt={contentCollectionBlock?.image?.alt} />
        </article>

        <ul className="images" id={`${postCollectionBlock?.blockType}`}>
          {images.map((img, index) => (
            <li key={index} >
              <figure>
                <img src={img.image.url} alt={img.image.alt} />
                <figcaption>{img.title}</figcaption>
                <body>
                  <p>{img.body}</p>
                </body>
              </figure>
            </li>
          ))}

        </ul>
      </main>

      <section className="join" id={`${joinUsCollectionBlock?.blockType}`}>

        <h2>{joinUsCollectionBlock?.heading}</h2>
        <p>
          {joinUsCollectionBlock?.body}
        </p>
        <form>
          <input
            type="email"
            name="email"
            placeholder="enter your email"
            required
          />
        </form>
      </section>

      <footer>
        <p className="copyright">© 2019 Marioclub</p>
      </footer>
    </div>
  );
}
