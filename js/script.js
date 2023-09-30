//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const tryagain_btn = document.querySelector(".tryagain.btn");
const vid_box = document.querySelector(".vid_box");
const vid_continue = vid_box.querySelector(".buttons .vid_continue");
const para_box = document.querySelector(".para_box");
const para_continue = para_box.querySelector(".buttons .para_continue");
const theoryTxt = para_box.querySelector("theoryTxt")

// Initiating Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDk2qbFh8R9OKDbI97tjFO5gGjagy9zHZQ",
  authDomain: "vlabs-ec1c6.firebaseapp.com",
  databaseURL: "https://vlabs-ec1c6-default-rtdb.firebaseio.com",
  projectId: "vlabs-ec1c6",
  storageBucket: "vlabs-ec1c6.appspot.com",
  messagingSenderId: "812057089772",
  appId: "1:812057089772:web:73aaf1032c2fb21dc2f7c9",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// if startQuiz button clicked
start_btn.onclick = () => {
  vid_box.classList.add("activeVid"); //show info box
};

vid_continue.onclick = () => {
  para_box.classList.add("insActive");
  vid_box.classList.remove("activeVid"); //show info box
};

para_continue.onclick = () => {
  para_box.classList.remove("insActive");
  info_box.classList.add("activeInfo"); //show info box
};

exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); //hide info box
};

// if continueQuiz button clicked
continue_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); //hide info box
  quiz_box.classList.add("activeQuiz"); //show quiz box

  queCounter(que_numb);
  que_numb++;
};

let timeValue = 30;
let pretestcnt = 0;
let queA_count = 0;
let queB_count = 0;
let queC_count = 0;
let queD_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;
let que2_count = 0;

const quit_quiz = result_box.querySelector(".buttons .quit");

quit_quiz.onclick = () => {
  window.location.reload(); //reload the current window
};

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");
const check = document.querySelector("footer .check");
const Try_again = document.querySelector("footer .Try_again");

// if Next Que button clicked
next_btn.onclick = () => {
  if (pretestcnt > 4) {
    pretestcnt++;
    for (i = 1; i <= 3; i++) {
      db.collection("pretest")
        .where("qNo", "==", i)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            var question = doc.data().quesTxt;
            var options = doc.data().Options;

            showQuestions_C(question, options);
          });
        });
    }
  } else if (queA_count == 0) {
    //if question count is less than total question length
    queA_count++; //increment the queA_count value
    //increment the que_numb value
    db.collection("questions")
      .where("qNo", "==", 1)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          globalThis.answer = doc.data().answer;
          var marks = doc.data().maxMarks;
          var maxMarks = doc.data().maxMarks;
          var question = doc.data().quesTxt;
          var options = doc.data().options;
          correcAns = [];
          var correcAns = doc.data().answer;
          console.log(answer);

          showQuestions_A(question, options, correcAns); //calling showQestions function
        });
      });

    queCounter(que_numb); //passing que_numb value to queCounter
    que_numb++;
    //  clearInterval(counter); //clear counter
    // clearInterval(counterLine); //clear counterLine
    //  startTimer(timeValue); //calling startTimer function
    //  startTimerLine(widthValue); //calling startTimerLine function
    //  timeText.textContent = "Time Left"; //change the timeText to Time Left
    next_btn.classList.remove("show"); //hide the next button
  } else if (queB_count < 1) {
    queCounter(que_numb);
    que_numb++;
    console.log("Que - 2");
    questions = questions_B;
    showQuestions_B(queB_count, questions);
    queB_count++;
    // else if()
  } else if (queC_count < 1) {
    queCounter(que_numb);
    que_numb++;
    console.log("Que - 3");
    showQuestions_C(queC_count);
    queC_count++;
    //  clearInterval(counter); //clear counter
    //  clearInterval(counterLine); //clear counterLine
  } else if (queD_count < 1) {
    queCounter(que_numb);
    que_numb++;
    console.log("Que - 4");
    questions = questions_D;
    showQuestions_B(queD_count, questions);
    queD_count++;
  } else {
    showResult(); //calling showResult function
  }
};
next_btn.classList.add("show");
//========================================================================================

// getting questions_A and options from array

function showQuestions_A(question, options, correcAns) {
  //Data from Firebase

  const queA_text = document.querySelector(".queA_text");

  //creating a new span and div tag for question and option and passing the value using array index
  let queA_tag = "<span>" + "A" + ". " + question + "</span>";
  queA_text.innerHTML = queA_tag; //adding new span tag inside que_tag
  document.getElementById("queA_text1").innerHTML +=
    '<div class="option_list"><div class = "table" id = "Table">';
  var opt_id = 0;
  for (i = 0; i < 3; i++) {
    document.getElementById("Table").innerHTML += '<div class = "row">';
    for (j = 0; j < 3; j++) {
      document.getElementById("Table").innerHTML +=
        '<div class="option" id = "' +
        opt_id +
        '"><img src = "' +
        options[opt_id] +
        '" alt="Image" height="100" width="100"></div>';
      opt_id++;
    }
    document.getElementById("Table").innerHTML += "</div>";
  }

  document.getElementById("queA_text1").innerHTML += "</div></div>";
  // +'<div class = "row">'
  // +'<div class="option" id = "0"><span><img src = "' + questions_A[index].options[0]+'"></span></div>'
  // + '<div class="option" id = "1"><span><img src = "' + questions_A[index].options[1]+'"></span></div>'
  // +'</div>'
  // +'<div class = "row">'
  // + '<div class="option" id = "2"><span><img src = "' + questions_A[index].options[2]+'"></span></div>'
  // + '<div class="option" id = "3"><span><img src = "' + questions_A[index].options[3]+'"></span></div>'
  // +'</div>'
  // +'</div></div>';

  // option_list.innerHTML = option_tag; //adding new div tag inside option_tag

  const option = document.querySelectorAll(".option");

  // set onclick attribute to all available options

  for (i = 0; i < option.length; i++) {
    option[i].setAttribute(
      "onclick",
      "optionSelected_multiple(this,0, [" + correcAns + "])"
    );
  }
}
// creating the new div tags which for icons
//let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
//let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option

inc_marks = questions_A[queA_count].marks;
var attempt = 1;
var ans_array = [];
function optionSelected_multiple(answer, call_id, correcAns) {
  console.log(correcAns);
  if (call_id == 1) {
    ans_array = [];
  }
  Try_again.classList.remove("show");
  var items = document.querySelectorAll(".option");
  //   items.forEach(function (item) {
  //    //item.className = item.className.replace("selected"," ");
  //    console.log(item.className)
  //    if(item.className == "selected"){
  //     item.className = item.className.replace("selected"," ");
  //    }
  //   });

  if (answer.className === "option selected") {
    console.log(ans_array.includes(parseInt(answer.id)));
    answer.className = answer.className.replace("selected", " ");
    if (ans_array.includes(parseInt(answer.id)) == true) {
      var value = parseInt(answer.id);
      var index = ans_array.indexOf(value);
      ans_array.splice(index, 1);
    }
  } else {
    answer.classList.add("selected");
    console.log(ans_array.includes(answer.id));
    if (ans_array.includes(parseInt(answer.id)) === false) {
      console.log(answer.id);
      ans_array.push(parseInt(answer.id));
    }
  }
  console.log(answer);
  //  clearInterval(counter); //clear counter
  //    clearInterval(counterLine); //clear counterLine
  let userAns = ans_array.sort(); //getting user selected option
  //console.log(answer.id)
  console.log(userAns);
  //let correcAns = questions_A[queA_count].answer; //getting correct answer from array
  console.log(correcAns);
  const allOptions = option_list.children.length; //getting all option items
  console.log(allOptions);

  //next_btn.classList.add("show"); //show the next button if user selected any option
  check.classList.add("show");
  check.onclick = () => {
    if ((userAns.toString() == correcAns) == true && attempt < 3) {
      //if user selected option is equal to array's correct answer
      next_btn.classList.add("show");
      userScore += inc_marks; //upgrading score value with 1
      for (i = 0; i < correcAns.length; i++) {
        var ans_temp = document.getElementById(correcAns[i]);
        ans_temp.classList.add("correct");
        //answer.classList.add("correct"); //adding green color to correct selected option
      }
      // answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
      console.log("Correct Answer");
      console.log("Your correct answers = " + userScore);

      for (i = 0; i < 9; i++) {
        // console.log(questions_A.options.length)
        var dis = document.getElementById(i);
        dis.classList.add("disabled");
        // option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
      }
    } else if (attempt == 3) {
      var items = document.querySelectorAll(".option");
      items.forEach(function (item) {
        item.className = item.className.replace("selected", " ");
      });
      for (i = 0; i < correcAns.length; i++) {
        var ans_temp = document.getElementById(correcAns[i]);
        ans_temp.classList.add("correct");
      }
      //answer.classList.add("correct"); //adding green color to correct selected option
      for (i = 0; i < 9; i++) {
        // console.log(questions_A.options.length)
        var dis = document.getElementById(i);
        dis.classList.add("disabled");
        // option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
      }

      next_btn.classList.add("show");
    } else {
      attempt++;
      inc_marks -= 1;
      console.log("else executed");
      var items = document.querySelectorAll(".option");
      items.forEach(function (item) {
        item.className = item.className.replace("selected", " ");
      });
      for (i = 0; i < 9; i++) {
        // console.log(questions_A.options.length)
        var dis = document.getElementById(i);
        dis.classList.add("disabled");
        // option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
      }
      Try_again.classList.add("show");
      Try_again.onclick = () => {
        for (i = 0; i < 9; i++) {
          // console.log(questions_A.options.length)
          var dis = document.getElementById(i);
          dis.classList.remove("disabled");
          // option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
        }
        optionSelected_multiple(answer, 1, correcAns);
      };

      //answer.classList.add("incorrect"); //adding red color to correct selected option
      // answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
      // console.log("Wrong Answer");

      // for(i = 0;i<correcAns.length;i++){
      //     var ans_temp = document.getElementById(correcAns[i])
      //     ans_temp.classList.add("correct")
      //     //answer.classList.add("correct"); //adding green color to correct selected option
      //     }
    }
    //console.log(questions_A[index].options.length)

    check.classList.remove("show");
  };
}

//=============================================================================================================

function showQuestions_B(index, questions) {
  attempt = 1;
  inc_marks = 0;
  db.collection("questions")
    .where("qNo", "==", 2)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        globalThis.answer = doc.data().answer;
        var marks = doc.data().maxMarks;
        var maxMarks = doc.data().maxMarks;
        var question = doc.data().quesTxt;
        var subTxt = doc.data().subTxt;

        next_btn.classList.remove("show");
        if (document.getElementById("queA") != null) {
          var queA_section = document.getElementById("queA_text1");

          queA_section.remove(queA_section.selectedIndex);
        }

        document.getElementById("queA").innerHTML +=
          "<div class = 'Qtext' id = 'queA_text1'>" + "</div>";

        const queB_text = document.getElementById("queA_text1");
        //creating a new span and div tag for question and option and passing the value using array index
        let queB_tag = "<span>" + "B. " + question + "</span>";
        // console.log('QB - ',queB_tag)
        queB_text.innerHTML = queB_tag; //adding new span tag inside que_tag
        for (i = 0; i <= subTxt.length - 1; i++) {
          document.getElementById("queA_text1").innerHTML +=
            "<div>" +
            "<span>" +
            (i + 1) +
            ". " +
            subTxt[i] +
            "</span>" +
            '<label for = "answer"></label>' +
            "<input class = 'inputs' id = " +
            "answer" +
            i +
            ' name="answer" type = "text" >' +
            "</div>" +
            "<div class='column' id= " +
            "answer" +
            i +
            "</div>";
        }
      });
    });
  text_ans();
}

var text_user_array = [];
var text_ans_array = [];
var totalmarkB = 9;

function text_ans() {
  Try_again.classList.remove("show");
  check.classList.add("show");
  check.onclick = () => {
    check.classList.remove("show");
    for (i = 0; i <= 3 - 1; i++) {
      var ID = "answer" + i;
      var ans = document.getElementById(ID);

      text_user_array.push(parseInt(ans.value));
      // text_ans_array.push(parseInt(questions[0].SubQuestions[i].answer))
    }
    db.collection("questions")
      .where("qNo", "==", 2)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var text_ans_array1 = doc.data().answer;
          text_ans_array = text_ans_array1;
        });
      });

    console.log(text_ans_array);

    //  text_user_array = text_user_array.sort()
    //  text_ans_array = text_ans_array.sort()
    console.log("user ans - ", text_user_array);
    console.log("correct ans - ", text_ans_array);

    if ((text_user_array.toString() == text_ans_array.toString()) == true) {
      userScore += inc_marks;
      console.log("Correct Answer");
      for (i = 0; i < 3; i++) {
        var id = "answer" + i;
        document.getElementById(id).disabled = true;
      }
      next_btn.classList.add("show");
      text_user_array = [];
      text_ans_array = [];
    } else if (attempt > 3) {
      for (i = 0; i < 3; i++) {
        var id = "answer" + i;
        document.getElementById(id).value = text_ans_array[i];
        document.getElementById(id).disabled = true;
      }
      next_btn.classList.add("show");
    } else {
      inc_marks -= 1;
      attempt++;
      Try_again.classList.add("show");
      for (i = 0; i < 3; i++) {
        var id = "answer" + i;
        document.getElementById(id).disabled = true;
      }
      Try_again.onclick = () => {
        for (i = 0; i < 3; i++) {
          var id = "answer" + i;
          document.getElementById(id).disabled = false;
        }

        text_user_array = [];
        text_ans_array = [];
        text_ans();
      };
    }

    check.classList.remove("show");
    //next_btn.classList.add("show");
  };
}

//================================================================================================================
function showQuestions_C(question, options) {
  attempt = 1;
  next_btn.classList.remove("show");
  if (document.getElementById("queA") != null) {
    var queA_section = document.getElementById("queA_text1");
    console.log(queA_section);
    queA_section.remove(queA_section.selectedIndex);
    console.log(queA_section);
  }

  // document.getElementById('que').innerHTML +=
  //           "<div class='queA_text'> </div>";
  // document.getElementById('que').innerHTML +=
  //           "<div class='option_list'>  </div>";
  // console.log(document.getElementById("que"))

  document.getElementById("queA").innerHTML +=
    "<div class = 'Qtext' id = 'queA_text1'>" + "</div>";

  //creating a new span and div tag for question and option and passing the value using array index
  let queC_tag = "<span>" + "C" + ". " + question + "</span>";
  document.getElementById("queA_text1").innerHTML = queC_tag; //adding new span tag inside que_tag
  document.getElementById("queA_text1").innerHTML +=
    '<div class="option_list"><div class = "table" id = "Table">';
  var opt_id = 0;
  for (i = 0; i < 2; i++) {
    document.getElementById("Table").innerHTML += '<div class = "row">';
    for (j = 0; j < 2; j++) {
      document.getElementById("Table").innerHTML +=
        '<div class="option" id = "' +
        opt_id +
        '"><img src = "' +
        options[opt_id] +
        '"></div>';
      opt_id++;
    }
    document.getElementById("Table").innerHTML += "</div>";
  }
  document.getElementById("queA").innerHTML += "</div></div>";
  // +'<div class = "row">'
  // +'<div class="option" id = "0"><span><img src = "' + questions_A[index].options[0]+'"></span></div>'
  // + '<div class="option" id = "1"><span><img src = "' + questions_A[index].options[1]+'"></span></div>'
  // +'</div>'
  // +'<div class = "row">'
  // + '<div class="option" id = "2"><span><img src = "' + questions_A[index].options[2]+'"></span></div>'
  // + '<div class="option" id = "3"><span><img src = "' + questions_A[index].options[3]+'"></span></div>'
  // +'</div>'
  // +'</div></div>';

  // option_list.innerHTML = option_tag; //adding new div tag inside option_tag

  const option = document.querySelectorAll(".option");

  // set onclick attribute to all available options
  for (i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected_single(this)");
  }
}
function optionSelected_single(answer) {
  console.log("optionSelected ran");
  Try_again.classList.remove("show");
  var items = document.querySelectorAll(".option");
  items.forEach(function (item) {
    item.className = item.className.replace("selected", " ");
  });
  answer.classList.add("selected");
  // if (answer.className === "option selected") {
  //   console.log(ans_array.includes(parseInt(answer.id)));
  //   answer.className = answer.className.replace("selected", " ");
  //   if (ans_array.includes(parseInt(answer.id)) == true) {
  //     var value = parseInt(answer.id);
  //     var index = ans_array.indexOf(value);
  //     ans_array.splice(index, 1);
  //   }
  // } else {
  //   answer.classList.add("selected");
  //   console.log(ans_array.includes(answer.id));
  //   if (ans_array.includes(parseInt(answer.id)) === false) {
  //     console.log(answer.id);
  //     ans_array.push(parseInt(answer.id));
  //   }
  // }

  //  clearInterval(counter); //clear counter
  //    clearInterval(counterLine); //clear counterLine
  let userAns = answer.id; //getting user selected option
  //console.log(answer.id)
  console.log(userAns);
  let correcAns = questions_C[queC_count - 1].answer; //getting correct answer from array
  console.log(correcAns);
  const allOptions = option_list.children.length; //getting all option items
  console.log(allOptions);

  //next_btn.classList.add("show"); //show the next button if user selected any option
  check.classList.add("show");
  check.onclick = () => {
    if ((userAns == correcAns) == true && attempt < 3) {
      check.classList.remove("show");
      //if user selected option is equal to array's correct answer
      next_btn.classList.add("show");
      userScore += questions_C[queC_count - 1].marks; //upgrading score value with 1

      var ans1_temp = document.getElementById(correcAns);
      ans1_temp.classList.add("correct");
      //answer.classList.add("correct"); //adding green color to correct selected option

      // answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
      console.log("Correct Answer");
      console.log("Your correct answers = " + userScore);

      for (i = 0; i <= 3; i++) {
        // console.log(questions_A.options.length)
        var dis = document.getElementById(i);
        dis.classList.add("disabled");
        // option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
      }
    } else if (attempt == 3) {
      var items = document.querySelectorAll(".option");
      items.forEach(function (item) {
        item.className = item.className.replace("selected", " ");
      });

      var ans_temp = document.getElementById(correcAns);
      ans_temp.classList.add("correct");

      //answer.classList.add("correct"); //adding green color to correct selected option
      for (i = 0; i < 4; i++) {
        // console.log(questions_A.options.length)
        var dis = document.getElementById(i);
        dis.classList.add("disabled");
        // option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
      }

      next_btn.classList.add("show");
    } else {
      attempt++;
      console.log("else executed");
      check.classList.remove("show");
      for (i = 0; i < 4; i++) {
        // console.log(questions_A.options.length)
        var dis = document.getElementById(i);
        dis.classList.add("disabled");
        // option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
      }
      Try_again.classList.add("show");
      Try_again.onclick = () => {
        for (i = 0; i < 4; i++) {
          // console.log(questions_A.options.length)
          var dis = document.getElementById(i);
          dis.classList.remove("disabled");
          // option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
        }
        optionSelected_single(answer);
      };

      //answer.classList.add("incorrect"); //adding red color to correct selected option
      // answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
      // console.log("Wrong Answer");

      // for(i = 0;i<correcAns.length;i++){
      //     var ans_temp = document.getElementById(correcAns[i])
      //     ans_temp.classList.add("correct")
      //     //answer.classList.add("correct"); //adding green color to correct selected option
      //     }
    }
    //console.log(questions_A[index].options.length)
    check.classList.remove("show");
  };
}
// //================================================================================================================
// function showQuestions_D(index) {
//   next_btn.classList.remove("show");
//   if (document.getElementById("queA") != null) {
//     var queA_section = document.getElementById("queA_text1");

//     queA_section.remove(queA_section.selectedIndex);

//   }
//   document.getElementById('queA').innerHTML += "<div class = 'Qtext' id = 'queA_text1'>"
//   +"</div>"
//   const queD_text = document.getElementById("queA_text1");
//   //creating a new span and div tag for question and option and passing the value using array index
//    let queD_tag = '<span>'+ 'D' + ". " + questions_D[index].Question +'</span>';
//   // console.log('QB - ',queB_tag)
//   queD_text.innerHTML = queD_tag; //adding new span tag inside que_tag
//   document.getElementById('queA').innerHTML += "<div class = 'Qtext' id = 'queA_text1'>"+
//   "</div>"
//   for (i = 0; i <= questions_D[0].SubQuestions.length - 1; i++) {
//     document.getElementById("queA_text1").innerHTML +=
//       "<div>" +
//       "<span>" +
//       questions_D[0].SubQuestions[i].numb +
//       ". " +
//       questions_D[0].SubQuestions[i].question +
//       "</span>" +
//       '<label for = "answer"></label>' +
//       "<input class = 'inputs' id = " +
//       "answer" +
//       i +
//       ' name="answer" type = "text" >' +
//       "</div>";

//   }
//   text1_ans()
// }
// var text_user_array = []
// var text_ans_array = []
// var totalmarkB = 9
// function text1_ans(){
//   check.classList.add("show");
//   Try_again.classList.remove('show')
//   check.onclick = () => {
//     check.classList.remove("show");
//     for (i = 0; i <= 3 - 1; i++) {
//       var ID = "answer" + i;
//       var ans = document.getElementById(ID)

//       text_user_array.push(parseInt(ans.value))
//       text_ans_array.push(parseInt(questions_D[0].SubQuestions[i].answer))

//     }
//     console.log('total marks b - ',totalmarkB)

//      text_user_array = text_user_array
//      text_ans_array = text_ans_array
//      console.log("user ans - ",text_user_array);
//      console.log("correct ans - ",text_ans_array);

//       if ((text_user_array.toString() == text_ans_array.toString()) == true) {
//         userScore += totalmarkB ;
//         console.log("Correct Answer");
//         next_btn.classList.add("show");
//         for(i=0;i< questions_D[0].SubQuestions.length;i++){
//           var id = 'answer'+i;
//           document.getElementById(id).disabled = true;
//         }
//       }
//       else{
//           Try_again.classList.add('show')
//           for(i=0;i< questions_D[0].SubQuestions.length;i++){
//             var id = 'answer'+i;
//             document.getElementById(id).disabled = true;
//           }
//           Try_again.onclick = () => {
//             for(i=0;i< questions_D[0].SubQuestions.length;i++){
//               var id = 'answer'+i;
//               document.getElementById(id).value = ''
//               document.getElementById(id).disabled = false
//             }

//              text_user_array = []
//              text_ans_array = []
//               text1_ans()
//           }

//       }

//     check.classList.remove("show");
//     //next_btn.classList.add("show");
//   };
// }

//================================================================================================================
function showResult() {
  let Total_marks = 24;
  // for (i = 0; i < questions_A.length; i++) {
  //   Total_marks += questions_A[i].marks;
  // }
  // for (i = 0; i < questions.length; i++) {
  //   Total_marks += questions[i].marks;
  // }

  console.log("Total Marks - ", Total_marks);

  info_box.classList.remove("activeInfo"); //hide info box
  quiz_box.classList.remove("activeQuiz"); //hide quiz box
  result_box.classList.add("activeResult"); //show result box
  const scoreText = result_box.querySelector(".score_text");
  if (userScore > 20) {
    // if user scored more than 3
    //creating a new span tag and passing the user score number and total question number
    let scoreTag =
      "<span>and congrats! 🎉, You got <p>" +
      userScore +
      "</p> out of <p>" +
      Total_marks +
      "</p></span>";
    scoreText.innerHTML = scoreTag; //adding new span tag inside score_Text
  } else if (userScore > 15) {
    // if user scored more than 1
    let scoreTag =
      "<span>and nice 😎, You got <p>" +
      userScore +
      "</p> out of <p>" +
      Total_marks +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else {
    // if user scored less than 1
    let scoreTag =
      "<span>and sorry 😐, You got only <p>" +
      userScore +
      "</p> out of <p>" +
      Total_marks +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  }
}

// function startTimer(time){
//     counter = setInterval(timer, 1000);
//     function timer(){
//         timeCount.textContent = time; //changing the value of timeCount with time value
//         time--; //decrement the time value
//         if(time < 9){ //if timer is less than 9
//             let addZero = timeCount.textContent;
//             timeCount.textContent = "0" + addZero; //add a 0 before time value
//         }
//         if(time < 0){ //if timer is less than 0
//             clearInterval(counter); //clear counter
//             timeText.textContent = "Time Off"; //change the time text to time off
//             const allOptions = option_list.children.length; //getting all option items
//             let correcAns = questions_A[queA_count].answer; //getting correct answer from array
//             for(i=0; i < allOptions; i++){
//                 if(option_list.children[i].id == correcAns){ //if there is an option which is matched to an array answer
//                     option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
//                     option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
//                     console.log("Time Off: Auto selected correct answer.");
//                 }

//             }
//             for(i=0; i < allOptions; i++){
//                 option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
//             }
//             next_btn.classList.add("show"); //show the next button if user selected any option
//         }
//     }
// }

// function startTimerLine(time){
//     counterLine = setInterval(timer, 59);
//     function timer(){
//         time += 1; //upgrading time value with 1
//         time_line.style.width = time + "px"; //increasing width of time_line with px by time value
//         if(time > 549){ //if time value is greater than 549
//             clearInterval(counterLine); //clear counterLine
//         }
//     }
// }

function queCounter(index) {
  //creating a new span tag and passing the question number and total question
  let totalQueCounTag =
    "<span><p>" + index + "</p> of <p>" + 4 + "</p> questions</span>";
  bottom_ques_counter.innerHTML = totalQueCounTag; //adding new span tag inside bottom_ques_counter
}

// checking
