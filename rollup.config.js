import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default function (args) {
    const plugins = [
        resolve(),
        typescript(),
        terser({
            compress: {}
        })
    ];
    return {
        input: 'src/index.ts',
        output: {
          file: "docs/index.js",
          format: 'iife',
          sourcemap: true,
          sourcemapExcludeSources: true,
        },
        plugins: plugins,
      }
}