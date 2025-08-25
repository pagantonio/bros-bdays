$(document).ready(function(){

  const curentDayAndMonth = new Date().toISOString().substring(5,10)

  const aqMsg = function() {
    writeMessage(["FELIZ ANIVERSÁRIO ^1000 CRETINO!"])
  }

  const siMsg = function() {
    writeMessagesWithDelayBetweenWords(["IT'S NOT A BEE!", 500], ["HAPPY BIRTHDAY BRO! :D", 0])
  }

  const brosBdayDatesToData = {
    "04-18": { file: "aq.html", msgFn: aqMsg },
    "08-23": { file: "si.html", msgFn: siMsg },
    "08-24": { file: "si.html", msgFn: siMsg }
  };

  const isBroBdayToday = brosBdayDatesToData.hasOwnProperty(curentDayAndMonth);

  if (!isBroBdayToday) {
    $('#pageBody').load('../static/no-bdays-today.html');
    return;
  }

  const broHTML = brosBdayDatesToData[curentDayAndMonth].file;
  const broMsgFn = brosBdayDatesToData[curentDayAndMonth].msgFn;

  $('#pageBody').load(broHTML, function() {
    makeMagic(broMsgFn);
  });

  function makeMagic(broMsgFn) {
    $('#pageBody').append('<p id="message" style="color:#fff;font-size:40px;font-family:arial, sans-serif;margin-bottom: 0px;margin-top: 0px;"></p>');
    var elements = document.querySelectorAll('b');

    elements.forEach(function(e, i){
      e.style.visibility = 'hidden';
    });

    elements = makeMatrix(elements, 70);
    Promise.all(drawBro(elements)).then(function(){
      broMsgFn();
    });
  }

  function writeMessagesWithDelayBetweenWords(...messagesWithDelays) {
    postProcessedMessages = [];

    messagesWithDelays.forEach(([message, delay]) => {
      splitWords = message.split(' ');
      messageWithDelaySymbols = splitWords.join(` ^${delay} `);
      postProcessedMessages.push(messageWithDelaySymbols);
    });

    writeMessage(postProcessedMessages);
  }

  function writeMessage(rawMessages) {
    Typed.new('#message', {
      strings: rawMessages,
      typeSpeed: 2
    });
  }

  function makeMatrix(array, interval) {
    var matrix = [];
    var i;
    var k;

    for (i = 0, k = -1; i < array.length; i++) {
        if (i % interval === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(array[i]);
    }

    return matrix;
}

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function draw(items, initialSpeed, decreasingValue) {
      for (var j = 0; j < items.length; j++) {
        var font = items[j];
        var sleepTime = initialSpeed - (j * decreasingValue)/2;
        sleepTime = sleepTime <= decreasingValue ? decreasingValue : sleepTime;
        font.style.visibility = 'visible';
        await sleep(sleepTime);
      }
  }

  function drawBro(elements) {
    var functions = [];
    for (var i = 0; i < elements.length; i++) {
      functions[i] = draw(elements[i], 200, 20);
    }

    return functions;
  }
});
