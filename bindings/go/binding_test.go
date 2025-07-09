package tree_sitter_jjtemplate_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_jjtemplate "github.com/bryceberger/tree-sitter-jjtemplate/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_jjtemplate.Language())
	if language == nil {
		t.Errorf("Error loading Jjtemplate grammar")
	}
}
