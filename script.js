let overlay = document.querySelector('.overlay'),
    modal = document.querySelector('.modal'),
    speed = 0;

    modal.addEventListener('click', (e) => {
      if (e.target.classList.contains('easy')) {
        speed = 1000;
      } else if (e.target.classList.contains('normal')) {
        speed = 500;
      } else if (e.target.classList.contains('hard')){
        speed = 300;
      }
      if(e.target.classList.contains('button')) {
        modal.style.display = 'none';
        overlay.style.display = 'none';
        startGame();
      }
    })

function startGame() {

  let tetris = document.createElement('div');
  tetris.classList.add('tetris');

  for (let i = 1; i < 181; i++) {
    let excel = document.createElement('div');
    excel.classList.add('excel');
    tetris.append(excel);
  }

  let main = document.querySelector('.main');
  main.append(tetris);

  let excel = document.querySelectorAll('.excel');
  let i = 0;
  for (let y = 18; y > 0; y--) {
    for(let x =1; x < 11; x++) {
      excel[i].setAttribute('posX', x);
      excel[i].setAttribute('posY', y);
      i++;
    }
  }

  let x = 5, //location of the first figures
      y = 15;

  let mainArr=[[[0,1],[0,2],[0,3],[[-1,1],[0,0],[1,-1],[2,-2]],[[1,-1],[0,0],[-1,1],[-2,2]],[[-1,1],[0,0],[1,-1],[2,-2]],[[1,-1],[0,0],[-1,1],[-2,2]]],[[1,0],[0,1],[1,1],[[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0]]],[[1,0],[0,1],[0,2],[[0,0],[-1,1],[1,0],[2,-1]],[[1,-1],[1,-1],[-1,0],[-1,0]],[[-1,0],[0,-1],[2,-2],[1,-1]],[[0,-1],[0,-1],[-2,0],[-2,0]]],[[1,0],[1,1],[1,2],[[0,0],[0,0],[1,-1],[-1,-1]],[[0,-1],[-1,0],[-2,1],[1,0]],[[2,0],[0,0],[1,-1],[1,-1]],[[-2,0],[1,-1],[0,0],[-1,1]]],[[1,0],[-1,1],[0,1],[[0,-1],[-1,0],[2,-1],[1,0]],[[0,0],[1,-1],[-2,0],[-1,-1]],[[0,-1],[-1,0],[2,-1],[1,0]],[[0,0],[1,-1],[-2,0],[-1,-1]]],[[1,0],[1,1],[2,1],[[2,-1],[0,0],[1,-1],[-1,0]],[[-2,0],[0,-1],[-1,0],[1,-1]],[[2,-1],[0,0],[1,-1],[-1,0]],[[-2,0],[0,-1],[-1,0],[1,-1]]],[[1,0],[2,0],[1,1],[[1,-1],[0,0],[0,0],[0,0]],[[0,0],[-1,0],[-1,0],[1,-1]],[[1,-1],[1,-1],[1,-1],[0,0]],[[-2,0],[0,-1],[0,-1],[-1,-1]]]];

  let currentFigure = 0,
      figureBody = 0,
      rotate = 1;

  function create() {
    function getRandom() {
      return Math.round(Math.random() * (mainArr.length - 1));
    }
    rotate = 1;
    currentFigure = getRandom();

    figureBody = [
      document.querySelector(`[posX = '${x}'][posY = '${y}']`),//the first element of the figure,
      document.querySelector(`[posX = '${x + mainArr[currentFigure][0][0]}'][posY = '${y + mainArr[currentFigure][0][1]}']`),
      document.querySelector(`[posX = '${x + mainArr[currentFigure][1][0]}'][posY = '${y + mainArr[currentFigure][1][1]}']`),
      document.querySelector(`[posX = '${x + mainArr[currentFigure][2][0]}'][posY = '${y + mainArr[currentFigure][2][1]}']`),
    ];

    for (let i = 0; i < figureBody.length; i++) {
      figureBody[i].classList.add('figure');
    }
  }

  create();
 
  function move(){
    let moveFlag = true;
    let coordinates = [
      [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')],
      [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')],
      [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')],
      [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')],
    ];

    for (let i = 0; i < coordinates.length; i++) {
      if (coordinates[i][1] == 1 || document.querySelector(`[posX = "${coordinates[i][0]}"][posY = "${coordinates[i][1]-1}"]`).classList.contains('set')) {
        moveFlag = false;//figures are stopping at the bottom
        break;
      }
    }
    if (moveFlag) {
      for (let i = 0; i < figureBody.length; i++) {
        figureBody[i].classList.remove('figure');
      }

      figureBody = [
        document.querySelector(`[posX = "${coordinates[0][0]}"][posY = "${coordinates[0][1] - 1}"]`),
        document.querySelector(`[posX = "${coordinates[1][0]}"][posY = "${coordinates[1][1] - 1}"]`),
        document.querySelector(`[posX = "${coordinates[2][0]}"][posY = "${coordinates[2][1] - 1}"]`),
        document.querySelector(`[posX = "${coordinates[3][0]}"][posY = "${coordinates[3][1] - 1}"]`),
      ];

      for (let i = 0; i < figureBody.length; i++) {
        figureBody[i].classList.add('figure');
      }

    } else {
      for (let i = 0; i < figureBody.length; i++) {
        figureBody[i].classList.remove('figure');
        figureBody[i].classList.add('set');
      }

      for (let i = 1; i < 15; i++) {
        let count = 0;
        for (let k = 1; k < 11; k++) {
          if (document.querySelector(`[posX = "${k}"][posY = "${i}"]`).classList.contains('set')) {
            count++;
            if (count == 10) {
              score += 10;
              input.value = `Your score: ${score}`;
              for (let m = 1; m < 11; m++) {
                document.querySelector(`[posX = "${m}"][posY = "${i}"]`).classList.remove('set');
              }
              let set = document.querySelectorAll('.set');
              let newSet = [];
              for (let s = 0; s < set.length; s++) {
                let setCoordinates = [set[s].getAttribute('posX'), set[s].getAttribute('posY')];
                if (setCoordinates[1] > i) {
                  set[s].classList.remove('set');
                  newSet.push(document.querySelector(`[posX = "${setCoordinates[0]}"][posY = "${setCoordinates[1] - 1}"]`));
                }
              }
              for (let a = 0; a < newSet.length; a++) {
                newSet[a].classList.add('set');
              }
              i--;
            }
          }
        }
      }

      for (let n = 1; n < 11; n++) {
        if (document.querySelector(`[posX = "${n}"][posY = "${15}"]`).classList.contains('set')) {
          clearInterval(interval);
          alert(`game over. your score: ${score}`);
          break;
        }
      }
      create();
    }
  }

  let score = 0;
  let input = document.querySelector('input');
  input.value = `Your score: ${score}`;


  let interval = setInterval(() => {
    move();
  }, 300);

  let flag = true;

  window.addEventListener('keydown', (e) => {
    let coordinates1 = [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')];
    let coordinates2 = [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')];
    let coordinates3 = [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')];
    let coordinates4 = [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')];
  
    //moving the figure on the 'x' or 'y'axis 
    //parametr a - is +1 or -1 - depends on what keyboard key has been pushed
    function getNewState(a) {
      let flag = true;
      let figureNew = [
        document.querySelector(`[posX = "${+coordinates1[0] + a}"][posY = "${coordinates1[1]}"]`),
        document.querySelector(`[posX = "${+coordinates2[0] + a}"][posY = "${coordinates2[1]}"]`),
        document.querySelector(`[posX = "${+coordinates3[0] + a}"][posY = "${coordinates3[1]}"]`),
        document.querySelector(`[posX = "${+coordinates4[0] + a}"][posY = "${coordinates4[1]}"]`),
      ];

      
      for (let i = 0; i < figureNew.length; i++) {
        if (!figureNew[i] || figureNew[i].classList.contains('set')) {
          flag = false;
        }
      }

      if (flag == true) {
        for (let i = 0; i < figureBody.length; i++) {
          figureBody[i].classList.remove('figure');
        }
      
        figureBody = figureNew;

        for (let i = 0; i < figureBody.length; i++) {
          figureBody[i].classList.add('figure');
        }
      }
    }

    if (e.code == 'ArrowLeft') {
      getNewState(-1);
    } else if (e.code == 'ArrowRight') {
      getNewState(1);
    } else if (e.code == 'ArrowDown') {
      move();
    } else if (e.code == 'ArrowUp') {
      //console.log('QQQQQQQQQQQQQ');
      flag = true;

      let figureNew = [
        document.querySelector(`[posX = "${+coordinates1[0] + mainArr[currentFigure][rotate + 2][0][0]}"][posY = "${+coordinates1[1] + mainArr[currentFigure][rotate + 2][0][1]}"]`),
        document.querySelector(`[posX = "${+coordinates2[0] + mainArr[currentFigure][rotate + 2][1][0]}"][posY = "${+coordinates2[1] + mainArr[currentFigure][rotate + 2][1][1]}"]`),
        document.querySelector(`[posX = "${+coordinates3[0] + mainArr[currentFigure][rotate + 2][2][0]}"][posY = "${+coordinates3[1] + mainArr[currentFigure][rotate + 2][2][1]}"]`),
        document.querySelector(`[posX = "${+coordinates4[0] + mainArr[currentFigure][rotate + 2][3][0]}"][posY = "${+coordinates4[1] + mainArr[currentFigure][rotate + 2][3][1]}"]`)
      ];

      for (let i = 0; i < figureNew.length; i++) {
        if (!figureNew[i] || figureNew[i].classList.contains('set')) {
          flag = false;
        }
      }

      if (flag == true) {
        for (let i = 0; i < figureBody.length; i++) {
          figureBody[i].classList.remove('figure');
        }
      
        figureBody = figureNew;

        for (let i = 0; i < figureBody.length; i++) {
          figureBody[i].classList.add('figure');
        }

        if (rotate < 4) {
          rotate++;
        } else {
          rotate = 1;
        }
      } 
    }
  })

}



