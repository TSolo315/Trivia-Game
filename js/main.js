'use strict'

class QuestionCard {
  constructor(question, answer1, answer2, answer3, answer4, correctAnswer) {
    this.question = question;
    this.answer1 = answer1;
    this.answer2 = answer2;
    this.answer3 = answer3;
    this.answer4 = answer4;
    this.correctAnswer = correctAnswer;
  }
}

const $cardDeck = $(".cards"),
      $answers = $(".answers"),
      $score = $("#score"),
      $overlay = $(".overlay"),
      $categories = $(".category-selection");

var $cards,
    $current,
    $next;

const quizSession = {
  score : 0,
  progress: 0,
  nextCorrect: 0,
  reset: function() {
    quizSession.score = 0;
    quizSession.progress = 0;
    quizSession.nextCorrect = 0;
  }
}

const triviaQuestions = {
  Music : [["In 2000, which artist(s) tied Michael Jackson's 1984 record of winning eight Grammys in a single year?", "Santana", "Destiny's Child", "Creed", "Whitney Houston", 1], ["Who invented the solid body electric guitar?", "Orville Gibson", "Les Paul", "Clarence Leonidas Fender", "Bob Taylor", 2],["Jim Morrison was the lead singer of which prominent 1960's rock band?", "The Rolling Stones", "The Who", "Led Zeppelin", "The Doors", 4],["Who was the lead singer of the band Queen?", "Roger Daltrey", "Robert Plant", "Freddie Mercury", "Brian Wilson", 3], ["Lady Gaga derived her stage name from a song performed by which legendary band?", "Led Zeppelin", "Nirvana", "Oasis", "Queen", 4],["International music sensation ABBA originate from which European country?", "Denmark", "England", "Norway", "Sweden", 4],["Michael Jackson's Thriller was produced by which iconic music producer?", "Quincy Jones", "Robert John Lange", "Nile Rodgers", "Rick Rubin", 1],["What American singer-songwriter wrote and first recorded the song 'Blue Suede Shoes' in 1955?", "Elvis", "Ray Charles", "Carl Perkins", "Billie Holiday", 3],["The Redlands drug bust was a famous 1960's incident involving which band?", "Aerosmith", "The Rolling Stones", "Guns and Roses", "Led Zeppelin", 2],["What was the highest selling album of the 1980's?", "Thriller - Michael Jackson", "The Joshua Tree - U2", "Back in Black - AC/DC", "Graceland - Paul Simon", 1],["Which artist(s) did US President George W. Bush once call 'the biggest threat to American youth since polio'?", "Snoop Dog", "Wu-Tang Clan", "Eminem", "Jay-Z", 3],["What was Elvis Presley's first U.S. number one hit single on the Billboard Hot 100 charts?", "Love Me Tender", "Heartbreak Hotel", "Hound Dog", "Don't Be Cruel", 2],["What female vocalist sang the song '1- 2 - Step'?", "Ciara", "Beyonce", "Alicia Keys", "Aaliyah", 1],["Which band released the song, 'Hey There Delilah'?", "Justin Timberlake", "The Fray", "Maroon 5", "Plain White T's", 4],["Who was the first female artist in history to have four consecutive singles from one album reach the top-5 in the Billboard Hot 100?", "Beyonce", "Rihanna", "Cyndi Lauper", "Aretha Franklin", 3],["Which famous American musician was fatally shot by his father on April 1, 1984?", "Keith Godchaux", "Marvin Gaye", "John Bonham", "John Lennon", 2],["What musician won the Nobel Prize for Literature in 2016?", "Paul Simon", "Leonard Cohen", "Sufjan Stevens", "Bob Dylan", 4],["What was the first music video played on MTV?", "Video Killed the Radio Star", "Rockin' the Paradise", "Tusk", "Do You Remember Rock 'n' Roll Radio?", 1],["Which of the following songstresses was a member of The Mickey Mouse Club early in her career?", "Christina Aguilera", "Madonna", "Miley Cyrus", "Britney Spears", 4], ["Guitarist George Harrison was a member of which influential rock group?", "The Beach Boys", "The Who", "The Beatles", "Guns N' Roses", 3],["Which famous music group were formerly known as the New Yardbirds?", "The Beach Boys", "The Killers", "Led Zeppelin", "3 Doors Down", 3]],
  Animals : [["Which of these male animals is one of the few venomous mammals?", "Odd toed ungulates", "Duck Billed Platypus", "Baird tapir", "Hairy Nose Wombat", 2],["Which of these animals is the 'greater short-tailed bat' defenseless against leading to their near-extinction?", "Hawk", "Owl", "Rat", "Snake", 3],["In what location does the Baiji Dolphin reside?", "Madagascar", "United States", "China", "Brazil", 3], ["The Mountain Pygmy Possum of southeast Australia have declined the MOST due to?", "Climate change", "Reduction of the Bogong Moth", "Introduction of ski slopes", "Feral cats", 3],["What is the only mammal that injects pray with venom through special grooves in their teeth?", "Solenodon", "Hedgehog", "Platypus", "Skunk", 1], ["How is the Riverine Rabbit most different from other rabbits?", "Diet", "Predators", "Physical Characteristics", "Breeding Methods", 4],["What is bringing about the decline of the Sumatran Rhinoceros", "Habitat Destruction", "Pollution", "Poaching", "Predators", 3],["Which adaptation is unique to the Bactrian Camel?", "Extra Hump", "Squishy footpads", "Longer, narrower tongue", "Longer Legs", 2], ["The Javan Rhinoceros are poached for their horn, which is made out of?", "Ivory", "Keratin", "Cementum", "Chitin", 2], ["Slow Lorises are the only venomous primate that?", "Injects venom through teeth", "Sprays venom through anal glands", "Injects venom through glands in their claws", "Secretes toxin from a gland along their inner arm", 4], ["Which of these is the most venomous?", "Jararaca Viper", "Inland Taipan", "Black Mamba", "Cottonmouth", 2],["What fish hunts by luring prey using a fleshy growth on its head?", "Fangtooth", "Pacific Barreleye", "Anglerfish", "Candiru", 3],["Where is the heart of a shrimp located?", "Tail", "Head", "Stomach", "Abdomen", 2],["Which of these is the biggest shark?", "Whale Shark", "Great White", "Hammerhead", "Wobbegong", 1],["Where is the Goliath Bird Eating Spider located?", "Northern South American", "Australia", "East Asia", "Southern Africa", 1],["What is the biggest Mammal?", "Elephant", "Hippotomous", "Orca Whale", "Blue Whale", 4],["What is the only animal that can't have all four of its feet off the ground at once?", "Giraffe", "Rhynoceros", "Hippopotomous", "Elephant", 4], ["Which animal is resistant to the heat of chile peppers?", "Gorilla", "Goat", "Bird", "Rabbit", 3],["Which of these animals has four noses?", "Snake", "Crab", "Slug", "Butterfly", 3], ["Which of these animals can sleep for three years?", "Snail", "Sloth", "Brown Bear", "Gecko", 1], ["What is the most common source of silk?", "Mulvery Silkworm", "Sheet-web Weaver Spider", "Synthetic Proccessing", "Raspy Cricket", 1],["Which of these animals lives the longest?", "Bowhead Whale", "Greenland Shark", "African Elephant", "Macaw", 2]],
  Food : [["Betamax is made of what primary ingredient?", "Liver", "Cheese", "Chicken Blood", "Fish Guts", 3], ["What is Scotland's national dish?", "Neeps and Tatties", "Haggis", "Scottish Tablet", "Bangers and Mash", 2], ["Which Ethiopian specialty dish's recipe has only a single instruction: 'q'wirt'?", "Wat", "Injera", "Tere Siga", "Shiro be Kibbe", 3], ["Shirasu is made up of what main ingredient served a-top a giant bowl of rice?", "Baby Sardines", "Tempura", "Chicken Hearts", "Kelp Stock", 1], ["Menudo, cooked in a spicy, red chili pepper-based broth uses what main meat ingredient?", "Pork", "Chicken", "Tripe", "Venison", 3], ["What American delicacy was originally popularized during the American Civil War?", "Peas Pudding", "Corned Beef and Cabbage", "Boiled Pork and Bean Soup", "Liver Mush", 4], ["What is Iceland's national dish 'Hakarl' primarily made from?", "Shark", "Lamb", "Sheep Heart", "Eel", 1], ["What animal does the high protein, low fat meat known as cuy come from?", "Pheasant", "Guinea Pig", "Ostrich", "Otter", 2], ["Salo’s main ingredient is?", "Sheep Blood", "Blue Cheese", "Pickled Raddish", "Pork Fat", 4], ["What country serves Grey Squirrel Pie?", "Ukraine", "Great Britain", "France", "Russia", 2], ["What is the state dessert of Arizona?", "Lane Cake", "Strawberry Pie", "Angelfood Cake", "Devil's Blood Cake", 1], ["In what US state was the cheeseburger invented?", "California", "Deleware", "New York", "Colorado", 4], ["What is the national dish of Germany?", "Lentil Soup", "Pot Roast", "Spiced Lamb", "Beef Bourguignon", 2], ["What originally Indian dish is the national dish of England?", "Chicken Tikka Masala", "Rogan Josh", "Tandoori Chicken", "Biryani", 1], ["What is the main ingredient of mince-pie", "Suet", "Carrot", "Lamb", "Dried Fruit", 4], ["What is the only US state in which coffee beans are grown?", "California", "New Mexico", "Hawaii", "Florida", 3], ["What desert is illegal to sell in Newark after 6 p.m. without a doctor's note?", "Cheesecake", "Ice Cream", "Brownies", "Meringue", 2], ["What is the national dish of Italy?", "Ragu alla Bolognese", "Lasagne", "Arancini", "Ossubuco", 1], ["Which date do American's celebrate National Sandwhich day?", "November 20", "July 17", "May 9", "November 3", 4], ["Which food was rationed after WW2 but not during the war?", "Bananas", "Beef", "Bread", "Sugar", 3], ["Which American invented condensed milk?", "John Oliven", "Gail Borden, Jr.", "Richard Montogue", "David Benneth", 2], ["On what occasion is Pumpkin Pie most commonly prepared in the United States and Canada?", "Christmas", "Fourth of July", "New Years", "Thanksgiving", 4], ["Canola is an abbreviation for what?", "Canned Oil", "Castor Oil", "Canadian Oil", "Candied Oil", 3], ["Who invented Coca-Cola?", "John Pemberton", "Jason Pintz", "Dr. Allen Sontz", "Larrel Jacobs", 1], ["The 'Spanish Tortilla' an an alternate name for what dish?", "Spanish Omelet", "Spanish Enchilada", "Lasagne", "Arancini", 1], ["Sweet egg tarts originated from which country?", "Spain", "Russia", "Ireland", "Portugal", 4], ["What was the first soda (pop) manufactured in America?", "Barq's Root Beer", "Dr. Pepper", "Vernor's Ginger Ale", "Moxie", 3]],
  Sports : [["Which is the only American Football team to go a whole season undefeated, including the Super Bowl?", "Miami Dolphins", "New England Patriots", "Buffalo Bills", "Dallas Cowboys", 1], ["How many NBA championships did Michael Jordan win with the Chicago Bulls?", "Four", "Seven", "Six", "Three", 3], ["Which is the only team to play in every soccer World Cup tournament?", "England", "Portugal", "Spain", "Brazil", 4], ["Raging Bull, the classic 1980 movie is about which real life boxer?", "Muhammad Ali", "Jake LaMotta", "Mike Tyson", "Joe Louis", 2], ["At the 1976 Olympic Games, which gymnast became the first to score a perfect 10?", "Nadia Comaneci", "Maria Filatova", "Mariana Constantin", "Nellie Kim", 1], ["Which American Football team won the first two Super Bowls?", "Buffalo Bills", "Dallas Cowboys", "Green Bay Packers", "Seattle Seahawks", 3], ["By what name is soccer player Edson Arantes do Nascimento better known by?", "Pele", "Ronaldo", "Moracini", "Adu", 1], ["Which racing driver holds the record for the most Formula One World Drivers' Championship wins, with seven titles?", "Phil Hill", "Niki Lauda", "Lewis Hamilton", "Michael Schumacher", 4], ["Which NFL team appeared in four consecutive Super Bowls from 1991 - 1994 and lost them all?", "Pittsburgh Steelers", "Buffalo Bills", "Miami Dolphins", "Chicago Bears", 2], ["Which boxer inflicted Muhammad Ali's first defeat in professional boxing?", "Joe Frazier", "Larry Holmes", "Ken Norton", "Leon Spinks", 1], ["Which country won the first ever soccer World Cup in 1930?", "Spain", "Uruguay", "Brazil", "England", 2], ["Which Australian tennis player is the only player to complete the Grand Slam on two occasions?", "John McEnroe", "Roger Federer", "Rafael Nadal", "Rod Laver", 4], ["Which country has produced the most Formula One World Championship winning drivers?", "United States", "Spain", "United Kingdom", "Norway", 3], ["What Chicago Bears running back was known as 'The Galloping Ghost?'", "Harold Grange", "Walter Payton", "Gale Sayers", "Jim Brown", 1], ["What pitcher holds the record for most complete games in an MLB career?", "Nolan Ryan", "Don Sutton", "Roy Halladay", "CY Young", 4], ["What NFL player returned a fumble 66 yards... to the wrong end zone?", "Jim Marshall", "Leon Lett", "Deion Sanders", "Deltha O'Neal", 1], ["Who is the most decorated Olympian of all time?", "Carl Lewis", "Paavo Nurmi", "Mary Lou Retton", "Michael Phelps", 4], ["What MLB player retired with the same number of home runs as his father?", "Terry Francona", "Roberto Alomar", "Cal Ripken JR.", "Prince Fielder", 4], ["What is the only country to have won medals in the Winter Olympics but not the Summer Olympics?", "Liechtenstein", "Jamaica", "Estonia", "Azerbaijan", 1], ["What was the first sport televised in the U.S.?", "Golf", "Rugby", "Tennis", "Baseball", 4], ["Who was the only college football player to win the Heisman Trophy twice?", "Archie Griffin", "Jay Berwanger", "Earl Campbell", "O.J. Simpson", 1], ["What sport is the most common cause of eye injuries in the U.S.?", "Darts", "Baseball", "Fencing", "Football", 2], ["What pitcher threw the only no-hit game in World Series history?", "Roger Clemens", "Nolan Ryan", "Sandy Koufax", "Don Larsen", 4], ["Who was Muhammad Ali's opponent in the Rumble in the Jungle?", "George Foreman", "Ken Norton", "Joe Frazier", "Trevor Berbick", 1], ["In golf, what do you call a score of 4 under par on any given hole?", "A vulture", "A Condor", "An Eagle", "A Pelican", 2], ["In Badminton, what is a 'balk'?", "The object players hit", "A violation of playing rules", "Fast shot than can not be returned", "A feint during service", 4], ["What was the most points scored by one team in a football game?", "117", "222", "85", "149", 2], ["Whose ear did Mike Tyson bite off during a 1997 boxing match?", "Lennox Lewis", "Buster Douglas", "Michael Spinks", "Evander Holyfield", 4], ["What was Joe DiMaggio's nickname?", "The Yankee Clipper", "The Iron Horse", "The Great Bambino", "The Sultan Of Swat", 1]]
}

const trivial = {
  createQuestionDeck: function(category) {
    let questionDeck = [];
    let shuffled = [...triviaQuestions[category]].sort(() => 0.5 - Math.random());
    let selected = shuffled.slice(0, 20);
    selected.forEach(question => {
      var questionCard = new QuestionCard(question[0], question[1], question[2], question[3], question[4], question[5]);
      questionDeck.push(questionCard);
    });
    return questionDeck;
  },

  populateQuestions: function(deck, category) {
    deck.forEach((question, index) => {
      if (index === 0) {
        var cardCount = "<li class='card card--current'><h1>";
      } else if (index === 1) {
          var cardCount = "<li class='card card--next'><h1>";
      }
        else if (index === (deck.length - 1)) {
          var cardCount = "<li class='card card--out'><h1>";
      } else {
          var cardCount = "<li class='card'><h1>";
      }
      let cardContent = cardCount + category + "</h1><p>" + question.question + "</p></li>";
      $cardDeck.append(cardContent);
    });
  },

  populateAnswers: function(deck) {
    let question = deck[quizSession.progress]
    quizSession.nextCorrect = question.correctAnswer;
    let answer1 = "<li class='answer flex-container-center-row flex-align-center new-hidden' data-answer-number='1'>" + question.answer1 + "</li>";
    let answer2 = "<li class='answer flex-container-center-row flex-align-center new-hidden' data-answer-number='2'>" + question.answer2 + "</li>";
    let answer3 = "<li class='answer flex-container-center-row flex-align-center new-hidden' data-answer-number='3'>" + question.answer3 + "</li>";
    let answer4 = "<li class='answer flex-container-center-row flex-align-center new-hidden' data-answer-number='4'>" + question.answer4 + "</li>";
    $answers.append(answer1).append(answer2).append(answer3).append(answer4);
    setTimeout(function(){ $answers.children().removeClass("new-hidden"); }, 100);
    $answers.on("click", event => {
      let $target = $(event.target);
      if (!$target.hasClass("answer")) {
        return;
      }
      if (parseInt($target.data("answer-number")) === quizSession.nextCorrect) { // If correct
        quizSession.score += 1;
        $target.addClass("answer-success");
        $answers.off("click");
        $score.text("Score: " + quizSession.score);
        setTimeout(function(){ trivial.progressQuiz(deck) }, 1500);
      }
      else { // else if incorrect
        let ActualCorrectAnswer = "data-answer-number='" + quizSession.nextCorrect + "'";
        $(".answer[" + ActualCorrectAnswer + "]").addClass("actual-correct-answer");
        $target.addClass("answer-failure");
        $answers.off("click");
        setTimeout(function(){ trivial.progressQuiz(deck) }, 1500);
      }
    });
  },

  startQuiz: function(category) {
    $categories.toggle();
    let questionDeck = trivial.createQuestionDeck(category);
    trivial.populateQuestions(questionDeck, category);
    trivial.populateAnswers(questionDeck);
    $cards = $cardDeck.find(".card"); // selects all cards in unordered list cards
    $current = $cards.filter(".card--current"); // sets var current to card with card-current class
    $(".scoreboard").removeClass("hidden");
  },

  progressQuiz: function(deck) {
    quizSession.progress += 1;

    if (quizSession.progress > 19) {
      trivial.endQuiz();
      return;
    }

    $answers.empty();
    let $nextCard = $(".card--next");
    $cards.removeClass("card--current card--out card--next"); //remove all these classes
    $current.addClass("card--out"); // add card-out class to current card
    $current = $nextCard.addClass("card--current"); //set current to next card and add class card--current
    $next = $current.next(); // set next to card after current card
    $next = $next.length ? $next : $cards.first(); // if next has length keep it the same, else set it to the first card (check if last card?)
    $next.addClass("card--next"); //add card--next class to next card
    trivial.populateAnswers(deck);
  },

  endQuiz: function() {
    let quizAccuracy = (quizSession.score / 20) * 100;
    let quickGrade = "";
    if (quizSession.score > 17) {
      quickGrade = "A";
    } else if (quizSession.score >= 15) {
      quickGrade = "B";
    } else if (quizSession.score >= 10) {
      quickGrade = "C";
    } else if (quizSession.score >= 6) {
      quickGrade = "D";
    } else {
      quickGrade = "F";
    }
    let $modal = $overlay.children(".modal");
    $modal.children("#quiz-score").text("Score: " + parseInt(quizSession.score));
    $modal.children("#quiz-accuracy").text("Accuracy: " + parseInt(quizAccuracy) + "%");
    $modal.children("#quiz-grade").text("Grade: " + quickGrade);
    $overlay.addClass('open');
    quizSession.reset();
  },

  onStart: function() {
    $categories.on("click", event => {
      event.preventDefault();
      let $target = $(event.target);
      if (!$target.hasClass("grad-button")) {
        return;
      }
      var category = $target.data("category");
      $categories.off("click");
      trivial.startQuiz(category);
    })
  }
}


$("#play-again").on("click", event => {
  event.preventDefault();
  $cardDeck.empty();
  $answers.empty();
  $score.text("Score: 0");
  $(".scoreboard").addClass("hidden");
  $categories.toggle();
  $overlay.removeClass('open');
  trivial.onStart();
})

$(trivial.onStart);