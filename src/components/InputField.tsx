import React from 'react'

export default function InputField(props: { label: string; children?: React.ReactNode }) {
    return (
        <label style={{ display: 'block', marginBottom: 8 }}>
            <div style={{ fontSize: 14, marginBottom: 4 }}>{props.label}</div>
            {props.children}
        </label>
    )
}
