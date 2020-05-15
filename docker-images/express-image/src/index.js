let Chance = require('chance')
let chance = new Chance()

let express = require('express')
let app = new express()

app.get('/', function(req,res) {
    res.send(generatePoem())
})

app.listen(3000, function() {
    console.log('Accepting HTTP requests on port 3000')
})

function generatePoem() {
    // code dégueulasse on peut clairement faire mieux
    // à approfondir mais ça marche 
    console.log('je suis ici')
    let title = chance.word()
    let poem = title + '<br>' + '<br>'
    let firstEnd = chance.syllable()
    let secondEnd = chance.syllable()
    while (firstEnd === secondEnd){
        secondEnd = chance.syllable()
    }
    console.log({firstEnd, secondEnd})
    console.log('  poeme en dessous de cette ligne ' + '\n')
    for (let i = 0; i < 2; i++ ){
        let sentence1 = chance.word() + ' '
        let sentence2 = chance.word() + ' '
        for(let i=0; i< 3; i++){
            sentence1 += chance.word() + ' '
            sentence2 += chance.word() + ' '
        }
        sentence1 += chance.word() 
        sentence2 += chance.word() 

        poem += sentence1 + firstEnd + '<br>' + sentence2 + secondEnd + '<br>' 
    }
    poem +=  '<br>' 
    for (let i = 0; i < 2; i++ ){
        let sentence1 = chance.word() + ' '
        let sentence2 = chance.word() + ' '
        for(let i=0; i< 3; i++){
            sentence1 += chance.word() + ' '
            sentence2 += chance.word() + ' '
        }
        sentence1 += chance.word() 
        sentence2 += chance.word() 

        poem += sentence1 + firstEnd + '<br>' + sentence2 + secondEnd + '<br>' 
    }
    poem += '<br><br>'
    return  {poem}
    
}