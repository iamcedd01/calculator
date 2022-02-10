import cx from 'clsx';
import { FC, useRef, useEffect, useState } from 'react';

import s from './AutoScalingText.scss';

interface Props {
    value: string;
    className?: string;
}

const AutoScalingText: FC<Props> = ({ value, className }) => {
    const classes = cx(s.root, className);
    const ref = useRef<HTMLDivElement>(null);

    const [scale, setScale] = useState(1);

    useEffect(() => {
        if (!!ref && ref.current) {
            const node = ref.current;
            const parentNode: HTMLDivElement | null = node.parentNode as HTMLDivElement;

            const availableWidth = parentNode.offsetWidth;
            const actualWidth = node.offsetWidth;
            const actualScale = availableWidth / actualWidth;

            if (scale === actualScale) return;

            if (actualScale < 1) {
                setScale(actualScale);
            } else if (scale < 1) {
                setScale(1);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref, value]);

    return (
        <div ref={ref} className={classes} style={{ transform: `scale(${scale}, ${scale})` }}>
            {value}
        </div>
    );
};

export default AutoScalingText;
