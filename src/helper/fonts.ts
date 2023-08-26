interface OneFont {
    font: string,
    color: string,
    anchor: {x: number, y: number},
    textAlign: string
}

let myFonts: OneFont[] = [];

// Font 0 (Title in menu)
myFonts.push({
    font: '72px Copperplate Gothic',
    color: 'white',
    anchor: {x: 0.5, y: 0.5},
    textAlign: 'center'
});

// Font 1 (elements in menu)
myFonts.push({
    font: '48px Copperplate Gothic',
    color: 'yellow',
    anchor: {x: 0.5, y: 0.5},
    textAlign: 'center'
});

// Font 2 (status bar and progress bar, places name)
myFonts.push({
    font: '24px Copperplate Gothic',
    color: 'white',
    anchor: {x: 0, y: 0},
    textAlign: 'left'
});

// Font 3 (place picture, normal, , picture of workers)
myFonts.push({
    font: '80px Arial',
    color: 'white',
    anchor: {x: 0.5, y: 0.5},
    textAlign: 'center'
});

// Font 4 (place picture, cathedral)
myFonts.push({
    font: '180px Arial',
    color: 'white',
    anchor: {x: 0.5, y: 0.5},
    textAlign: 'center'
});

// Font 5 (text in yearbook)
myFonts.push({
    font: '20px Copperplate Gothic',
    color: 'black',
    anchor: {x: 0, y: 0},
    textAlign: 'left'
});

// Font 6 (Inside place title)
myFonts.push({
    font: '48px Copperplate Gothic',
    color: 'Black',
    anchor: {x: 0.5, y: 0},
    textAlign: 'center'
});

// Font 7 (Inside place subtitle (year and chronicles), name in worker tile)
myFonts.push({
    font: '32px Copperplate Gothic',
    color: 'Black',
    anchor: {x: 0.5, y: 0},
    textAlign: 'center'
});

export default myFonts;
