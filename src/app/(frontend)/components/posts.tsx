import { Page } from "@/payload-types";

type PostBlockProps = Extract<Page['layout'][0], { blockType: 'example-collection' }>

export default function Post({ block }: { block: PostBlockProps }) {
    return (
        <div className="bg-red-500 ">
            <h2>{block.blockName}</h2>

            <ul className="flex overflow-x-scroll space-x-4">
                {block.slider.map((item) => (
                    <div key={item.id} className={`bg-red-500`} >
                        <div className="bg-blue-500" style={{ width: 300, height: 400 }} >
                            <h3>{item.title}</h3>
                            <p>{item.body}</p>
                            <img src={item.image?.url} height={300} alt={item.image?.alt} />
                        </div>
                    </div>
                ))}
            </ul>

        </div>
    )
}
