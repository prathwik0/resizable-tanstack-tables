import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.js' : '.mjs',
    };
  },
  treeshake: true,
  external: ['react', '@tanstack/react-table'],
  target: 'es2018',
  minify: false,
  keepNames: true,
  jsxFactory: 'React.createElement',
  jsxFragment: 'React.Fragment',
  esbuildOptions(options) {
    // Preserve JSDoc comments in the output
    options.keepNames = true;
    options.minify = false;
    options.treeShaking = true;
    options.legalComments = 'inline';
  },
}); 