<script src="https://cdn.tailwindcss.com"></script>
<script>
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: { sans: ['Montserrat', 'sans-serif'] },
            colors: {
                brand: {
                    black: '#05020a', dark: '#0a0414', deep: '#120726',
                    purple: '#280c4f', violet: '#6b21a8', magenta: '#d946ef',
                    electric: '#3b82f6', cyan: '#06b6d4',
                }
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'spin-slow': 'spin 20s linear infinite',
                'spin-reverse': 'spin-reverse 25s linear infinite',
                'float': 'float 6s ease-in-out infinite',
                'scanline': 'scanline 8s linear infinite',
            },
            keyframes: {
                'spin-reverse': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(-360deg)' },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-12px)' },
                },
                'scanline': {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(1000%)' },
                }
            }
        }
    }
}
</script>
