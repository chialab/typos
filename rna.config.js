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
                output: 'dist/index.js',
                format: 'esm',
            },
        ],
        sourcemap: true,
        minify: true,
    };
}
