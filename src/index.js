import Game from './game.js'
import { PATTERN_MAP } from './inputs_patterns.js';
import { transpose } from './util.js';

const startingPattern = transpose(PATTERN_MAP['conway']);

const { x, y } = {
  x: startingPattern[0].length,
  y: startingPattern.length
}

const game = new Game(x,y,document.getElementById('board'),startingPattern);

const start = document.getElementById('start');
const stop = document.getElementById('stop');
start.addEventListener('click', e => {
  start.disabled = true;
  stop.disabled = false;
  game.run();
})

stop.addEventListener('click', e => {
  stop.disabled = true;
  start.disabled = false;
  game.stop();
});

document.getElementById('one-step').addEventListener('click', e => {
  if (game.running) {
    game.stop();
    game.runRound();
    game.renderScrollX();
    game.run();
  } else {
    game.runRound();
    game.renderScrollX();
  }
});

document.getElementById('clear').addEventListener('click', e => {
  game.stop();
  game.clearBoard();
})

document.getElementById('export').addEventListener('click', e => {
  navigator.clipboard.writeText(
    JSON.stringify(
      transpose(transpose(transpose(game.board.map(r => r.map(s => s ? 1 : 0)))))
    )
  ).then(() => alert("Pattern copied to clipboard as JSON"));
});

const speed = document.getElementById('speed');

speed.addEventListener('change', e => {
  game.changeSpeed(1500 - e.target.value);
});

const patternSelect = document.getElementById('pattern-select');
patternSelect.addEventListener('change', e => {
  start.disabled = false;
  stop.disabled = true;
  const pattern = transpose(PATTERN_MAP[e.target.value]);
  game.switchPatterns(pattern);
});