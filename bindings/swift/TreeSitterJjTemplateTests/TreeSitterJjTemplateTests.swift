import XCTest
import SwiftTreeSitter
import TreeSitterJjTemplate

final class TreeSitterJjTemplateTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_jjtemplate())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Jjtemplate grammar")
    }
}
