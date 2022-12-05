/**
 * @returns RNA configuration.
 */
export default async function() {
    /**
     * @type {import('@chialab/rna-config-loader').Config}
     */
    return {
        entrypoints: [
            {
                input: 'src/index.ts',
                output: 'dist/esm/typos.js',
                format: 'esm',
            },
            {
                input: 'src/index.ts',
                output: 'dist/iife/typos.js',
                format: 'iife',
                target: 'es2016',
                globalName: 'Typos',
            },
        ],
        sourcemap: true,
        minify: true,
        clean: true,
    };
}
