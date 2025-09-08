import { CollectionConfig } from "payload";


const Pages: CollectionConfig = {
    slug: 'pages',
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
        },
        {
            name: 'layout',
            type: 'blocks',
            required: true,
            blocks: [
                // ----------------------hero--------------------
                {
                    slug: 'hero',
                    fields: [
                        {
                            name: 'heading',
                            type: 'text',
                            required: true,
                        },
                        {
                            name: 'subheading',
                            type: 'text',
                            required: true,
                        },
                        {
                            name: 'image',
                            type: 'upload',
                            relationTo: 'media',
                            required: true,
                        }
                    ],
                },


                // ----------------------content--------------------
                {
                    slug: "content",
                    fields: [
                        {
                            name: "heading",
                            type: "text",
                            required: true,
                        },
                        {
                            name: "content",
                            type: "text",
                            required: true,
                        },
                        {
                            name: "image",
                            type: "upload",
                            relationTo: "media",
                            required: false,
                        }
                    ],
                },
                /// Newsletter Form Block
                {
                    slug: 'newsletter-form',
                    fields: [
                        {
                            name: 'heading',
                            type: 'text',
                            required: false,
                        },
                        {
                            name: 'body',
                            type: 'text',
                            required: false,
                        },
                        {
                            name: 'form',
                            type: 'relationship',
                            relationTo: 'forms',
                            required: true,
                        }
                    ]

                },

                // Example of a custom block with an array field
                {
                    slug: 'posts-collection',
                    fields: [
                        {
                            name: 'posts', // required
                            type: 'array', // required
                            label: 'list of posts', // optional
                            labels: {
                                singular: 'Post',
                                plural: 'Posts',
                            },
                            fields: [
                                // required
                                {
                                    name: 'title',
                                    type: 'text',
                                },
                                {
                                    name: 'image',
                                    type: 'upload',
                                    relationTo: 'media',
                                    required: true,
                                },
                                {
                                    name: 'body',
                                    type: 'text',
                                },
                            ],
                        },
                    ],
                }

            ],
        }
    ],
}

export default Pages;