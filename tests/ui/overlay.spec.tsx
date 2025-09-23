import React from 'react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CalculatorPage from '../../src/routes/[locale]/index'
import { IntlProvider } from 'react-intl'

const messages = {
    title: 'Calculator',
    'sex.label': 'Sex',
    'sex.male': 'Male',
    'sex.female': 'Female',
    'placeholders.enter_values': 'Enter values and click Calculate to see results.',
    'age.label': 'Age',
    'height.label': 'Height',
    'weight.label': 'Weight',
    'activity.sedentary': 'Sedentary',
    'activity.light': 'Light',
    'activity.moderate': 'Moderate',
    'activity.very': 'Very Active',
    'activity.athlete': 'Athlete',
}

test('overlay opens on submit and closes via backdrop and Escape, focus returns', async () => {
    const user = userEvent.setup()
    render(
        <IntlProvider locale="en" messages={messages}>
            <CalculatorPage />
        </IntlProvider>
    )

    // Fill minimal form
    await user.clear(screen.getByLabelText(/age/i))
    await user.type(screen.getByLabelText(/age/i), '25')
    await user.clear(screen.getByLabelText(/height/i))
    await user.type(screen.getByLabelText(/height/i), '170')
    await user.clear(screen.getByLabelText(/weight/i))
    await user.type(screen.getByLabelText(/weight/i), '70')
    await user.selectOptions(screen.getByLabelText(/activity/i), 'moderate')

    // select sex (required)
    const male = screen.getByLabelText(/^Male$/i)
    await user.click(male)

    const calculate = screen.getByRole('button', { name: /calculate/i })
    // submit
    await user.click(calculate)

    // results region appears
    const results = await screen.findByRole('region', { name: /results/i })
    expect(results).toBeTruthy()

    // Click backdrop to close
    const backdrop = document.querySelector('.results-backdrop')
    expect(backdrop).toBeTruthy()
    await user.click(backdrop!)
    expect(screen.queryByRole('region', { name: /results/i })).toBeNull()

    // reopen
    await user.click(calculate)
    const results2 = await screen.findByRole('region', { name: /results/i })
    expect(results2).toBeTruthy()

    // press Escape to close
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('region', { name: /results/i })).toBeNull()

    // focus should return to calculate button
    expect(screen.getByRole('button', { name: /calculate/i })).toHaveFocus()
})
