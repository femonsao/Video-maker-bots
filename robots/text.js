const algorithmia = require('algorithmia')
const algorithmiaApiKey = require('../credentials/algorithmia.json').apiKey
const sentenceBoundaryDetection = require('sbd')

async function robot(content) {
  await fetchContentFromWikipedia(content)
  sanitizeContent(content)
  breakContentIntoSentences(content)

  async function fetchContentFromWikipedia(content) {
    const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey)
    const wikipediaAlgorithm = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2')
    const wikipediaResponde = await wikipediaAlgorithm.pipe(content.searchTerm)
    const wikipediaContent = wikipediaResponde.get()
    

    content.sourceContentOriginal = wikipediaContent.content
  }

  function  sanitizeContent(content){
    const withoutBlankLinesAndMarkdown = removeBlanckLinesAndMarkdown(content.sourceContentOriginal);
    const withoutDatesInParentheses = removeDatesInParentheses(withoutBlankLinesAndMarkdown);

    content.sourceContentSanetized= withoutDatesInParentheses;


    function removeBlanckLinesAndMarkdown(text){
      const allLines = text.split('\n');

      const withoutBlankLinesAndMarkdown = allLines.filter((line) => {
        if(line.trim().length === 0 || line.trim().startsWith('=')){
          return false
        }
          return true
      })
      return withoutBlankLinesAndMarkdown.join(' ')
    }
    function removeDatesInParentheses(lines){
      return lines.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ')
    }
  }
  function breakContentIntoSentences(content){
    content.sentences = []

    const sentences = sentenceBoundaryDetection.sentences(content.sourceContentSanetized);
    sentences.forEach((sentence) =>{
      content.sentences.push({
        text: sentence,
        keywords: [],
        images: []
      })
      console.log(content.sentences)
    })    

  }

 
}

module.exports = robot