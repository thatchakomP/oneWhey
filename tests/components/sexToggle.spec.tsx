import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SexToggle from '../../src/components/SexToggle'

test('SexToggle renders and toggles selection', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    render(<SexToggle ariaLabel="Sex" value={null} onChange={handleChange} />)

    const maleRadio = screen.getByRole('radio', { name: /^male$/i })
    const femaleRadio = screen.getByRole('radio', { name: /^female$/i })

    // initially none selected
    expect(maleRadio).not.toBeChecked()
    expect(femaleRadio).not.toBeChecked()

    // click male
    await user.click(maleRadio)
    expect(handleChange).toHaveBeenCalledWith('male')

    // click female to toggle
    await user.click(femaleRadio)
    expect(handleChange).toHaveBeenCalledWith('female')
})
