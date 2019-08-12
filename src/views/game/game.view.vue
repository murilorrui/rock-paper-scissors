<template lang="pug">
  .game
    v-card
      v-card-text
        v-layout(row wrap justify-center align-center)
          v-flex.pa-2.text-center(xs12)
            p ROCK PAPER SCISSORS
          v-flex.xs12.text-center(v-if="loading")
            v-progress-circular(
              indeterminate
              size="100"
              :value="loading"
              color="light-blue"
              )
          v-flex.xs12.pa-2(v-if="invalidGame")
            span Houve algum problema tente novamente.
          v-flex.xs12.pa-2(
            v-for="(game, index) in games"
            v-if="!endGame"
            )
            p.mb-0 {{index+1}} jogo -
            template(v-for="player in game")
              span.mr-3 Jogador - {{player[0]}}
              span.mr-3 Jogada - {{player[1]}}
          v-flex.xs12.pa-2(v-else-if="!invalidGame")
            h1.text-center
              | Vencedor {{restantGames[0]}}
          v-btn.primary(v-if="!endGame" @click="rps_game_winnner()") Jogar
          v-btn.primary(v-if="invalidGame || endGame" @click="restart()") Jogar novamente
</template>

<script>
export default {
  data: () => ({
    strategies: ['R', 'S', 'P'],
    key: [
      [
        [ ['Armando', 'P'], ['Dave', 'S'] ],
        [ ['Richard', 'R'], ['Michael', 'S'] ],
      ],
      [
        [ ['Allen', 'S'], ['Omer', 'P'] ],
        [ ['David E.', 'R'], ['Richard X.', 'P'] ],
      ],
    ],
    numberOfPlayers: 0,
    round: 1,
    restantGames: [],
    rockLose: ['P'],
    paperLose: ['S'],
    scissorsLose: ['R'],
    games: [],
    loading: false,
    endGame: false,
    invalidGame: false,
  }),
  methods: {
    configGame() {
      this.key.forEach((games) => {
        games.forEach((game) => {
          this.games.push(game)
        })
      })
    },
    rps_game_winnner() {
      if (!Array.isArray(this.games)) return;
      this.loading = true;
      this.games.forEach((game) => {
        const mappedGame = game.flatMap(it => it);

        if (mappedGame.length !== 4) return;

        this.initGame(mappedGame);
      });

      if (this.restantGames.length > 1) {
        this.createNewRounds();
        return;
      } else {
        this.loading = false;
        this.endGame = true;
        return;
      }
    },
    initGame(players) {
      if (!players || players.length < 4) {
        this.invalidGame = true;
        alert('Numéro de jogadores inválido');
        return;
      }
      if (!this.invalidGame) {

        this.playerOne = players[0];
        this.playerTwo = players[2];
        this.strategyFirst = String(players[1]).toUpperCase();
        this.strategySecond = String(players[3]).toUpperCase();

        if (!this.strategies.includes(this.strategyFirst) || !this.strategies.includes(this.strategySecond)) {
          this.invalidGame = true;
          alert('Alguma jogada não é válida');
          return;
        }

        if (!this.invalidGame) {
          this.playerOneRockStrategy();
        }
      }
    },
    playerOneRockStrategy() {
      if (this.strategyFirst === 'R' && !this.rockLose.includes(this.strategySecond)) {
        this.restantGames.push([ this.playerOne, this.strategyFirst ]);
        return;
      } else {
        this.playerOneScissorsStrategy();
      }
    },
    playerOneScissorsStrategy() {
      if (this.strategyFirst === 'S' && !this.scissorsLose.includes(this.strategySecond)) {
        this.restantGames.push([ this.playerOne, this.strategyFirst ]);
        return;
      } else {
        this.playerOnePaperStrategy();
      }
    },
    playerOnePaperStrategy() {
      if (this.strategyFirst === 'P' && !this.paperLose.includes(this.strategySecond)) {
        this.restantGames.push([ this.playerOne, this.strategyFirst ]);
        return;
      } else {
        this.playerTwoRockStrategy();
      }
    },
    playerTwoRockStrategy() {
      if (this.strategySecond === 'R' && !this.rockLose.includes(this.strategyFirst)) {
        this.restantGames.push([ this.playerTwo, this.strategySecond ]);
        return;
      } else {
        this.playerTwoScissorsStrategy();
      }
    },
    playerTwoScissorsStrategy() {
      if (this.strategySecond === 'S' && !this.scissorsLose.includes(this.strategyFirst)) {
        this.restantGames.push([ this.playerTwo, this.strategySecond ]);
        return;
      } else {
        this.playerTwoPaperStrategy();
      }
    },
    playerTwoPaperStrategy() {
      if (this.strategySecond === 'P' && !this.paperLose.includes(this.strategyFirst)) {
        this.restantGames.push([ this.playerTwo, this.strategySecond ]);
        return;
      } else {
        this.restantGames.push([ this.playerOne, this.strategyFirst ]);
        return;
      }
    },
    createNewRounds() {
      this.games = [];
      for (let x = 0; x < this.restantGames.length; x += 2) {
        this.games.push([this.restantGames[x], this.restantGames[x + 1]]);
      }
      if (this.restantGames.length > 1) {
        this.restantGames = [];
        this.rps_game_winnner();
      }
    },
    restart() {
      window.location.reload();
    },
  },
  created() {
    this.configGame();
  },
}
</script>

<style>
  .game {
    border: 0;
    display: block;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
