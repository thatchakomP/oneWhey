import CalculatorCard from '../../components/CalculatorCard'

export default function ExampleCalculator() {
    return (
        <div className="min-h-screen bg-bg text-fg">
            <header className="mx-auto max-w-5xl px-4 py-6">
                <h1 className="text-3xl font-semibold tracking-tight">
                    BMR &amp; TDEE Calculator — Example
                </h1>
            </header>
            <main className="mx-auto max-w-5xl px-4 pb-16">
                <CalculatorCard />
            </main>
        </div>
    )
}
