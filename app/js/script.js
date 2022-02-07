
const lettersPattern = /[a-z]/
let currentGuessCount = 1
let currentGuess = document.querySelector('#guess' + currentGuessCount)
let currentLetters = currentGuess.dataset.letters

let words = ['baker', 'store', 'horse', 'speak', 'clone', 'apple', 'truck', 'bread']
let solutionWord = ''

const chooseWord = () => {
	let randomNumber = Math.floor(Math.random() * (words.length -1)) + 1
	solutionWord = words[randomNumber]
}
chooseWord()
console.log('solution word = ' + solutionWord )


//detect key press (letter, backspace, other, enter)
document.addEventListener('keydown', (e) => {
	// console.log('keypress: ' + e.key)
	let keypress = e.key
	if (keypress.length == 1 && 
		lettersPattern.test(e.key) &&
		currentGuess.dataset.letters.length < 5
		){
		// console.log('is Letter')
		updateLetters(keypress)
	} 
	else if(e.key == 'Backspace' && currentGuess.dataset.letters != '') {
		deleteFromLetters()
	}
	else if(e.key == 'Enter' && currentGuess.dataset.letters.length == 5) {
		submitGuess()
		// console.log('currentGuess' + currentGuessCount)
	}

})
const submitGuess = () => {
	console.log('submit guess')
	for (let i = 0; i < 5; i++){
		setTimeout(() => {
			revealTile(i, checkLetter(i))
		}, i * 200)
		
	}
}

const checkIfGuessComplete = (i) => {
	if (i == 4) {
		checkWin()
		// console.log('game winner!')
	}
}

const jumpTiles = () => {
	//console.log('jumpTiles');
	//console.log(currentGuessCount);
	for (let i = 0; i < 5; i++) {
	  setTimeout(() => {
		let currentTile = document.querySelector(
		  '#guess' + currentGuessCount + 'Tile' + (i + 1)
		);
		currentTile.classList.add('jump');
	  }, i * 200);
	}
	let message = document.getElementById("message").style.visibility = "visible"
  }

const checkWin = () => {
	if(solutionWord == currentGuess.dataset.letters) {
		
		console.log('game winner!')
		setTimeout(() => {
			jumpTiles()
		  }, 500);
		 
	}
	else {
		currentGuessCount = currentGuessCount + 1
		currentGuess = document.querySelector('#guess' + currentGuessCount);
		if (currentGuessCount == 7) {
			setTimeout(() => {
				showSolution()
			}, 500)
		}
	}
	
}

const showSolution = () => {
	let message = document.getElementById("sorry").style.visibility = "visible"
	alert('The solution was: ' + solutionWord)
}

//update letters
const updateLetters = (letter) => {
	let oldLetters = currentGuess.dataset.letters
	let newLetters = oldLetters + letter
	let currentTile = newLetters.length
	currentGuess.dataset.letters = newLetters
// console.log('currentTile = ' + currentTile)
	
	updateTiles(currentTile, letter)

}
//update tile markup

const updateTiles = (tileNumber, letter) => {
// console.log('updatedTiles(' + tileNumber, letter + ')')
let currentTile = document.querySelector('#guess' + currentGuessCount + 'Tile' + tileNumber)
currentTile.innerText = letter
currentTile.classList.add('has-letter')
}

//delete last letter

const deleteFromLetters = () => {
	let oldLetters = currentGuess.dataset.letters
	let newLetters = oldLetters.slice(0, -1)
	currentGuess.dataset.letters = newLetters
	deleteFromTiles(oldLetters.length )
	
}

const deleteFromTiles = (tileNumber) => {
	let currentTile = document.querySelector('#guess' + currentGuessCount + 'Tile' + tileNumber)
	currentTile.innerText = ''
	currentTile.classList.remove('has-letter')
}

//check character for word
const checkLetter = (position) => {
	// console.log(position)
	let guessedLetter =  currentGuess.dataset.letters.charAt(position)
	let solutionLetter = solutionWord.charAt(position)
	// console.log(guessedLetter, solutionLetter)

	if(guessedLetter == solutionLetter) {

		return 'correct'
	}
	else {
	 return checkLetterExists(guessedLetter) ? 'present' : 'absent'

		
	}
}

const checkLetterExists = (letter) => {
	return solutionWord.includes(letter)
}

const revealTile = (i, state) => {
	let tileNum = i + 1
	let tile = document.querySelector('#guess' + currentGuessCount + 'Tile' + tileNum)
	
	// switch(state){
	// 	case 'correct':
	// 		tile.classList.add('correct')
	// 		break
	// 	case 'present':
	// 		tile.classList.add('present')
	// 		break
	// 	case 'absent':
	// 		tile.classList.add('absent')
	// }
	flipTile(tileNum, state)
	checkIfGuessComplete(i)
}

const flipTile = (tileNum, state) => {
	let tile = document.querySelector('#guess' + currentGuessCount + 'Tile' + tileNum)
	tile.classList.add('flip-in')
	setTimeout(() => {
		tile.classList.add(state)
	}, 200)
	setTimeout(() => {
		tile.classList.replace('flip-in', 'flip-out')
	}, 250)
	setTimeout(() => {
		tile.classList.remove('flip-out')
	}, 1500)
}