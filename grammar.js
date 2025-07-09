/**
 * @file Tree-sitter grammar for jj templates
 * @author Bryce Berger <bryce.z.berger@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "jj",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
