interface LineProperties {
    x: number,
    y: number,
    length: number,
    horizontal: boolean,
    width: number,
    color: string
}

interface WorkerProperties {
    name: string,
    age: number,
    reputation: string[]
}

interface YearbookEntry {
    year: number,
    workerBalance: workerEntry[],
    overallBalance: number[]
    events: string[]
}

interface WorkerBalance {
    name: string,
    balance: number[]
}