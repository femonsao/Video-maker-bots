const reeadLine = require('readline-sync')

function start(){
  const content = {}

  content.searchTerm = askAndReturnSerachTerm()
  content.prefix = aksAndReturnPrefix()

  function askAndReturnSerachTerm(){
    return reeadLine.question('Type a Wikipedia search term: ')
  }
  function aksAndReturnPrefix(){
    const prefixes = ["Who is", "What is", "The history of"]     
    const selectPrefixIndex  = reeadLine.keyInSelect(prefixes, 'Choes an option: ')
    const selectedPrefixText = prefixes[selectPrefixIndex]

    return selectedPrefixText
  }

  console.log(content)
}


start()