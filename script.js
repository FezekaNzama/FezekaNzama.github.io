//Nav Bar and Burger Menu
const burger = document.querySelector(".burger");
const navMenu = document.querySelector(".nav-menu");

burger.addEventListener("click",() =>{
  burger.classList.toggle("active");
  navMenu.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", ()=>{
  burger.classList.remove("active");
  navMenu.classList.remove("active");
}))


window.addEventListener("scroll", ()=>{
  const navBar = document.querySelector(".navbar");
  const scrollTop = document.documentElement.scrollTop;

  if(scrollTop >50){
    navBar.style.backgroundColor = '#D8C3A5';
    navMenu.style.backgroundColor = '#D8C3A5'

  }else{
    navBar.style.backgroundColor = '#E85A4F';
    navMenu.style.backgroundColor = '#E85A4F';
  }
})


//Text Scramble

class TextScramble {

  constructor(el) {
    this.el = el
    this.chars = '!<>-_\\/[]{}—=+*^?#________'
    this.update = this.update.bind(this)
  }

  setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }

  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}


//Application of TextScramble

const phrases = [
  ['SOFTWARE', 'DEVELOPER'],
  ['CLIMATE','ENTHUSIAST'],
  ['FICTION','WRITER'],
  ['DEVOTED','DAUGHTER'],
  ['MARATHON','RUNNER'],
  ['CURIOUS','MIND'],
  ['SOUTH','AFRICAN']
]

const firstSection = document.querySelector('.first-text')
const secondSection = document.querySelector('.second-text')
const first = new TextScramble(firstSection)
const second = new TextScramble(secondSection)

let counter = 0

const setFields = () =>{
 first.setText(phrases[counter][0])
 second.setText(phrases[counter][1]) 
}

const next = () => {
  first.setText(phrases[counter][0])
  second.setText(phrases[counter][1]) 
    .then(() => {
    setTimeout(next, 800)
  })
  counter = (counter + 1) % phrases.length
}

next()

