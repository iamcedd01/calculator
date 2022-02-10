import cx from 'clsx';
import { FC } from 'react';
import MuiContainer from '@material-ui/core/Container';
import Calculator from 'components/common/Calculator/Calculator';

import s from './MainLayout.scss';

const MainLayout: FC = () => {
    const classes = cx(s.root);

    return (
        <div className={classes}>
            <MuiContainer maxWidth="lg" className={s.wrapper}>
                <Calculator />
            </MuiContainer>
        </div>
    );
};

export default MainLayout;
