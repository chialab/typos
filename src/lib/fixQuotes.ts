/**
 * Convert single and double quotes to apostrophes and quotation marks.
 * @param input The input HTML string.
 * @returns Fixed HTML string.
 */
export function fixQuotes(input: string) {
    const parser = new DOMParser();
    const document = parser.parseFromString(`<html><body>${input}</body></html>`, 'text/html');
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

    let node: Text | null = walker.nextNode() as Text;
    while (node) {
        const parentNode = node.parentElement || document.body;
        if (parentNode.closest('script, pre, code')) {
            node = walker.nextNode() as Text;
            continue;
        }

        let text = node.textContent || '';
        // convert open single quotes to apostrophes
        text = text.replace(/(\s|^)'(\w+)/gi, '$1\u2018$2');
        // convert close single quotes to apostrophes
        text = text.replace(/(\w+)'/gi, '$1\u2019');
        // convert open double quotes to quotation marks
        text = text.replace(/(\s|^)"(\w+)/gi, '$1\u201c$2');
        // convert close double quotes to quotation marks
        text = text.replace(/(\w+)"(\s|$)/gi, '$1\u201d$2');

        node.textContent = text;

        node = walker.nextNode() as Text;
    }

    return document.body.innerHTML;
}
