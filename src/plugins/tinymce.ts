import type TinyMCE from 'tinymce/tinymce';
import type { Editor } from 'tinymce/tinymce';
import { fixQuotes } from '../lib/fixQuotes';

export interface TinyTypoPluginOptions {
    fixQuotes?: boolean;
}

export function tinymcePlugin(tinymce: typeof TinyMCE, options: TinyTypoPluginOptions = {}) {
    const { fixQuotes: shouldFixQuotes = true } = options;

    /**
     * Exec a typo fix.
     * @param editor The tinymce editor instance.
     * @param fix The fix to apply.
     */
    const runFix = (editor: Editor, fix: (input: string) => string) => {
        const original = editor.getContent({
            format: 'raw',
            no_events: true,
        });

        const fixed = fix(original);

        if (original !== fixed) {
            // update the element content
            editor.execCommand('mceSetContent', false, fixed);
        }
    };

    /**
     * Typo plugin for tinymce.
     * @param editor The tinymce editor instance.
     */
    const typoPlugin = function(editor: Editor) {
        if (shouldFixQuotes) {
            editor.addCommand('mceFixQuotes', () => runFix(editor, fixQuotes));

            editor.on('input', (event) => {
                if (event.data !== '\'' && event.data !== '"') {
                    return;
                }

                const editorRange = editor.selection.getRng();
                const node = editorRange.commonAncestorContainer;
                const prevContent = (() => {
                    try {
                        const range = editor.dom.createRng();
                        range.selectNodeContents(node);
                        range.setStart(node, editorRange.endOffset - 2);
                        range.setEnd(node, editorRange.endOffset - 1);
                        editor.selection.setRng(range);
                        return editor.selection.getContent().trim();
                    } catch (err) {
                        return '';
                    }
                })();
                const nextContent = (() => {
                    try {
                        const range = editor.dom.createRng();
                        range.selectNodeContents(node);
                        range.setStart(node, editorRange.endOffset);
                        range.setEnd(node, editorRange.endOffset + 1);
                        editor.selection.setRng(range);
                        return editor.selection.getContent().trim();
                    } catch (err) {
                        return '';
                    }
                })();

                const range = editor.dom.createRng();
                range.selectNodeContents(node);
                range.setStart(node, editorRange.endOffset - 1);
                range.setEnd(node, editorRange.endOffset);
                editor.selection.setRng(range);

                if (event.data === '\'') {
                    editor.insertContent((nextContent || !prevContent) ? '\u2018' : '\u2019');
                } else {
                    editor.insertContent((nextContent || !prevContent) ? '\u201c' : '\u201d');
                }
            });

            editor.ui.registry.addIcon('fix-quotes', '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M6.32,13.41H7.2c0.38,0,0.73-0.21,0.89-0.55l1.72-3.45v-5c0-0.55-0.45-1-1-1h-4c-0.55,0-1,0.45-1,1v4c0,0.55,0.45,1,1,1h2l-1.33,2.66c-0.23,0.46-0.04,1.01,0.41,1.24C6.04,13.37,6.18,13.41,6.32,13.41z M14.32,13.41h0.88c0.38,0,0.73-0.21,0.89-0.55l1.72-3.45v-5c0-0.55-0.45-1-1-1h-4c-0.55,0-1,0.45-1,1v4c0,0.55,0.45,1,1,1h2l-1.33,2.66c-0.23,0.46-0.04,1.01,0.41,1.24C14.04,13.37,14.18,13.41,14.32,13.41z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M19.18,12.59l1,1l-6.5,7l-3.5-4.5L11.46,15l2.22,2.31L19.18,12.59z"/></svg>');

            // Register button and add command function
            editor.ui.registry.addButton('fixQuotes', {
                tooltip: 'Convert quotes to curly quotes',
                icon: 'fix-quotes',
                onAction: () => runFix(editor, fixQuotes),
            });
        }
    };
    tinymce.util.Tools.resolve('tinymce.PluginManager').add('typos', typoPlugin);
}
