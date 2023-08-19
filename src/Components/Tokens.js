// FashionAssistant.js

const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const pos = require('pos');

function extractFashionKeywords(api_response_content) {
    // Tokenize the text
    const tokens = tokenizer.tokenize(api_response_content);

    // Part of speech tagging
    const words = new pos.Lexer().lex(api_response_content);
    const tagger = new pos.Tagger();
    const taggedWords = tagger.tag(words);

    // Extract fashion-related keywords (nouns and adjectives)
    const fashion_keywords = taggedWords.filter(([word, tag]) => tag.startsWith('NN') || tag.startsWith('JJ'))
                                         .map(([word, _]) => word);

    return fashion_keywords;
}

module.exports = {
    extractFashionKeywords: extractFashionKeywords
};
