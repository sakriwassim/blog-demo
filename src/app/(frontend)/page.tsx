import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'

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

  const images = postCollectionBlock?.posts || [];

  const heroCollectionBlock = page.layout.find(
    (block: any) => block.blockType === 'hero'
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
      >
        <div className="banner ">
          <h1>{heroCollectionBlock?.heading}</h1>
          <p>{heroCollectionBlock?.subheading}</p>
        </div>
      </div>


      <nav className="main-nav">
        <ul>
          <li>
            <a href="#join" className="join">
              Join the club
            </a>
          </li>
          <li>
            <a href="#news">Latest news</a>
          </li>
          <li>
            <a href="#games">New games</a>
          </li>
          <li>
            <a href="#join">Contact</a>
          </li>
        </ul>
      </nav>

      <main>
        <article id="news">
          <h2>It's me, Mario</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fuga
            ea hic molestias quasi repudiandae eius ut, nisi aspernatur delectus
            tempore, quia voluptatibus eveniet. Repellendus animi itaque sunt
            omnis voluptatibus.
          </p>
        </article>

        <ul className="images" id="games">
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

      <section className="join" id="join">
        <h2>Join Today!</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus eum
          magnam dolorum, eligendi eveniet accusamus.
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
