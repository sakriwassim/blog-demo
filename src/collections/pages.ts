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
                            type: 'richText',
                            required: true,
                        },
                        {
                            name: 'image',
                            type: 'upload',
                            relationTo: 'media',
                            required: true,
                        },
                        {
                            name: 'button',
                            type: 'group',
                            required: true,
                            fields: [
                                {
                                    name: 'label',
                                    type: 'text',
                                    required: true,
                                },
                                {
                                    name: 'link',
                                    type: 'text',
                                    required: true,
                                }
                            ],
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
                            type: "richText",
                            required: true,
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
                            name: 'form',
                            type: 'relationship',
                            relationTo: 'forms',
                            required: true,
                        }
                    ]

                },

                // Example of a custom block with an array field
                {
                    slug: 'example-collection',
                    fields: [
                        {
                            name: 'slider', // required
                            type: 'array', // required
                            label: 'Image Slider',
                            minRows: 2,
                            maxRows: 10,
                            // interfaceName: 'CardSlider', // optional
                            labels: {
                                singular: 'Slide',
                                plural: 'Slides',
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