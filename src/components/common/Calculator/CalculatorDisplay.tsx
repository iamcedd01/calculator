import cx from 'clsx';
import { FC } from 'react';

import s from './CalculatorDisplay.scss';
import AutoScalingText from './AutoScalingText';

interface Props {
    value: string;
    className?: string;
}

const CalculatorDisplay: FC<Props> = ({ className, value }) => {
    const classes = cx(s.root, className);

    return (
        <div className={classes}>
            <AutoScalingText value={value} />
        </div>
    );
};

export default CalculatorDisplay;
