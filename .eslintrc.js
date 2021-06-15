module.exports = {
    env: {
        browser: true,
        es2020: true,
        node: true,
    },
    extends: 'eslint:recommended',
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module',
    },
    rules: {
        'indent': [
            'error',
            4,
            {
                'SwitchCase': 1
            }
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'keyword-spacing': [
            2,
            {
                'before': true,
                'after': true
            }
        ],
        'react/jsx-uses-vars': 2,
        'no-debugger': 2,
        'no-const-assign': 2,
        'no-cond-assign': 2,
        'no-console': 0,
        'no-empty': 0,
        'no-redeclare': 0,
        'no-case-declarations': 0,
        'no-ex-assign': 0,
        'arrow-spacing': 'error',
        'semi-spacing': [
            2,
            {
                'before': false,
                'after': true
            }
        ],
        'comma-spacing': [
            'error',
            {
                'before': false,
                'after': true
            }
        ],
        'object-curly-spacing': [
            'error',
            'always'
        ],
        'no-multi-spaces': 'error',
        'brace-style': 'error',
        'space-infix-ops': 'error'
    },
};
