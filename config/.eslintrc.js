module.exports = {
	"parserOptions": {
		"ecmaVersion": 6,
		"sourceType": "module"
	},
    "env": {
		"browser": true
    },
	"globals": {
		"angular": 1,
		"firebase" :1
	},
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
			4,
			{"SwitchCase": 1} 
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],

		"block-scoped-var": "error",
		"curly": "error",
		"default-case": "error",
		"dot-location": ["error", "property"],
		"dot-notation": "error",
		"eqeqeq": ["error", "smart"],
		"guard-for-in" :"error",
		"no-eval": "error",
		"no-implicit-coercion": "error",
		"no-implicit-globals": "error",
		"no-implied-eval": "error",
		"no-invalid-this": "error",
		"no-lone-blocks": "error",
		"no-loop-func": "error",
		"no-new-wrappers": "error",
		"no-new": "error",
		"no-param-reassign": "error",
		"no-sequences": "error",
		"no-unmodified-loop-condition": "error",
		"no-unused-expressions": "error",
		"no-useless-concat": "error",
		"no-useless-return": "error",
		"vars-on-top": "error",
		"strict": ["error", "function"],

		"init-declarations": ["error", "always"],
		"no-use-before-define": ["error", "nofunc"],



    },
};
