/**
 * Convert single and double quotes to apostrophes and quotation marks.
 * @param input The input HTML string.
 * @returns Fixed HTML string.
 */
export function fixQuotes(input: string) {
    // open singles
    input = input.replace(/(^')|((([\s{[(>]')|([\s>]"'))(?!([^<])*?>)(?!<(script|pre|code)[^>]*?>)(?![^<]*?<\/(script|pre|code)>|$))/gi,
        ($1$2) => $1$2.replace(/'/g, '\u2018')
    );

    // closing singles + apostrophes
    input = input.replace(/'(?!([^<])*?>)(?!<(script|pre|code)[^>]*?>)(?![^<]*?<\/(script|pre|code)>|$)/gi, '\u2019');

    // open doubles
    input = input.replace(/(^")|((([\s{[(>]")|([\s>]'"))(?!([^<])*?>)(?!<(script|pre|code)[^>]*?>)(?![^<]*?<\/(script|pre|code)>|$))/gi,
        ($1$2) => $1$2.replace('"', '\u201c')
    );

    // closing doubles
    input = input.replace(/"(?!([^<])*?>)(?!<(script|pre|code)[^>]*?>)(?![^<]*?<\/(script|pre|code)>|$)/g, '\u201d');

    return input;
}
