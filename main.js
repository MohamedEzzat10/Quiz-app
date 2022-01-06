let questionTitleEle = document.querySelector(".question-title");
var answersEle = document.querySelector(".answers ")
let numberofquestionEle = document.querySelector(".numberofquestion");
let btnNext = document.querySelector(".next")
let  btnShowResult =document.querySelector(".show-result")
let numberQuestion = 1;
let questionCount = 0 ;
let result  = 0;
let answersChecked=[]
let correctanswers =[]
let startQuiz = document.querySelector(".start")
let infoName = document.querySelector(".persone-name")
let popUPStart = document.querySelector(".informations")
let popUpResult = document.querySelector(".pop-result")
let inputName = document.querySelector(".name")
let stroge ="";


  var answersSpan = document.querySelectorAll(".answers span ")

 
// satrt Quiz
inputName.focus();
startQuiz.addEventListener("click",()=>{
if(inputName.value == ""){
  alert("Please Enter your Name")
}else{
  infoName.innerHTML = inputName.value;
  popUPStart.style.display = "none"
}
})
inputName.addEventListener("keyup",(e)=>{
  if(e.keyCode == 13 &&inputName.value == ""){
    alert("Please Enter your Name")
  }else if(e.keyCode == 13){
    infoName.innerHTML = inputName.value;
    popUPStart.style.display = "none"
  }
})


  btnNext.addEventListener("click",()=>{
    if(stroge =="" ){
      alert("please chose any answer")
    } else{
    if(questionCount <= 19){
      storageAnswer()
      getQuizFromApi()
       
      questionCount ++
      countQuestion()
    }    
      if(questionCount == 19){
       btnNext.style.display="none"
       btnShowResult.style.display ="block"
      
  

  }
  
    
  }}) 
  // show Result
  btnShowResult.addEventListener("click",()=>{
    if(stroge =="" ){
      alert("please chose any answer")
    } else{
      storageAnswer()
      countQuestion()

      showResult()
    }
  })





// get data from api
getQuizFromApi()
// set number question in element dom
numberofquestionEle.innerHTML = numberQuestion
// fetch  data from api 
function getQuizFromApi(){ fetch('https://opentdb.com/api.php?amount=20&type=multiple')
  .then(response => response.json())
  .then(data =>{
let questions = data.results  ;
// all answer from api
let allAnswer = questions[`${questionCount}`].incorrect_answers.concat(questions[`${questionCount}`].correct_answer);
// swaping answer in array
shuffle(allAnswer)
correctanswers.push(questions[`${questionCount}`].correct_answer)
console.log(questions[`${questionCount}`].correct_answer);
// answersEle.innerHTML = eleAnswers
questionTitleEle.innerHTML = questions[`${questionCount}`].question
// creatEle()
// 
for(let i = 0 ;i< 4  ;i++){
  // add answer to label inupt
  answersSpan[i].innerHTML =allAnswer[i]

}
answersSpan.forEach(e=>{
  
  e.classList.remove("active")
})

});}
// function to counter number of question 
function countQuestion(){
  if(numberQuestion < 20){
    numberQuestion++
  } 
  numberofquestionEle.innerHTML = numberQuestion
}
//
document.addEventListener("click",(e)=>{
  if(e.target.classList == "answer"){
    answersSpan.forEach(e=>{
  
  e.classList.remove("active")
})
e.target.classList.add("active")
stroge = e.target.innerHTML
console.log(stroge);
  }

}) 



function storageAnswer(){
        if(correctanswers[questionCount ] == stroge){
              result ++
            }
            stroge = "";
            console.log(result);
  }
 
 
//  function shuffle array
function shuffle(array) {
  let currentIndex = array.length,
  randomIndex;
  // While there remain elements to shuffle...
  while (currentIndex != 0) {
        // Pick a remaining element...
      randomIndex =Math.floor (Math.random() * currentIndex );
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}





// show result 


  function showResult(){
    storageAnswer()

    popUpResult.style.display ="block"
    document.querySelector(".head-result .name ").innerHTML =  infoName.innerHTML;
    document.querySelector(".degrea span").innerHTML = result;
   let parsntage = document.querySelector(".parsntage span");
   parsntage.innerHTML = Math.floor( eval(`${result}/${numberQuestion}*100`))
    let apappreciation= document.querySelector(".appreciation span");
     if(parsntage.innerHTML < 50){
      apappreciation.innerHTML = "Fail the Quiz"
    }
    else if(parsntage.innerHTML < 65){
      apappreciation.innerHTML = "Acceptable" 
    }else if(parsntage.innerHTML < 75){
      apappreciation.innerHTML = "Good"
    }else if(parsntage.innerHTML < 85){
      apappreciation.innerHTML = "Very Good"
    }else if(parsntage.innerHTML <= 100){
      apappreciation.innerHTML = "Excellent"
    }
  
  let newQuiz = document.querySelector(".new-quiz span")
  newQuiz.addEventListener("click",()=>{
    location.reload()
  })}





  
