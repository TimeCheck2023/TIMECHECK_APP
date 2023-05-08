/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      // 'sm': { 'max': '339px' }
      'sm': { 'max': '639px' },
      'md': { 'min': '640px', 'max': '767px' },
      'lg': { 'min': '768px', 'max': '1023px' },
      'xl': { 'min': '1024px', 'max': '1279px' },
      '2xl': { 'min': '1280px' },
    },
    // Otras configuraciones de tema aquí
  },
  plugins: [],
}

// sm: Este tamaño de pantalla podría ser adecuado para teléfonos móviles con pantallas pequeñas.
// md: Este tamaño de pantalla podría ser adecuado para teléfonos móviles de tamaño medio o tabletas pequeñas.
// lg: Este tamaño de pantalla podría ser adecuado para tabletas más grandes o pantallas de escritorio con resoluciones más bajas.
// xl: Este tamaño de pantalla podría ser adecuado para pantallas de escritorio con resoluciones medianas.
// 2xl: Este tamaño de pantalla podría ser adecuado para pantallas de escritorio con resoluciones altas o dispositivos de alta gama como televisores inteligentes.
// Sin embargo, es importante tener en cuenta que la experiencia del usuario puede variar 