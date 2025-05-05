import { Link } from 'react-router-dom';

import logo from '../assets/Logo-Teal-50.svg';

type Props = {
    furtherStyles?: string;
    linkTo?: string;
};

export function Logo({ furtherStyles, linkTo }: Props) {
    return (
        <Link
            to={linkTo ? linkTo : ''}
            className={`flex items-center justify-center ${furtherStyles} ${!linkTo ? 'cursor-default' : ''}`}
        >
            <img src={logo} alt="Logo" className="h-40 w-40" />
            <p className="my-4 text-5xl text-teal-50">
                Sanctu<span className="font-semibold">AI</span>ry
            </p>
        </Link>
    );
}
