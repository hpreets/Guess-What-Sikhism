angular.module('guesswhat.controllers', [])

.controller('LandingCtrl', function ($scope, $location, $ionicModal, $ionicPopup, LocalStorage) {

  $scope.startPuzzle = function() {
    $location.path('/app/home');
  }

  setModelDialog = function(modelUrl, animation, $ionicModal, $scope) {
    $ionicModal.fromTemplateUrl(modelUrl, {
        scope: $scope,
        animation: animation
    }).then(function(modal) {
        $scope.modal = modal
    });

    $scope.openModal = function() {
        $scope.modal.show();
    };

    $scope.closeModal = function() {
        $scope.modal.hide();
    };

    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
  };
  $scope.level = LocalStorage.getCurrentLevel();
  $scope.remainingCoins = LocalStorage.getRemainingCoins();
  setModelDialog('templates/help.html', 'slide-in-up', $ionicModal, $scope);
})

.controller('HomeCtrl', function ($scope, $timeout, $ionicPopup, LocalStorage) {
  $scope.gotoQuestion = function() {
    // LocalStorage.setCurrentLevel(18);
    // LocalStorage.setRemainingCoins(100);
    var level = LocalStorage.getCurrentLevel();
    var qNumb = LocalStorage.getCurrentLevelQuesIdx();
    var coins = LocalStorage.getRemainingCoins();
    $scope.level = level;
    $scope.questionNumber = qNumb;
    $scope.showAnswerRow = true;

    // console.log(level + '--' + qNumb + '--' + coins);
    // console.log(quizData['l' + (Number(level)+1)]);
    // console.log(quizData['l' + (Number(level)+1)][qNumb]);
    var currLevelData = quizData['l' + (Number(level)+1)];
    // if ($scope.qId == null) $scope.qId = 0; else $scope.qId = Number($scope.qId) + 1;
    $scope.qId = Number(qNumb);
    $scope.remainingCoins = coins;
    // console.log($scope.qId);
    // console.log(currLevelData[$scope.qId]);
    var idx = $scope.qId;
    // console.log(currLevelData[idx]);
    var currQues = currLevelData[$scope.qId];
    // $scope.currLevel = l1_1;
    // $scope.question = l1_1[idx].qText;
    // $scope.qId = l1_1[idx].qId;

    // console.log(currLevelData[idx].answerV2);
    // console.log(currLevelData[idx].answerV2.replace(/ /g, ';'));


    // userAns = '';
    // for (var ctr = 0; ctr < answerArr.length; ctr++) {
    //   userAns += '_' + ' ';
    // }

    var currPuzzle = currLevelData[qNumb];
    var isNumericPuzzle = currPuzzle.numeric == true;

    $scope.answer1 = [];
    $scope.answer2 = [];
    if (isNumericPuzzle) {
      for (var ctr = 0; ctr < 10; ctr++) {
        if (ctr < MAX_AVAILABLE_LETTERS_TO_CHOOSE/2) $scope.answer1.push({id:ctr, text:''+ctr});
        else $scope.answer2.push({id:ctr, text:''+ctr});
      }
      $scope.answer2.push({id:11, text:'-'});
      $scope.answer2.push({id:12, text:'*'});
    }
    else {
      var answerArr = currLevelData[idx].answerV2.replace(/ /g, ';').split(';');
      for (var ctr = answerArr.length; ctr < 100; ctr++) {
        var rndLettr = randomLetter();
        answerArr.push(rndLettr);
        answerArr = getUnique(answerArr);
        if (answerArr.length == MAX_AVAILABLE_LETTERS_TO_CHOOSE) break;
      }

      shuffle(answerArr);
      for (var ctr = 0; ctr < answerArr.length; ctr++) {
        if ($scope.answer1.length < MAX_AVAILABLE_LETTERS_TO_CHOOSE/2) $scope.answer1.push({id:ctr, text:answerArr[ctr]});
        else $scope.answer2.push({id:ctr, text:answerArr[ctr]});
      }
    }
    // console.log($scope.answer1);
    // currLevelData[idx].userAnswer = userAns.trim();
    // currLevelData[idx].initAnswer = userAns.trim();

    // currQues.userAnswer = userAns.trim();
    // $scope.currQ = currQues;
    // console.log(currLevelData[idx].userAnswer);
    $scope.currLevel = currLevelData;
    $scope.userAnswerDivClass = '';
    // console.log($scope.currLevel[idx].userAnswer);
    var answerV2Arr = [];
    var ansWordArr = []
    var totalChars = 0;
    var charCounter = 0;
    for (var ctr=0; ctr < currLevelData[qNumb].answerV2.split(' ').length; ctr++) {
      ansWordArr = currLevelData[qNumb].answerV2.split(' ')[ctr].split(';');
      totalChars += ansWordArr.length;
      var newAnsWordArr = [];
      for (var innerCtr = 0; innerCtr < ansWordArr.length; innerCtr++) {
        newAnsWordArr.push({id:charCounter, text:'', ansText:ansWordArr[innerCtr], hintAns:false});
        charCounter++;
      }
      answerV2Arr.push({newAnsWordArr});
    }
    // console.log(answerV2Arr);
    $scope.answerV2Arr = answerV2Arr;
    $scope.totalChars = totalChars;
    // console.log('level :::' + $scope.level);
  }

  randomNumber = function(maxLength) {
    return Math.ceil(Math.random()*maxLength);
  }
  randomLetter = function() {
    var letterList = "qrtplkjhgfdszxcvbnmQTPLKJGFDSZXCVB^&";
    var matraList = "y Y u U I o O y Y u U I o O";
    return (letterList[Math.floor(Math.random()*letterList.length)]+matraList[Math.floor(Math.random()*matraList.length)]).trim();
  }
  shuffle = function(o) {
		for(var j, x, i = o.length; i;
		    j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	}
  getUnique = function(arr){
    var u = {}, a = [];
    for(var i = 0, l = arr.length; i < l; ++i){
      if(u.hasOwnProperty(arr[i])) {
        continue;
      }
      a.push(arr[i]);
      u[arr[i]] = 1;
    }
    return a;
  }

  checkAllDoneAndTakeAction = function(userAns, actualAns) {
    console.log(userAns + '----' + actualAns);
    if (userAns.split(';').length == actualAns.split(';').length) {
      console.log('All Done');
      if (userAns.replace(/ /g, ';') == actualAns) {
        console.log('CORRECT!!');
        $scope.userAnswerDivClass = 'greenBlock';
        $scope.stars = '* * *';
        $scope.answerText = $scope.currLevel[$scope.qId].answerV2.replace(/;/g, '');

        // Update Level and Question Number
        setNextLevel();

        $timeout(function() {
          if ($scope.levelComplete == true) addToRemainingCoins(LEVEL_COMPLETE_COIN_MULTIPLIER * COINS_GAINED_ON_ANSWER);
          else addToRemainingCoins(COINS_GAINED_ON_ANSWER);
          var myPopup = createQuesCompletionPopupObject($scope, $ionicPopup);
          $scope.showAnswerRow = false;
	// $scope.gotoQuestion();

          // Reset answerV2Arr
          // var answerV2Arr = [], newAnsWordArr=[];
          // newAnsWordArr.push({id:1, text:'', ansText:'', hintAns:false});
          // answerV2Arr.push({newAnsWordArr});
          // console.log(answerV2Arr);
          // $scope.answerV2Arr = answerV2Arr;

				}, 1500);

      }
      else {
        console.log('INCORRECT!!');
        $scope.userAnswerDivClass = 'redBlock';
      }
    }
    else {
      $scope.userAnswerDivClass = '';
    }
  }

  setNextLevel = function() {
    var level = LocalStorage.getCurrentLevel();
    var qNumb = LocalStorage.getCurrentLevelQuesIdx();
    $scope.questionNumber = qNumb+1;
    // TODO: TO BE UNCOMMENTED BEFORE DELIVERY
    if (qNumb + 1 >= MAX_QUES_PER_LEVEL) {
      $scope.levelComplete = true;
      if (level+1 >= CURR_MAX_LEVEL) LocalStorage.setCurrentLevel(0);
      else LocalStorage.setCurrentLevel(level+1);
      LocalStorage.setCurrentLevelQuesIdx(0);
    }
    else {
      $scope.levelComplete = false;
      LocalStorage.setCurrentLevelQuesIdx(qNumb + 1);
    }
  }

  createQuesCompletionPopupObject = function($scope, $ionicPopup) {
  	// An elaborate, custom popup -- http://codepen.io/ionic/pen/zkmhJ
  	var myPopup = $ionicPopup.show({
  		templateUrl: 'templates/pcorrans.html',
  		scope: $scope,
      cssClass: 'popupcorrans',
      buttons: [{ // Array[Object] (optional). Buttons to place in the popup footer.
        text: 'Continue',
        type: 'button-positive',
        onTap: function(e) {
          // Returning a value will cause the promise to resolve with the given value.
          $scope.showAnswerRow = false;
          return $scope.gotoQuestion();
        }
      }]
  	});
  	return myPopup;
  }

  $scope.onLetterClick = function(lettr) {
    console.log(lettr);
    var userAnsweredLetters = setAnswerLetter(null, lettr, false, true, false);
    checkAllDoneAndTakeAction(userAnsweredLetters, $scope.currLevel[$scope.qId].answerV2.replace(/ /g, ';')+';');
  }


  $scope.onAnswerLetterClick = function(letterId) {
    console.log(letterId);
    var userAnsweredLetters = setAnswerLetter(letterId, '', false, false, false);
    checkAllDoneAndTakeAction(userAnsweredLetters, $scope.currLevel[$scope.qId].answerV2.replace(/ /g, ';')+';');
  }

  $scope.solvePuzzle = function() {
    var coinsAvailable = updateRemainingCoins(COINS_USED_ON_SOLVE_PUZZLE);
    if (coinsAvailable) {
      var userAnsweredLetters = setAnswerLetter(null, null, true, false, true);
      checkAllDoneAndTakeAction(userAnsweredLetters, $scope.currLevel[$scope.qId].answerV2.replace(/ /g, ';')+';');
    }
    else {
      showNoCoinsMessage();
    }
  }

  showNoCoinsMessage = function() {
    $ionicPopup.alert({
      template: 'You do not have enough coins available.'
    });
  }

  $scope.resetAnsweredLetters = function() {
    for (var ctr = 0; ctr < $scope.answerV2Arr.length; ctr++) {
      var wordArr = $scope.answerV2Arr[ctr];
      console.log(wordArr);
      for (var innerCtr = 0; innerCtr < wordArr.newAnsWordArr.length; innerCtr++) {
        var letterObj = wordArr.newAnsWordArr[innerCtr];
        console.log(letterObj);
        if (letterObj.hintAns == false) letterObj.text = '';
      }
    }
    checkAllDoneAndTakeAction('', $scope.currLevel[$scope.qId].answerV2.replace(/ /g, ';')+';');
  }

  // $scope.removeLetter = function() {
  //   updateRemainingCoins(COINS_USED_ON_HINT_LETTER);
  //   console.log($scope.extraLetters);
  //   var extraLettersArr = $scope.extraLetters.split(';');
  //   console.log(extraLettersArr);
  //   var letterToRemove = extraLettersArr.shift();
  //   console.log(letterToRemove);
  //
  //   for (var ctr = 0; ctr < $scope.answer1.length; ctr++) {
  //     var row1LetterObj = $scope.answer1[ctr];
  //     if (row1LetterObj.text == letterToRemove) row1LetterObj.text = '';
  //   }
  //   for (var ctr = 0; ctr < $scope.answer2.length; ctr++) {
  //     var row2LetterObj = $scope.answer2[ctr];
  //     if (row2LetterObj.text == letterToRemove) row1LetterObj.text = '';
  //   }
  //   console.log($scope.answer1);
  //
  //   $scope.extraLetters = extraLettersArr.join(';');
  //   console.log($scope.extraLetters);
  // }

  $scope.onHintClick = function() {
    console.log('Hint Clicked');
    var coinsAvailable = updateRemainingCoins(COINS_USED_ON_HINT_LETTER);
    if (coinsAvailable) {
      var useHintAnswer = false;
      var emptyIncorrectLettersObj = emptyLettersAndIncorrectLetterIndexes();
      var emptyIncorrectLetters = emptyIncorrectLettersObj.emptyLetters; // $scope.currLevel[$scope.qId].userAnswer.split('_').length - 1;
      if (emptyIncorrectLetters.length == 0) useHintAnswer = true;
      if (useHintAnswer) {
        emptyIncorrectLetters = emptyIncorrectLettersObj.incorrectLetters; // $scope.currLevel[$scope.qId].initAnswer.split('_').length - 1;
      }

      var rnd = randomNumber(emptyIncorrectLetters.length);
      userAnswered = setAnswerLetter(emptyIncorrectLetters[rnd-1], null, true, false, false);
      checkAllDoneAndTakeAction(userAnswered, $scope.currLevel[$scope.qId].answerV2.replace(/ /g, ';')+';');
    }
    else {
      showNoCoinsMessage();
    }
  }

  emptyLettersAndIncorrectLetterIndexes = function() {
    var emptyLetters = [];
    var incorrectLetters = [];
    console.log($scope.answerV2Arr.length);
    for (var ctr = 0; ctr < $scope.answerV2Arr.length; ctr++) {
      var wordArr = $scope.answerV2Arr[ctr];
      // console.log(wordArr);
      for (var innerCtr = 0; innerCtr < wordArr.newAnsWordArr.length; innerCtr++) {
        var letterObj = wordArr.newAnsWordArr[innerCtr];
        // console.log(letterObj);
        if (letterObj.text == '') {
          emptyLetters.push(letterObj.id);
          incorrectLetters.push(letterObj.id);
        }
        else if (letterObj.text != letterObj.ansText) {
          incorrectLetters.push(letterObj.id);
        }
      }
    }
    return {emptyLetters, incorrectLetters};
  }

  setAnswerLetter = function(lettrId, lettr, hint, userSelected, setAll) {
    var isLetterSet = false;
    var userAnsweredLetters = '';
    for (var ctr = 0; ctr < $scope.answerV2Arr.length; ctr++) {
      var wordArr = $scope.answerV2Arr[ctr];
      console.log(wordArr);
      for (var innerCtr = 0; innerCtr < wordArr.newAnsWordArr.length; innerCtr++) {
        var letterObj = wordArr.newAnsWordArr[innerCtr];
        console.log(letterObj);
        if (!isLetterSet && ((letterObj.id == lettrId)  ||  (setAll)  ||  (lettrId==null  &&  letterObj.text==''))) {
          if (lettr == null || setAll) letterObj.text = letterObj.ansText;
          else if (letterObj.hintAns == false) letterObj.text = lettr;

          // else letterObj.text = lettr;
          if (hint) letterObj.hintAns = true;
          if (!setAll) isLetterSet = true;
          if (letterObj.text != '') userAnsweredLetters += letterObj.text + ';';
        }
        else if (letterObj.text == '') {
          // Do nothing. We dont want blanks to be part of 'userAnsweredLetters'
        }
        else {
          userAnsweredLetters += letterObj.text + ';';
        }
      }
    }
    return userAnsweredLetters;
  }

  updateRemainingCoins = function(coinsUsed) {
    var coins = LocalStorage.getRemainingCoins();
    if (coins < coinsUsed) return false;
    LocalStorage.setRemainingCoins(coins - coinsUsed);
    $scope.remainingCoins = LocalStorage.getRemainingCoins();
    return true;
  }

  addToRemainingCoins = function(coinsAdded) {
    var coins = LocalStorage.getRemainingCoins();
    LocalStorage.setRemainingCoins(coins + coinsAdded);
    $scope.remainingCoins = LocalStorage.getRemainingCoins();
  }

  $scope.onBackspace = function() {
    var userAnsArr = $scope.currLevel[$scope.qId].userAnswer.split(' ');
    var hintAnsArr = $scope.currLevel[$scope.qId].initAnswer.split(' ');
    for (var ctr = userAnsArr.length-1; ctr > -1; ctr--) {
      if (userAnsArr[ctr] != '_'  &&  hintAnsArr[ctr] == '_') {
        userAnsArr[ctr] = '_';
        break;
      }
    }
    $scope.currLevel[$scope.qId].userAnswer = userAnsArr.join(' ');
    $scope.userAnswerDivClass = '';
  }
  $scope.gotoQuestion();
})

;
