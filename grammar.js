/**
 * @file Tree-sitter grammar for jj templates
 * @author Bryce Berger <bryce.z.berger@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "jjtemplate",

  rules: {
    source_file: ($) =>
      choice(
        seq("'''", $.template, "'''"),
        seq('"""', $.template, '"""'),
        seq("'", $.template, "'"),
        seq('"', $.template, '"'),
      ),

    template: ($) =>
      prec.right(seq($.expression, repeat(seq("++", $.expression)))),

    expression: ($) =>
      prec.right(
        seq(
          repeat($.prefix_ops),
          $.term,
          repeat(seq($.infix_ops, repeat($.prefix_ops), $.term)),
        ),
      ),

    term: ($) => prec.right(seq($._primary, repeat(seq(".", $.function)))),
    _primary: ($) =>
      choice(
        seq("(", $.template, ")"),
        $.function,
        $.lambda,
        $.identifier,
        $.string_literal,
        $.raw_string_literal,
        $.integer_literal,
      ),

    function: ($) =>
      seq($.identifier, "(", optional($.function_arguments), ")"),
    lambda: ($) => seq("|", optional($.formal_parameters), "|", $.template),
    formal_parameters: ($) =>
      seq($.identifier, repeat(seq(",", $.identifier)), optional(",")),
    function_arguments: ($) =>
      seq($._argument, repeat(seq(",", $._argument)), optional(",")),
    _argument: ($) => choice($.keyword_argument, $.template),
    keyword_argument: ($) => seq($.identifier, "=", $.template),

    infix_ops: (_) =>
      choice(
        "||",
        "&&",
        "==",
        "!=",
        ">=",
        ">",
        "<=",
        "<",
        "+",
        "-",
        "*",
        "/",
        "%",
      ),
    prefix_ops: (_) => choice("!", "-"),

    identifier: (_) => /[a-zA-Z_][a-zA-Z0-9_]*/,

    integer_literal: (_) => choice(/[1-9][0-9]*/, "0"),

    raw_string_literal: (_) => /'[^']*'/,

    string_literal: (_) => /"([^"\\]*(\\.[^"\\]*)*)"/,
    // string_literal: ($) =>
    //   seq('"', repeat(choice($._string_content, $._string_escape)), '"'),
    // _string_content: (_) => token(prec(-1, /[^$\\\[\]"]+/)),
    // _string_escape: (_) => /\\./,
  },
});
