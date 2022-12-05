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
    const typoPlugin = (editor: Editor) => {
        if (shouldFixQuotes) {
            editor.addCommand('mceFixQuotes', () => runFix(editor, fixQuotes));

            // Register button and add command function
            editor.ui.registry.addButton('fixQuotes', {
                tooltip: 'Convert quotes to curly quotes',
                icon: 'spell-check',
                onAction: () => runFix(editor, fixQuotes),
            });
        }
    };

    tinymce.util.Tools.resolve('tinymce.PluginManager').add('typo', typoPlugin);
}
