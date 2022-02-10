import cx from 'clsx';
import { FC } from 'react';
import PointTarget from 'react-point';

import s from './CalculatorKey.scss';

interface Props {
    onPress?: any;
    className?: string;
}

const CalculatorKey: FC<Props> = ({ onPress, className, ...props }) => {
    const classes = cx(s.root, className);

    return (
        <PointTarget onPoint={onPress}>
            <button className={classes} {...props} />
        </PointTarget>
    );
};

export default CalculatorKey;
