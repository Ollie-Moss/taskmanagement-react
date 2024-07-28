/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            maxWidth: {
                '1/2': '50%'
            },
            keyframes: {
                dropdown: {
                    "0%": {
                        transform: "translateY(-25%)",
                        opacity: "0"
                        
                    },
                    "100%": {
                        transform: "translateY(0)",
                        opacity: "1"
                    }
                },
                slidedown: {
                    "0%": {
                        "grid-template-rows": "0fr",
                        opacity: "0"
                        
                    },
                    "100%": {
                        "grid-template-rows": "1fr",
                        opacity: "1"
                    }
                },
                slideup: {
                    "0%": {
                        "grid-template-rows": "1fr",
                        opacity: "1"
                    },
                    "100%": {
                        "grid-template-rows": "0fr",
                        opacity: "0",
                        display: "none"
                    }
                }
            },
            animation: {
                "dropdown": "dropdown 0.25s ease-in-out",
                "slidedown": "slidedown 0.25s ease-in-out",
                "slideup": "slideup 0.25s ease-in-out forwards"
            },
            colors: {
                primary: {
                    "50":"#eef2ff",
                    "100":"#e0e7ff",
                    "200":"#c7d2fe",
                    "300":"#a5b4fc",
                    "400":"#818cf8",
                    "500":"#6366f1",
                    "600":"#4f46e5",
                    "700":"#4338ca",
                    "800":"#3730a3",
                    "900":"#312e81",
                    "950":"#1e1b4b"},
                "inverted": "#9b990e"
            }
        },
        fontFamily: {
            'body': [
                'Inter', 
                'ui-sans-serif', 
                'system-ui', 
                '-apple-system', 
                'system-ui', 
                'Segoe UI', 
                'Roboto', 
                'Helvetica Neue', 
                'Arial', 
                'Noto Sans', 
                'sans-serif', 
                'Apple Color Emoji', 
                'Segoe UI Emoji', 
                'Segoe UI Symbol',
                'Noto Color Emoji'
            ],
            'sans': [
                'Inter', 
                'ui-sans-serif', 
                'system-ui', 
                '-apple-system', 
                'system-ui', 
                'Segoe UI', 
                'Roboto', 
                'Helvetica Neue', 
                'Arial', 
                'Noto Sans', 
                'sans-serif', 
                'Apple Color Emoji', 
                'Segoe UI Emoji', 
                'Segoe UI Symbol', 
                'Noto Color Emoji'
            ]
        }
    }
}
