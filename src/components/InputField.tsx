import React from 'react'

export default function InputField({
    label,
    children,
}: {
    label: string
    children: React.ReactNode
}) {
    return (
        <label className="flex flex-col">
            <span className="text-sm font-medium mb-1">{label}</span>
            {children}
        </label>
    )
}
