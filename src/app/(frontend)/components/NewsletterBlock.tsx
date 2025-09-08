"use client"
import { Page } from "@/payload-types";
import { useState } from "react";

type NewsletterBlockProps = Extract<Page['layout'][0], { blockType: 'newsletter-form' }>

type FormState = {
    loading: boolean;
    error: string | null;
    success: boolean;
}

export default function NewsletterBlock({ block }: { block: NewsletterBlockProps }) {

    const [formData, setFormData] = useState({})

    const [formState, setFormState] = useState<FormState>({
        loading: false,
        error: null,
        success: false,
    })

    

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!block.form || typeof block.form !== 'object') return

        const formData = new FormData(e.target as HTMLFormElement)
        const data = Object.fromEntries(formData)

        console.log(data)
    }

    return (
        <div>
            {typeof block.form === 'object' && block.form && block.form.title === 'newsletter form 1' && block.form.fields && (
                <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
                    <h2>{block.heading}</h2>
                    <form className="form" onSubmit={handleSubmit} style={{
                        width: '100%',
                        maxWidth: '400px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                    }}>
                        {block.form.fields.map((field: any) => (
                            <div
                                style={{ display: 'flex', flexDirection: 'column' }}
                                key={field.name}>
                                <label htmlFor={field.name}>{field.label}</label>
                                <input
                                    style={{
                                        padding: '10px',
                                        fontSize: '16px',
                                        borderRadius: '4px',
                                        border: '1px solid #ccc'
                                    }}
                                    id={field.name}
                                    type={field.blockType}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    required={field.required}
                                />
                            </div>
                        ))}
                        <button
                            style={{
                                padding: '10px',
                                fontSize: '16px',
                                borderRadius: '4px',
                                border: '1px solid #ccc'
                            }}
                            type="submit">{block.form.submitButtonLabel || 'Subscribe'}</button>
                    </form>
                </div>
            )}
        </div>
    )
}