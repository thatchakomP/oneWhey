import React from 'react'

type Sex = 'male' | 'female'

type Props = {
    name?: string
    value?: Sex | null
    onChange: (v: Sex) => void
    labels?: { male: string; female: string }
    ariaLabel?: string
}

export default function SexToggle({ name = 'sex', value, onChange, labels, ariaLabel }: Props) {
    const opts: Sex[] = ['male', 'female']

    return (
        <fieldset className="col-span-1 border-b pb-4">
            <legend className="text-sm font-medium mb-2">{ariaLabel}</legend>
            <div
                role="radiogroup"
                aria-label={ariaLabel}
                className="inline-flex bg-panel p-2 rounded-full gap-2 field-width"
            >
                {opts.map((s) => {
                    const selected = value === s
                    return (
                        <label
                            key={s}
                            role="presentation"
                            tabIndex={0}
                            className={`px-4 py-2 rounded-full text-sm cursor-pointer transition duration-150 ease-out flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                                selected
                                    ? 'bg-[var(--accent)] text-white shadow'
                                    : 'text-muted hover:bg-panel'
                            }`}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    onChange(s)
                                    e.preventDefault()
                                }
                            }}
                            onClick={() => onChange(s)}
                        >
                            <input
                                name={name}
                                type="radio"
                                value={s}
                                checked={selected}
                                onChange={() => onChange(s)}
                                className="sr-only"
                            />
                            {/* inline icon */}
                            {s === 'male' ? (
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    aria-hidden
                                >
                                    <path
                                        d="M14 4h6v6"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M10 14a4 4 0 100-8 4 4 0 000 8z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    aria-hidden
                                >
                                    <path
                                        d="M12 2v6"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M8 14a4 4 0 108 0"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            )}
                            <span className="font-semibold text-sm">{labels ? labels[s] : s}</span>
                        </label>
                    )
                })}
            </div>
        </fieldset>
    )
}
