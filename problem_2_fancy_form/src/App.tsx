import React, { ChangeEvent, useEffect, useState } from 'react'
import ReactSelect, { components } from 'react-select'
interface Token {
    currency?: string
    date?: Date
    price: number
    src?: string
    icon?: string
    value: number
}

const Option = (props: any) => (
    <components.Option {...props} className="country-option">
        <img src={props.data.icon} alt="logo" className="country-logo" />
        {props.data.label}
    </components.Option>
)

const App: React.FC = () => {
    const [base, setBase] = useState<Token | null>(null)
    const [amount, setAmount] = useState('')
    const [convertTo, setConvertTo] = useState<Token | null>(null)
    const [result, setResult] = useState<string>('')
    const [tokens, setTokens] = useState([])

    const handleSelect = (e: any, type: string) => {
        if (type === 'from') {
            setBase(e)
        } else {
            setConvertTo(e)
        }
        setResult('')
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value)
        setResult('')
    }

    const handleSwapToken = () => {
        setBase(convertTo)
        setConvertTo(base)
        setResult('')
    }

    const swap = () => {
        if (base && convertTo) {
            const rate = base.value / convertTo.value
            const equivalentAmount = rate * base.value
            setResult(equivalentAmount.toFixed(6))
        }
    }

    const SingleValueFrom = ({ children, ...props }: any) => (
        <components.SingleValue {...props}>
            <img src={base?.icon} alt="s-logo" className="selected-logo mr-2" />
            {children}
        </components.SingleValue>
    )

    const SingleValueTo = ({ children, ...props }: any) => (
        <components.SingleValue {...props}>
            <img src={convertTo?.icon} alt="s-logo" className="selected-logo mr-2" />
            {children}
        </components.SingleValue>
    )

    useEffect(() => {
        const tokenPriceUrl = 'https://interview.switcheo.com/prices.json'
        fetch(tokenPriceUrl)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then(data => {
                const tokens = data.map((token: Token) => {
                    return {
                        label: token.currency,
                        value: token.price,
                        icon: `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${token.currency}.svg`,
                    }
                })
                setTokens(tokens)
            })
            .catch(error => {
                console.error(error)
            })
    }, [])

    return (
        <div className="hero-background">
            <div className="container my-5">
                <div className="card card-body">
                    <div className="d-flex justify-content-center gap-5">
                        <form className="d-flex align-items-center mb-4">
                            <input className="form-control rounded-start mr-3" value={amount} type="number" onChange={handleInput} />
                            <ReactSelect
                                value={base}
                                options={tokens}
                                className="select-form"
                                onChange={(e: any) => handleSelect(e, 'from')}
                                placeholder="Select a token"
                                styles={{
                                    singleValue: base => ({
                                        ...base,
                                        display: 'flex',
                                        alignItems: 'center',
                                    }),
                                    control: base => ({
                                        ...base,
                                        borderTopLeftRadius: '0 !important',
                                        borderBottomLeftRadius: '0 !important',
                                    }),
                                }}
                                components={{
                                    Option,
                                    SingleValue: SingleValueFrom,
                                }}
                            />
                        </form>
                        <div className="btn-swap-token cursor-pointer">
                            <h1 onClick={handleSwapToken} className="swap">
                                &#8595;&#8593;
                            </h1>
                        </div>
                        <form className="d-flex align-items-center mb-4">
                            <input className="form-control rounded-start mr-3" disabled={true} value={result} />
                            <ReactSelect
                                value={convertTo}
                                options={tokens}
                                className="select-form"
                                placeholder="Select a token"
                                onChange={(e: any) => handleSelect(e, 'to')}
                                styles={{
                                    singleValue: base => ({
                                        ...base,
                                        display: 'flex',
                                        alignItems: 'center',
                                    }),
                                    control: base => ({
                                        ...base,
                                        borderTopLeftRadius: '0 !important',
                                        borderBottomLeftRadius: '0 !important',
                                    }),
                                }}
                                components={{
                                    Option,
                                    SingleValue: SingleValueTo,
                                }}
                            />
                        </form>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button className="btn-swap" onClick={swap}>
                            Swap
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
