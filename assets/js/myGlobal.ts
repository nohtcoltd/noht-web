
declare const global

const myGlobal: any = (typeof window == 'undefined')? global : window

export default myGlobal