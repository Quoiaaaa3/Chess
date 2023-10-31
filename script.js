const piecesRef = document.querySelectorAll("#piece")
const demonstrationRef = document.querySelector('.demonstration')
const chessboardRef = demonstrationRef.querySelector(".demonstration__chessboard")
const chessboardCenterRef = chessboardRef.querySelector("#C3")
const positionRef = localStorage.getItem('piecePosition')

piecesRef.forEach((piece) => {
    piece.addEventListener('click', () => {
        window.scrollBy({
            top: 7200,
            behavior: 'smooth'
        })
        createPiece(piece.className, chessboardCenterRef)
        localStorage.setItem('piece', piece.className) 
    })
})



function createPiece(piece, place) {
    if (chessboardRef.contains(chessboardRef.querySelector('#figure'))){
        chessboardRef.querySelector('#figure').parentElement.removeChild(chessboardRef.querySelector('#figure'))
    }
    demonstrationRef.querySelector('.demonstration__piece').innerHTML = `This is ${piece}`
    const moveInfoRef = demonstrationRef.querySelector('.demonstration__piece-moves')

    if (piece == 'pawn') {
        moveInfoRef.innerHTML = 'the Pawn moves one square straight ahead and two if it`s first move'
    }

    if (piece == 'knight') {
        moveInfoRef.innerHTML = 'Knights can move only in an L-shape'
    }

    if (piece == 'bishop') {
        moveInfoRef.innerHTML = 'Bishops can move any number of squares diagonally'
    }

    if (piece == 'rook') {
        moveInfoRef.innerHTML = 'Rooks can move any number of squares, up and down and side to side'
    }

    if (piece == 'queen') {
        moveInfoRef.innerHTML = 'Queens can move any number of squares along ranks, files and diagonals'
    }

    if (piece == 'king') {
        moveInfoRef.innerHTML = 'Kings can move one square at a time in any direction'
    }
    
    var img = document.createElement('img')
    img.setAttribute('id', 'figure')
    img.setAttribute('class', `demonstration__chessboard-${piece}`)
    img.setAttribute('src', `pieces/${piece}.png`)
    img.setAttribute('draggable', 'true')
    img.setAttribute('ondragstart', 'onDragStart(event)')
    img.style.cursor = 'pointer'
    place.appendChild(img)
}


function onDragStart(event) {
    event
      .dataTransfer
      .setData('text/plain', event.target.id)
}

function onDragOver(event) {
    event.preventDefault();
}

function onDrop(event) {
    const data = event.dataTransfer.getData('text')
    const draggableElement = document.getElementById(data)
    const dragStartId = draggableElement.parentElement.id
    const dropzone = event.target
    if(draggableElement.className == 'demonstration__chessboard-pawn'){
        if((dropzone.id[0].charCodeAt(0) == dragStartId[0].charCodeAt(0) - 1 || dropzone.id[0].charCodeAt(0) == dragStartId[0].charCodeAt(0) - 2) && dropzone.id[1] == dragStartId[1]){
            drop(event, dropzone, draggableElement)
            return
        } 
    }

    if(draggableElement.className == 'demonstration__chessboard-knight') {
        if(((dragStartId[0].charCodeAt(0) - 1 == dropzone.id[0].charCodeAt(0) || dragStartId[0].charCodeAt(0) + 1 == dropzone.id[0].charCodeAt(0)) && ((parseInt(dragStartId[1]) - 2 == dropzone.id[1]) || (parseInt(dragStartId[1]) + 2 == dropzone.id[1]))) || ((dragStartId[0].charCodeAt(0) - 2 == dropzone.id[0].charCodeAt(0) || dragStartId[0].charCodeAt(0) + 2 == dropzone.id[0].charCodeAt(0)) && ((parseInt(dragStartId[1]) - 1 == dropzone.id[1]) || (parseInt(dragStartId[1]) + 1 == dropzone.id[1])))){
            drop(event, dropzone, draggableElement)
            return
        }
    }

    if(draggableElement.className == 'demonstration__chessboard-bishop') {
        if(Math.abs(dragStartId[0].charCodeAt(0) - dropzone.id[0].charCodeAt(0)) == Math.abs(parseInt(dragStartId[1]) - parseInt(dropzone.id[1]))){
            drop(event, dropzone, draggableElement)
            return
        }
    }

    if(draggableElement.className == 'demonstration__chessboard-rook') {
        if(dragStartId[0].charCodeAt(0) == dropzone.id[0].charCodeAt(0) || dragStartId[1] == dropzone.id[1]){
            drop(event, dropzone, draggableElement)
            return
        }
    }

    if(draggableElement.className == 'demonstration__chessboard-queen') {
        if((Math.abs(dragStartId[0].charCodeAt(0) - dropzone.id[0].charCodeAt(0)) == Math.abs(dragStartId[1] - dropzone.id[1])) || (dragStartId[0].charCodeAt(0) == dropzone.id[0].charCodeAt(0)) || (dragStartId[1] == dropzone.id[1])){
            drop(event, dropzone, draggableElement)
            return
        }
    }

    if(draggableElement.className == 'demonstration__chessboard-king') {
        if((dragStartId[0].charCodeAt(0) - dropzone.id[0].charCodeAt(0) == 1 || dragStartId[0].charCodeAt(0) - dropzone.id[0].charCodeAt(0) == -1 || dragStartId[0].charCodeAt(0) - dropzone.id[0].charCodeAt(0) == 0) && (parseInt(dragStartId[1]) - parseInt(dropzone.id[1]) == 1 || parseInt(dragStartId[1]) - parseInt(dropzone.id[1]) == -1 || parseInt(dragStartId[1]) - parseInt(dropzone.id[1]) == 0)){
            drop(event, dropzone, draggableElement)
            return
        }
    }

    else{
        const cell = draggableElement.parentElement

        cell.classList.add('wrong')

        setTimeout(() => {
            cell.classList.remove('wrong')
        }, 500)
    }
}

function drop(event, dropzone, draggableElement){
    dropzone.appendChild(draggableElement)
    const data = event.dataTransfer.getData('text')
    const cell = document.getElementById(data).parentElement
    localStorage.setItem('piecePosition', cell.id)

        event
            .dataTransfer
            .clearData()

        cell
         .classList
         .add('correct')

        setTimeout(() => {
            cell.classList.remove('correct')
        }, 500)
}

const backButtonRef = document.querySelector('.back')
backButtonRef.addEventListener('click', () => {
    window.scrollBy({
        top: -7200,
        behavior: 'smooth'
    })
})

const reloadButtonRef = document.querySelector('.reload')
reloadButtonRef.addEventListener('click', () => {
    createPiece(localStorage.getItem('piece'), chessboardCenterRef)
})

if (positionRef) {
    const position = document.getElementById(positionRef)
    createPiece(localStorage.getItem('piece'), position)
}
