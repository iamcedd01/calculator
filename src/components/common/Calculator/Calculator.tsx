import cx from 'clsx';
import { FC, useCallback, useMemo, useState } from 'react';

import s from './Calculator.scss';
import CalculatorKey from './CalculatorKey';
import CalculatorDisplay from './CalculatorDisplay';

interface Props {
    className?: string;
}

const CalculatorOperations = {
    '/': (prevValue: number, nextValue: number) => prevValue / nextValue,
    '*': (prevValue: number, nextValue: number) => prevValue * nextValue,
    '+': (prevValue: number, nextValue: number) => prevValue + nextValue,
    '-': (prevValue: number, nextValue: number) => prevValue - nextValue,
    '=': (prevValue: number, nextValue: number) => nextValue,
};

const Calculator: FC<Props> = ({ className }) => {
    const classes = cx(s.root, className);

    const [value, setValue] = useState<number | null>(null);
    const [operator, setOperator] = useState<string | null>(null);
    const [displayValue, setDisplayValue] = useState('0');
    const [waitingForOperand, setWaitingForOperand] = useState(false);

    const clearDisplay = useMemo(() => displayValue !== '0', [displayValue]);

    const handleClearDisplay = () => setDisplayValue('0');

    const handleClearAll = () => {
        setValue(null);
        setOperator(null);
        setDisplayValue('0');
        setWaitingForOperand(false);
    };

    const handleClear = useCallback(() => {
        if (clearDisplay) {
            handleClearDisplay();
        } else {
            handleClearAll();
        }
    }, [clearDisplay]);

    const handleToggleSign = useCallback(() => {
        const newValue = String(parseFloat(displayValue) * -1);
        setDisplayValue(newValue);
    }, [displayValue]);

    const handlePercent = useCallback(() => {
        const currentValue = parseFloat(displayValue);
        if (currentValue === 0) return;

        const fixedDigits = displayValue.replace(/^-?\d*\.?/, '');
        const newValue = (parseFloat(displayValue) / 100).toFixed(fixedDigits.length + 2);

        setDisplayValue(String(newValue));
    }, [displayValue]);

    const handleInputDot = useCallback(() => {
        if (!/\./.test(displayValue)) {
            const newValue = displayValue + '.';
            setDisplayValue(newValue);
            setWaitingForOperand(false);
        }
    }, [displayValue]);

    const handleInputDigit = useCallback(
        (digit: number) => {
            if (waitingForOperand) {
                setDisplayValue(String(digit));
                setWaitingForOperand(false);
            } else {
                const newValue = displayValue === '0' ? String(digit) : displayValue + digit;
                setDisplayValue(newValue);
            }
        },
        [displayValue, waitingForOperand]
    );

    const handleOperation = useCallback(
        (nextOperator: string) => {
            const inputValue = parseFloat(displayValue);

            if (value === null) {
                setValue(inputValue);
            } else if (operator) {
                const currentValue = value || 0;
                const newValue = CalculatorOperations[operator](currentValue, inputValue);

                setValue(newValue);
                setDisplayValue(String(newValue));
            }

            setOperator(nextOperator);
            setWaitingForOperand(true);
        },
        [value, displayValue, operator]
    );

    return (
        <div className={classes}>
            <CalculatorDisplay value={displayValue} />
            <div className={s.keypad}>
                <div className={s.inputs}>
                    <div className={s.functions}>
                        <CalculatorKey className={s.key} onPress={handleClear}>
                            {clearDisplay ? 'C' : 'AC'}
                        </CalculatorKey>
                        <CalculatorKey className={s.key} onPress={handleToggleSign}>
                            ±
                        </CalculatorKey>
                        <CalculatorKey className={s.key} onPress={handlePercent}>
                            %
                        </CalculatorKey>
                    </div>
                    <div className={s.digits}>
                        <CalculatorKey className={cx(s.key, s.zero)} onPress={() => handleInputDigit(0)}>
                            0
                        </CalculatorKey>
                        <CalculatorKey className={cx(s.key, s.dot)} onPress={handleInputDot}>
                            ●
                        </CalculatorKey>
                        <CalculatorKey className={cx(s.key, s.one)} onPress={() => handleInputDigit(1)}>
                            1
                        </CalculatorKey>
                        <CalculatorKey className={cx(s.key, s.two)} onPress={() => handleInputDigit(2)}>
                            2
                        </CalculatorKey>
                        <CalculatorKey className={cx(s.key, s.three)} onPress={() => handleInputDigit(3)}>
                            3
                        </CalculatorKey>
                        <CalculatorKey className={cx(s.key, s.four)} onPress={() => handleInputDigit(4)}>
                            4
                        </CalculatorKey>
                        <CalculatorKey className={cx(s.key, s.five)} onPress={() => handleInputDigit(5)}>
                            5
                        </CalculatorKey>
                        <CalculatorKey className={cx(s.key, s.six)} onPress={() => handleInputDigit(6)}>
                            6
                        </CalculatorKey>
                        <CalculatorKey className={cx(s.key, s.seven)} onPress={() => handleInputDigit(7)}>
                            7
                        </CalculatorKey>
                        <CalculatorKey className={cx(s.key, s.eight)} onPress={() => handleInputDigit(8)}>
                            8
                        </CalculatorKey>
                        <CalculatorKey className={cx(s.key, s.nine)} onPress={() => handleInputDigit(9)}>
                            9
                        </CalculatorKey>
                    </div>
                </div>
                <div className={s.operators}>
                    <CalculatorKey className={cx(s.key, s.divide)} onPress={() => handleOperation('/')}>
                        ÷
                    </CalculatorKey>
                    <CalculatorKey className={cx(s.key, s.multiply)} onPress={() => handleOperation('*')}>
                        ×
                    </CalculatorKey>
                    <CalculatorKey className={cx(s.key, s.subtract)} onPress={() => handleOperation('-')}>
                        −
                    </CalculatorKey>
                    <CalculatorKey className={cx(s.key, s.add)} onPress={() => handleOperation('+')}>
                        +
                    </CalculatorKey>
                    <CalculatorKey className={cx(s.key, s.equals)} onPress={() => handleOperation('=')}>
                        =
                    </CalculatorKey>
                </div>
            </div>
        </div>
    );
};

export default Calculator;
