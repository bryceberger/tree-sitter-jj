package tree_sitter_jj_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_jj "github.com/bryceberger/tree-sitter-jj/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_jj.Language())
	if language == nil {
		t.Errorf("Error loading Jj grammar")
	}
}
