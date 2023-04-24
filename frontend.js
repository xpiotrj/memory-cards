function welcomeAnimation(){
    const left = document.getElementById('left')
    const right = document.getElementById('right')

    left.style.transform = "translate(0px, 0)"
    right.style.transform = "translate(0px, 0)"
    return right
}


function writeMenuHeader(sentance) {
    const header = document.getElementById('controllable-h2');
    let start = "";
    const interval = 70;
    const final_time = sentance.length * interval


    for(let i = 0; i < sentance.length; i++){
        setTimeout(()=> {
            start = start.concat(sentance.charAt(i));
            header.innerHTML = start
        }, interval * i)
        
    }

    setTimeout(() => {
        eraseMenuHeader()
    }, final_time + 2500)

}

let getRandomSentance = () => { 
    const index = Math.floor(Math.random() * (sentances.length - 0) + 0);

    return sentances[index];
}



function eraseMenuHeader() {
    const header = document.getElementById('controllable-h2');
    let start = "because ";
    const interval = 40;


    let lenght = header.innerHTML.length

    const full_time = lenght * interval

    for(let i = 0; i < lenght; i++){
        setTimeout(() => {
            header.innerHTML = header.innerHTML.substring(0,header.innerHTML.length-1);
        }, interval * i)
    }

    setTimeout(() => {
        writeMenuHeader(getRandomSentance());
    }, full_time + 300)



}

