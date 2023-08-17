interface OneFont {
    font: string,
    color: string,
    anchor: {x: number, y: number},
    textAlign: string
}

let myFonts: OneFont[] = [];

// Font 0 (Title in menu)
myFonts.push({
    font: '72px Arial',
    color: 'white',
    anchor: {x: 0.5, y: 0.5},
    textAlign: 'center'
});

// Font 1 (elements in menu)
myFonts.push({
    font: '48px Arial',
    color: 'yellow',
    anchor: {x: 0.5, y: 0.5},
    textAlign: 'center'
});

// Font 2 (status bar font)
myFonts.push({
    font: '24px Arial',
    color: 'white',
    anchor: {x: 0, y: 0},
    textAlign: 'left'
})

export default myFonts;
