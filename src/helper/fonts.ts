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

export default myFonts;
