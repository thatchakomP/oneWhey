import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CalculatorPage from '../../routes/[locale]/index'
import { computeAll } from '../../lib/calc'
import { IntlProvider } from 'react-intl'

const messages = {
    title: 'Calculator',
    'sex.label': 'Sex',
    'sex.male': 'Male',
    'sex.female': 'Female',
    'age.label': 'Age',
    'height.label': 'Height',
    'weight.label': 'Weight',
    'activity.sedentary': 'Sedentary',
    'activity.light': 'Light',
    'activity.moderate': 'Moderate',
    'activity.very': 'Very Active',
    'activity.athlete': 'Athlete',
    'units.metric': 'Metric',
    'units.imperial': 'Imperial',
    'placeholders.enter_values': 'Enter values and click Calculate to see results.',
    'results.title': 'Results',
    'results.subtitle': 'Estimated daily energy needs',
    'label.bmr': 'BMR',
    'label.tdee': 'TDEE',
    'label.goals': 'Goals',
    'goal.cut20': 'Cut 20%',
    'goal.maintain': 'Maintain',
    'goal.bulk10': 'Bulk 10%',
    'goal.bulk20': 'Bulk 20%',
    'macros.title': 'Macros',
    'macros.protein': 'Protein',
    'macros.fat': 'Fat',
    'macros.carbs': 'Carbs',
}

test('calculator calculates BMR/TDEE on submit', async () => {
    const user = userEvent.setup()
    render(
        <IntlProvider locale="en" messages={messages}>
            <CalculatorPage />
        </IntlProvider>
    )

    // Age
    const age = screen.getByLabelText(/age/i)
    await user.clear(age)
    await user.type(age, '30')

    // Height
    const height = screen.getByLabelText(/height/i)
    await user.clear(height)
    await user.type(height, '180')

    // Weight
    const weight = screen.getByLabelText(/weight/i)
    await user.clear(weight)
    await user.type(weight, '80')

    // Activity select
    const activity = screen.getByLabelText(/activity/i)
    await user.selectOptions(activity, 'moderate')

    // Sex - male radio exists (use exact match to avoid matching 'female')
    const male = screen.getByLabelText(/^Male$/i)
    await user.click(male)

    // Click Calculate
    const btn = screen.getByRole('button', { name: /calculate/i })
    await user.click(btn)

    // Compute expected values
    const expected = computeAll({
        sex: 'male',
        age: 30,
        height: 180,
        weight: 80,
        units: 'metric',
        activity: 'moderate',
    })

    // Wait for results to appear
    const bmr = await screen.findByText(new RegExp(String(expected.bmr)))
    const tdee = await screen.findByText(new RegExp(String(expected.tdee)))

    expect(bmr).toBeInTheDocument()
    expect(tdee).toBeInTheDocument()
})
