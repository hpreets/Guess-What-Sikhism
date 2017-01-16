angular.module('guesswhat.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('QuestionXXX', function() {

	// alert('Inside Question');
/*	var misctuks = [{"Id" : "0", "quesPunj" : "jogu n BgvI kpVI jogu n mYly vyis ] nwnk Gir bYiTAw jogu pweIAY siqgur kY aupdyis ]", "quesEng" : "jog n bhagavee kaparree jog n mailae vaes |", "explPunj" : "hy BweI! (igRhsq iqAwg ky) gyrUey rMg dy k`piVAW nwl jW mYly pihrwvy nwl (prmwqmw dw) imlwp nhIN ho jWdw [ pr, hW, hy nwnk! gurU dy aupdyS dI rwhIN igRhsq ivc rihMidAW hI (prmwqmw nwl) imlwp ho skdw hY [", "explEng" : "Yoga is not obtained by wearing saffron robes; Yoga is not obtained by wearing dirty robes. O Nanak, Yoga is obtained even while sitting in your own home, by following the Teachings of the True Guru.", "page" : "1413", "mahla" : "3", "totalQCnt" : "0"},
{"Id" : "1", "quesPunj" : "sMq sBw kau sdw jYkwru ]", "quesEng" : "santh sabhaa ko sadhaa jaikaar |", "explPunj" : "jYkwru-nmskwr [ (hy BweI!) swD sMgiq A`gy sdw isr invwau", "explEng" : "I salute and applaud the Society of the Saints.", "page" : "183", "mahla" : "5", "totalQCnt" : "0"},
{"Id" : "2", "quesPunj" : "Aink pVdy mih kmwvY ivkwr ] iKn mih pRgt hoih sMswr ]3]", "quesEng" : "anik parradhae mehi kamaavai vikaar | khin mehi pragatt hohi sansaar |", "explPunj" : "(ismrn-hIn mnu`K prmwqmw nUM AMg-sMg nwh jwxdw hoieAw) AnykW pridAW ipCy (lokW qoN lukw ky) ivkwr krm kmWdw hY, pr (aus dy kukrm) jgq dy AMdr iek iKn ivc hI prgt ho jWdy hn [3[", "explEng" : "Hiding behind many screens, they commit acts of corruption, but in an instant, they are revealed to all the world. ||3||", "page" : "194", "mahla" : "5", "totalQCnt" : "0"},
{"Id" : "3", "quesPunj" : "hir jo ikCu kry su hir ikAw Bgqw BwieAw ]", "quesEng" : "har jo kish karae s har kiaa bhagathaa bhaaeiaa |", "explPunj" : "BwieAw-cMgw l`gdw hY [ jo kuJ prmwqmw krdw hY aus dy BgqW nMU auh im`Tw l`gdw hY (qy auh ies qrHW Awqmk suK mwxdy hn) [", "explEng" : "Whatever the Lord does, is pleasing to the Lord's devotee.", "page" : "176", "mahla" : "5", "totalQCnt" : "0"}],

miscques = [{"Id" : "0_0", "wordPunj" : "BgvI", "wordEng" : "bhagavee", "ansEng" : "Saffron", "ansPunj" : "gyrUey rMg", "opAEng" : "Running", "opAPunj" : "Bjxw", "opBEng" : "With devotion", "opBPunj" : "BgqI nwl", "opCEng" : "White", "opCPunj" : "ic~tw", "opDEng" : "Saffron", "opDPunj" : "gyrUey rMg"},
{"Id" : "1_0", "wordPunj" : "sMq sBw", "wordEng" : "santh sabhaa", "ansEng" : "Society of Saints", "ansPunj" : "swD sMgiq", "opAEng" : "Gurduara Singh Sabha", "opAPunj" : "gurduAwrw isMG sBw", "opBEng" : "Society of Saints", "opBPunj" : "swD sMgiq", "opCEng" : "Praise (Sobha)", "opCPunj" : "vifAweI", "opDEng" : "Bhai Sobha Singh", "opDPunj" : "BweI soBw isMG"},
{"Id" : "2_0", "wordPunj" : "pRgt", "wordEng" : "pragatt", "ansEng" : "Revealed", "ansPunj" : "prgt", "opAEng" : "Thoughts", "opAPunj" : "soc", "opBEng" : "Revealed", "opBPunj" : "prgt", "opCEng" : "Act of Corruption", "opCPunj" : "ivkwr", "opDEng" : "Roundabout", "opDPunj" : "gol c~kr"},
{"Id" : "3_0", "wordPunj" : "hir ikAw", "wordEng" : "har kiaa", "ansEng" : "Lord's", "ansPunj" : "prmwqmw dy", "opAEng" : "Lord's", "opAPunj" : "prmwqmw dy", "opBEng" : "What is Lord", "opBPunj" : "prmwqmw kI hY", "opCEng" : "Lord did it", "opCPunj" : "prmwqmw ny kIqw", "opDEng" : "Pleasing", "opDPunj" : "luBwauNdw"}],
*/
	var questions = misctuks,
	options = miscques,
	shabads = null,
	totalquescount = -1,
	currquescount = -1,
	currqid = -1,

	getQuestionById = function (qId, oId, addToCovered) {
		// alert(qId + '--' + oId + '--' + addToCovered);
		var ques = null,
			l = questions.length,
			opt = null,
			i;
		if (qId == null  &&  debugSerialOptions) {
			if (totalquescount != -1) {
				if (currquescount + 1 > totalquescount) {
					totalquescount = -1;
				}
				else {
					currquescount = currquescount + 1;
					ques = questions[currqid];
					opt = getOptionByQuesAndOptId(currqid, currquescount);
					ques.qOpt = opt;
				}
			}
			if (totalquescount == -1) {
				qId = nextRandomIntFromSet();
				// alert(qId);
				currqid = qId;
				ques = questions[qId];
				totalquescount = ques.totalQCnt;
				oId = 0;
				currquescount = oId;
				opt = getOptionByQuesAndOptId(qId, oId);
				ques.qOpt = opt;
			}
		}
		else {
			console.log('1. qId ::' + qId);
			if (isNaN(qId)) { qId = nextRandomIntFromSet(); }
			else { qId = nextRandomIntFromSet(qId); }
			console.log('2. qId :::' + qId);
			console.log('randomIntSet :::' + randomIntSet);
			ques = questions[qId];
			console.log('1. oId :::' + oId);
			if (oId == null) {
				oId = (ques.totalQCnt == "0" ? "0" : Math.floor(Math.random()*(parseInt(ques.totalQCnt)-0+1)+0) );
				console.log('2. oId :::' + oId);
				opt = getOptionByQuesAndOptId(qId, oId);
			}
			else {
				opt = getOptionById(oId);
			}
			ques.qOpt = opt;
		}
		// console.log('ques ::::' + JSON.stringify(ques));
		console.log('ques.shabadId ::::' + ques.shabadId);
		ques.shbd = getShabadById(ques.shabadId);
		console.log('ques.shbd ::::' + ques.shbd);

		if (addToCovered) covered.push(ques);
		return ques;

	},
	getPlainQuestionById = function (qId, oId) {
		// console.log(qId + '--' + oId);
		var ques = null,
			opt = null,

		ques = questions[qId];
		// console.log('ques :::' + ques.quesEng);
		// if (oId == null) oId = qId+'_'+oId;
		oId = qId+'_'+oId;
		opt = getOptionById(oId);
		ques.qOpt = opt;
		// console.log('oId :::' + oId + '\r\n opt :::' + JSON.stringify(opt));

		return ques;

	},
	getOptionById = function (qOptId) {
		var option = null,
			l = options.length,
			i;
		for (i = 0; i < l; i = i + 1) {
			if (options[i].Id == qOptId) {
				option = options[i];
				break;
			}
		}
		return option;
	},
	getOptionByQuesAndOptId = function (qId, optId) {
		return getOptionById(qId+"_"+optId);
	},
	getShabadById = function (shbdId) {
		if (shabads != null) {
			var shabad = null,
				l = shabads.length,
				i;
			for (i = 0; i < l; i = i + 1) {
				if (shabads[i].Id == shbdId) {
					shabad = shabads[i];
					break;
				}
			}
			return shabad;
		}
		return null;
	},
	getAllQuestions = function () {
		var ques = [];
		for (i = 0; i < questions.length; i++) {
			var q = questions[i];
			for (j=0; j<=q.totalQCnt; j++) {
				q.qOpt = getOptionById(q.Id+'_'+j);
				ques.push[q];
			}
		}
		return ques;
	},
	getAllQuestionsOnly = function () {
		return questions;
	},
	getAllOptionsOnly = function () {
		return options;
	},
	total = questions.length,
	max = 10,
	maxRandomIntSetSize = 50,
	randomIntSet = [],
	covered = [],
	success = [],
	refillAt = 20,
	baniType = 'misc',
	debugSerial = false,
	debugSerialOptions = false,
	randomIntNotInSet = function(max, intSet) {
		var rnd = Math.floor(Math.random()*max); // _.random(0, max);
		while (intSet.indexOf(rnd) >= 0) {
			rnd = Math.floor(Math.random()*max); // _.random(0, max);
		}
		return rnd;
	},
	nextRandomIntFromSet = function(startFrom) {
		console.log('Before Populating randomIntSet :::' + randomIntSet + '--- debugSerial :::' + debugSerial);
		if (randomIntSet == null  ||  randomIntSet.length <= refillAt) {
			console.log('Populating randomIntSet :::' + randomIntSet);
			if (debugSerial || debugSerialOptions) { populateSerialIntSet((isNaN(startFrom) || randomIntSet == null) ? 0 : startFrom); }
			else { populateRandomIntSet(); }
			//console.log('Populated randomIntSet :::' + randomIntSet);
		}
		console.log('randomIntSet ::' + randomIntSet);
		var rnd = randomIntSet.pop();
		console.log('rnd :::' + rnd);
		return rnd;
	},
	addScore = function(customQues, selAns) {
		if (customQues.qOpt.ansEng == selAns) {
			success.push(customQues.Id);
			return true;
		}
		return false;
	},
	correctAnswers = function() {
		return success;
	},
	questionsCovered = function() {
		return covered;
	},
	correctAnswersCount = function() {
		return success.length;
	},
	questionsCoveredCount = function() {
		return covered.length;
	},
	maxQuestionsPerQuiz = function() {
		return max;
	},
	areQuestionAskedSerially = function() {
		return debugSerial;
	},
	populateRandomIntSet = function() {
		for (var i = 0; randomIntSet.length < maxRandomIntSetSize; i++) {
			randomIntSet.unshift(randomIntNotInSet(total-1, randomIntSet));
		}
	},
	populateSerialIntSet = function(startFrom) {
		console.log('populateSerialIntSet :::' + startFrom);
		if ((startFrom == null) || (startFrom >= total)) startFrom = 0;
		console.log('startFrom :::' + startFrom + '--- total :::' + total);
		for (var i = startFrom; i < total; i++) {
			randomIntSet.unshift(i);
		}
		console.log('randomIntSet :::' + randomIntSet);
	},
	resetStat = function() {
		covered = [];
		success = [];
	},
	resetQuestionSet = function() {
		randomIntSet = []; // [347,346,343,339,333,329,324,320,315,313,307,304,301,294,292,287,286,284,279,274,271,270,268,265,259,6,29,191,152,241,75]; // [];
	},
	setQuestionSet = function(bani) {
		if (bani == BANI_JAPJI_VALUE) {
			questions = japjituks;
			options = japjiques;
			shabads = japjishbd;
			maxRandomIntSetSize = 100;
		}
		else if (bani == BANI_AKV_VALUE) {
			questions = akvtuks;
			options = akvques;
			shabads = akvshbd;
			maxRandomIntSetSize = 200;
		}
		else if (bani == BANI_SLOKM9_VALUE) {
			questions = slokm9tuks;
			options = slokm9ques;
			shabads = null;
			maxRandomIntSetSize = 50;
		}
		else if (bani == BANI_SLOKKBR_VALUE) {
			questions = slokkbrtuks;
			options = slokkbrques;
			shabads = null;
			maxRandomIntSetSize = 100;
		}
		else if (bani == BANI_SLOKFRD_VALUE) {
			questions = slokfrdtuks;
			options = slokfrdques;
			shabads = slokfrdshbd;
			maxRandomIntSetSize = 100;
		}
		else {
			questions = misctuks;
			options = miscques;
			shabads = null;
			maxRandomIntSetSize = 100;
		}
		if (baniType != bani) {
			total = questions.length;
			resetQuestionSet;
			resetStat;
		}
		baniType = bani;
	};

  return {
    all: function() {
      return null;
    },
                    random: function () {
                        return getQuestionById(null, null, true);
                    },
                    getQuesOnwards: function (qId) {
                    	return getQuestionById(qId, null, true);
                    },
                    getQuesFromId: function (qId) {
                    	return getPlainQuestionById(qId, null);
                    },
                    getQuesFromId: function (qId, oId) {
                    	return getPlainQuestionById(qId, oId);
                    },
                    get: function (qId, oId) {
                    	return getQuestionById(qId, oId, false);
                    },
                    getAllOptions: function () {
                        return getAllOptionsOnly();
                    },
                    getAllQuestions: function () {
                        return getAllQuestionsOnly();
                    },
                    getCoveredQuestions: function () {
                        return questionsCovered();
                    },
                    validate: function (ques, selAns) {
                    	return addScore(ques, selAns);
                    },
                    validateAndGet: function (qId, oId, selAns) {
                    	var ques = getQuestionById(qId, oId, false);
                    	addScore(ques, selAns);
                        return ques;
                    },
                    isComplete: function () {
                        return max == covered.length;
                    },
                    getSuccessList: function () {
                        return correctAnswers();
                    },
                    getQuestionsCovered: function () {
                        return questionsCovered();
                    },
                    reset: function () {
                        return resetStat();
                    },
                    resetQuestions: function () {
                        return resetQuestionSet();
                    },
                    setBani : function(bani) {
                    	setQuestionSet(bani);
                    },
                    getBani : function() {
                    	return baniType;
                    },
                    checkSerially : function() {
						debugSerial = true;
					},
                    isSerial : function() {
						return areQuestionAskedSerially();
					},
                    checkRandomly : function() {
						debugSerial = false;
					},
                    checkSeriallyOptions : function() {
						debugSerialOptions = true;
					},
                    debugGetDebugInfo : function() {
                        /*var debugInfo = new Object();
                        debugInfo.currentRandomIntSetSize = randomIntSet.length;
                        debugInfo.maxRandomIntSetSize = total;
                        debugInfo.correctAnswersCount = correctAnswersCount();
                        debugInfo.questionsCoveredCount = questionsCoveredCount();
                        debugInfo.maxRandomIntSetSize = maxRandomIntSetSize;
                        debugInfo.refillAt = refillAt;
                        debugInfo.baniType = baniType;
                        debugInfo.randomIntSet = randomIntSet;
                        console.log('Completed creating debugInfo :::'+_.pairs(debugInfo));
                    	// return debugInfo;*/
                        return '';
                    },
					scoreText: function () {
						return '' + correctAnswers().length + '/' + questionsCovered().length;
					},
					quesCounterText: function () {
						return '' + questionsCovered().length + '/' + maxQuestionsPerQuiz();
					},
					success: function () {
						return correctAnswers().length;
					},
					covered: function () {
						return questionsCovered().length;
					},
					max: function () {
						return maxQuestionsPerQuiz();
					},
					feedback: function () {
						var percent = (correctAnswers().length*100/max);
						if (percent == 100) return "Excellent, keep it up.";
						else if (percent > 80) return "Good, keep practicing";
						else return "You need to practice more";
					},
  }
})

.factory('$localstorage', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    },
    getLearnMode: function(defaultValue) {
      return $window.localStorage[LSVAR_IS_LEARN_MODE] || defaultValue;
    },
  }
})

.service('CommonUtils', [function() {

	getText = function(textValueArray, value) {
		for (var i = 0; i < textValueArray.length; i++) {
			if (value == textValueArray[i].value) return textValueArray[i].text;
		}
		return '';
	}

	getValue = function(textValueArray, text) {
		for (var i = 0; i < textValueArray.length; i++) {
			if (text == textValueArray[i].text) return textValueArray[i].value;
		}
		return '';
	}

	// Check WHY DO I HAVE TO DEFINE RETURN BLOCK SEPARATELY?
 	return {
	    getText : function(textValueArray, value) {
	      return getText(textValueArray, value);
	    },
	    getValue : function(textValueArray, text) {
	      return getValue(textValueArray, text);
	    }
	}
}])

.factory('BaniTopics', function() {
  return {
    getBaniTopics: function() {
      return BANI_TOPICS;
    }
  }
})

/*.factory("MediaService", ["$q", "$ionicPlatform", "$window", function(e, t, n) {
    function o(o) {
        var r = e.defer();
        return t.ready(function() {
            function e() {
                i.stop(), i.release()
            }
            t.is("android") && (o = "/android_asset/www/" + o), i = new n.Media(o, e), r.resolve(i)
        }), r.promise
    }
    var i = null,
        r = {
            loadMedia: o
        };
    return r
}])
.factory("MediaService", function($q, $ionicPlatform, $window) {
    function o(o) {
        var r = $q.defer();
        return $ionicPlatform.ready(function() {
            function e() {
                i.stop(), i.release()
            }
            $ionicPlatform.is("android") && (o = "/android_asset/www/" + o), i = new $window.Media(o, $q), r.resolve(i)
        }), r.promise
    }
    var i = null,
        r = {
            loadMedia: o
        };
    return r
})*/

.factory('LocalStorage', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    },
    getCurrentLevel: function() {
      return Number($window.localStorage['CurrentLevel']) || 0;
    },
	setCurrentLevel: function(value) {
      return $window.localStorage['CurrentLevel'] = Number(value);
    },
	getCurrentLevelQuesIdx: function() {
      return Number($window.localStorage['CurrentLevelQues']) || 0;
    },
	setCurrentLevelQuesIdx: function(value) {
      return $window.localStorage['CurrentLevelQues'] = Number(value);
    },
	getRemainingCoins: function() {
      return ($window.localStorage['RemainingCoins'] != null) ? Number($window.localStorage['RemainingCoins']) : DEFAULT_REMAINING_COINS;
    },
	setRemainingCoins: function(value) {
      return $window.localStorage['RemainingCoins'] = Number(value);
    },
  }
})

;
