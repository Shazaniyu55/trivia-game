import { QuizQuestion } from './../data/questions_basic';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface statisticProps{
playingTime:number,
gamesStarted:number,
gamesWon:number,
winningPercentage:number,
useSecondChance:number,
useHealthSwap:number,
useShakeTheSalt:number,
questionAnswered:number,
correctAnswers:number,
wrongAnswers:number
}
export interface AppState {
  screen: string;
  coins:number;
  liveCorrectAnswers:QuizQuestion[],
  allAnswered:QuizQuestion[],
  liveChance:number,
  backgroundMusicVolume:number,
  soundVolume:number,
  HealthSwap:number,
  ShakeTheSalt:number,
  SecondChance:number,
  statistic:statisticProps
}

const initialState: AppState = {
  screen: 'home',
  coins:100,
  liveCorrectAnswers:[],
  allAnswered:JSON.parse(localStorage.getItem('allAnswered')||"[]"),
  liveChance:Number(localStorage.getItem('liveChance')||'1'),
  backgroundMusicVolume:Number(localStorage.getItem('backgroundMusicVolume')||'0.4'),
  soundVolume:Number(localStorage.getItem('soundVolume')||'1'),
  HealthSwap:Number(localStorage.getItem('HealthSwap')||'1'),
  ShakeTheSalt:Number(localStorage.getItem('ShakeTheSwap')||'1'),
  SecondChance:Number(localStorage.getItem('SecondChance')||'1'),
  statistic:JSON.parse(localStorage.getItem('statistic')||JSON.stringify({
    playingTime:0,
gamesStarted:0,
gamesWon:0,
winningPercentage:0,
useSecondChance:0,
useHealthSwap:0,
useShakeTheSalt:0,
questionAnswered:0,
correctAnswers:0,
wrongAnswers:0
  }))
};

export const Slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // Reducer to set the screen state
    setScreen: (state, action: PayloadAction<string>) => {
      state.screen = action.payload;
    },
    setCoins:(state,action:PayloadAction<number>)=>{
      state.coins=action.payload
    },
    setLiveCorrectAnswers:(state,action:PayloadAction<QuizQuestion[]>)=>{
state.liveCorrectAnswers=action.payload
    },
  setAllAnswered:(state,action:PayloadAction<QuizQuestion[]>)=>{
    state.allAnswered=action.payload
  },
  setLiveChance:(state,action:PayloadAction<number>)=>{
    state.liveChance=action.payload
  },
  setBackgroundMusicVolume:(state,action:PayloadAction<number>)=>{
    state.backgroundMusicVolume=action.payload
  },
  setSoundVolume:(state,action:PayloadAction<number>)=>{
    state.soundVolume=action.payload
  },
  setHealthSwap:(state,action:PayloadAction<number>)=>{
    state.HealthSwap=action.payload
  },
  setShakeTheSalt:(state,action:PayloadAction<number>)=>{
    state.ShakeTheSalt=action.payload
  },
  setSecondChance:(state,action:PayloadAction<number>)=>{
    state.SecondChance=action.payload
  },
  setStatistic:(state,action:PayloadAction<statisticProps>)=>{
    state.statistic=action.payload
  }


  },
});

export const { setScreen,
  setCoins,
  setAllAnswered,
  setLiveCorrectAnswers,
  setLiveChance,
  setSoundVolume,
  setBackgroundMusicVolume,
  setHealthSwap,
  setShakeTheSalt,
  setSecondChance,
  setStatistic
} = Slice.actions;

export default Slice.reducer;
