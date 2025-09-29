import React from 'react'

type Props = {
    id: string
    label: string
    type?: string
    value?: string | number
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    hint?: string
    placeholder?: string
    error?: string
}

export default function InputField({
    id,
    label,
    type = 'text',
    value,
    onChange,
    hint,
    placeholder,
    error,
}: Props) {
    return (
        <div className="mb-4 field">
            <label htmlFor={id} className="block text-sm font-medium text-shadow mb-1">
                {label}
            </label>
            <input
                id={id}
                name={id}
                type={type}
                value={value as any}
                onChange={onChange}
                placeholder={placeholder}
                aria-invalid={!!error}
                aria-describedby={error ? `${id}-error` : undefined}
                className="scandi-input w-full"
            />
            {hint && <p className="text-xs muted-text mt-1">{hint}</p>}
            {error && (
                <p id={`${id}-error`} className="text-sm text-red-600 mt-1" role="alert">
                    {error}
                </p>
            )}
        </div>
    )
}
