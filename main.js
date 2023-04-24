window.onload = () => {
    visualizeBoard()
    createBoard(2, 2)
    setTimeout(()=> {
        writeMenuHeader(getRandomSentance());
    }, 1300)
    
    welcomeAnimation()
}

let isCardShown = false;
let previousCard;
let canMakeMove = true;
let isFirstMove = true;
let matchesFound = 0;
let pairsOnBoard;
let playerMoves = 0;
let timer;
let time = 0;

function createArray(size){
    let used_indexes = []
    let array = []

    for(let i = 0; i < size / 2; i++){
        let index = 0;
        while(used_indexes.includes(index)){
            index = Math.floor(Math.random() * (size - 0) + 0);
        }
        used_indexes.push(index);
        array.push(index);
        array.push(index);
    }
    array.sort(() => {return Math.random() - 0.5});
    return array

}

function timerStart() {
    const timerDiv = document.getElementById("timer");
    time = 0;
    const interval = 10;

    timer = setInterval(() => {
        timerDiv.innerHTML = millisToMinutesAndSeconds(time);
        time += interval;
    }, interval)
}



function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}


function createBoard(columns, rows){
    const board = document.getElementById('board');
    const cards_count = rows * columns;
    pairsOnBoard = cards_count / 2;

    board.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

    board.innerHTML = '';

    let icons_indexes = createArray(cards_count);
    
    for(let i = 0; i < cards_count; i++){
        let value = all_icons[icons_indexes[i]];
        let card = document.createElement('div');
        card.addEventListener('click', () => {
            makeMove(card);
        })
        let inner_card = document.createElement('div');
        let card_front = document.createElement('div');
        card_front.classList.add('front-card')
        card_front.innerHTML = `<i class="fa-solid fa-question"></i>`;
        let card_back = document.createElement('div');
        card_back.classList.add('back-card')
        card_back.innerHTML = value['icon'];
        inner_card.appendChild(card_front);
        inner_card.appendChild(card_back);
        inner_card.classList.add('inner-card');
        card.setAttribute('data-value', value['value']);
        card.classList.add('card');
        card.appendChild(inner_card);


        board.appendChild(card);
    }
}

function makeMove(card){

    if(card.dataset.ignore){
        return false;
    }


    updateScore()

    if(isFirstMove){
        timerStart();
        isFirstMove = false;
    }

    if(canMakeMove == false){
        return false;
    }

    card.children[0].style.transform = 'rotateY(180deg)'

    if(isCardShown){

        if(card == previousCard){
            return false;
        }
        
        if(previousCard.dataset.ignore){
            return false;
        }
    
        canMakeMove = false;
        if(previousCard.dataset.value == card.dataset.value){
            matchesFound++;
            setTimeout(() => {
                setTimeout(() => {
                    previousCard.children[0].style.display = 'none'
                    card.children[0].style.display = 'none' 
                }, 300)              
                previousCard.style.transform = 'scale(0)'
                card.style.transform = 'scale(0)'       
                card.setAttribute('data-ignore', true);
                previousCard.setAttribute('data-ignore', true);
                canMakeMove = true;
            }, 1000)
        }
        else{
            setTimeout(() => {
                previousCard.children[0].style.transform = 'rotateY(0deg)'
                card.children[0].style.transform = 'rotateY(0deg)'
                canMakeMove = true;
            }, 1000)
            
        }
        playerMoves++;
    }
    else{
        previousCard = card;
    }
    updateScore()
    if(pairsOnBoard == matchesFound){
        clearInterval(timer)
        canMakeMove = false;
        setTimeout(() => {
            endGame();
        }, 1000)
    }

    isCardShown = !isCardShown;


}




function updateScore(){
    const score_counter = document.getElementById('stats');
    score_counter.innerHTML = matchesFound + '/' + pairsOnBoard + '. Moves made: ' + playerMoves;
}


// --------------------------- MAIN MENU ---------------------------------  

function visualizeBoard(){
    const cols = document.getElementById('columns-input').value
    const rows = document.getElementById('rows-input').value
    const board_visualizer = document.getElementById('board-visualization')
    const total_cards_counter = document.getElementById('total-cards-counter')
    const rows_counter = document.getElementById('rows-counter')
    const columns_counter = document.getElementById('columns-counter')

    total_cards_counter.innerHTML = (cols*rows) + " CARDS"

    rows_counter.innerHTML = rows;
    columns_counter.innerHTML = cols;

    
    board_visualizer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    board_visualizer.innerHTML = '';

    for(let i = 0; i < (cols*rows); i++){
        const tile = document.createElement('div')
        tile.classList.add('tile')
        tile.innerHTML = `<i class="fa-solid fa-question"></i>`;
        board_visualizer.appendChild(tile)
    }

}

function startGame(){
    
    isCardShown = false;
    
    canMakeMove = true;
    isFirstMove = true;
    matchesFound = 0;
    playerMoves = 0;
    time = 0;

    const cols = document.getElementById('columns-input').value
    const rows = document.getElementById('rows-input').value
    const timer_span = document.getElementById('timer')
    timer_span.innerHTML = millisToMinutesAndSeconds(time)

    const menu = document.getElementById('menu')
    menu.style.display = 'none'

    const main = document.getElementById('main')
    main.style.display = 'block'

    const end_game_screen = document.getElementById("end-game-screen")
    end_game_screen.style.display = 'none'

    createBoard(cols, rows)
    updateScore()
}


// ----------------------------------------- end game -------------------

function endGame(){
    const end_game_screen = document.getElementById("end-game-screen")

    const game_time_span = document.getElementById('game-time-span')
    const move_data_span = document.getElementById('move-data-span')

    end_game_screen.style.display = 'block'

    const aquracy = Math.round(matchesFound / playerMoves * 100)

    game_time_span.innerHTML = `Yout time is: ${millisToMinutesAndSeconds(time)}`

    move_data_span.innerHTML = `You made ${playerMoves} moves, with aquracy of ${aquracy}%`
}

function backToMenu(){
    const end_game_screen = document.getElementById("end-game-screen")
    const menu = document.getElementById('menu')
    const main = document.getElementById('main')

    end_game_screen.style.display = 'none'

    main.style.display = 'none'

    menu.style.display = 'block'

}