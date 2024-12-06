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
};
