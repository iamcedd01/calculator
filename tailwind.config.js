module.exports = {
    important: true,
    darkMode: false, // or 'media' or 'class'
    purge: ['src/**/*/*.html', 'src/**/*.ts', './src/**/*.tsx'],
    theme: {
        extend: {
            width: {
                'column-1': `${(1 / 12) * 100}%`,
                'column-2': `${(2 / 12) * 100}%`,
                'column-3': `${(3 / 12) * 100}%`,
                'column-4': `${(4 / 12) * 100}%`,
                'column-5': `${(5 / 12) * 100}%`,
                'column-6': `${(6 / 12) * 100}%`,
                'column-7': `${(7 / 12) * 100}%`,
                'column-8': `${(8 / 12) * 100}%`,
                'column-9': `${(9 / 12) * 100}%`,
                'column-10': `${(10 / 12) * 100}%`,
                'column-11': `${(11 / 12) * 100}%`,
                'column-12': `${(12 / 12) * 100}%`,
            },
        },
        colors: {
            primary: '#FFB300',
            secondary: '#121F44',
            generalDark: '#070D1C',
            general: '#0B0C10',
            neutral: '#C5C6C7',
            light: '#EFEFEF',
        },
        fontFamily: {
            primary: ['Rajdhani', 'sans-serif'],
            secondary: ['"Open Sans"', 'sans-serif'],
        },
        screens: {
            xs: { max: '639px' },
            // => @media (max-width: 639px) { ... }
            sm: { min: '640px', max: '767px' },
            // => @media (min-width: 640px and max-width: 767px) { ... }
            md: { min: '768px', max: '1023px' },
            // => @media (min-width: 768px and max-width: 1023px) { ... }
            lg: { min: '1024px', max: '1279px' },
            // => @media (min-width: 1024px and max-width: 1279px) { ... }
            xl: { min: '1280px' },
            // => @media (min-width: 1280px) { ... }
        },
    },
    variants: {
        extend: {
            border: ['first', 'last'],
            margin: ['first', 'last'],
            padding: ['first', 'last'],
        },
    },
    plugins: [],
};
