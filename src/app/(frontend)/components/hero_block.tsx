import { Page } from "@/payload-types";
import { RichText } from "@payloadcms/richtext-lexical/react";
import Image from "next/image";

type HeroBlockProps = Extract<Page['layout'][0], { blockType: 'hero' }>

export default function HeroBlock({ block }: { block: HeroBlockProps }) {
    return (
        <div >
            <h1>{block.heading}</h1>
            <RichText data={block.subheading} />
            <img src={block.image?.url} height={400} width={400} alt={block.image?.alt} />
        </div>
    );
}

