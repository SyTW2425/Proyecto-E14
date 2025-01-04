export default {
  preset: 'ts-jest/presets/default-esm', // Usa el preset correcto para ESM y TypeScript
  testEnvironment: 'node', // Entorno de prueba
  extensionsToTreatAsEsm: ['.ts'], // Trata archivos .ts como módulos ESM
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: true }], // Usa ts-jest con ESM
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // Mapea extensiones .js para TypeScript
  },
  collectCoverage: true, // Habilita la recopilación de cobertura
  coverageDirectory: 'coverage', // Directorio donde se generará el reporte de cobertura
  coverageReporters: ['text', 'lcov'], // Formatos de reporte de cobertura
  collectCoverageFrom: [
    'src/**/*.ts', // Incluye todos los archivos TypeScript en el directorio src
    '!src/index.ts', // Excluye archivos no relevantes, como el punto de entrada
  ],
  testTimeout: 80000, // Tiempo máximo de espera para pruebas
};
