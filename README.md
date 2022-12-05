<p align="center">
  <strong>Typos</strong> • Typing utilities for WYSIWYG editors.
</p>

<p align="center">
    <a href="https://www.npmjs.com/package/@chialab/typos"><img alt="NPM" src="https://img.shields.io/npm/v/@chialab/typos.svg"></a>
</p>

---

## Get the library

### NPM

Install via NPM or Yarn:

```
npm i @chialab/typos
```

```
yarn add @chialab/typos
```

### CDN

```js
import { fixQuotes } from 'https://unpkg.com/@chialab/typos?module';
```

## Usage

### TinyMCE

Use **Typos** as plugin for TinyMCE:

```ts
import tinymce from 'tinymce/tinymce';
import { tinymcePlugin } from '@chialab/typos';

tinymcePlugin(tinymce);

tinymce.init({
  selector: 'textarea',
  plugins: 'typos',
  toolbar: 'fixQuotes',
});
```

---

## Development

### Requirements

### Build

Install the dependencies and run the `build` script:

```
yarn
yarn build
```

This will generate the ESM and CJS bundles in the `dist` folder and declaration files in the `types` folder.

---

## License

**Typos** is released under the [MIT](https://github.com/chialab/typos/blob/main/LICENSE) license.
