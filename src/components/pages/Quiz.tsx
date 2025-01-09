import React, { useEffect, useRef, useState } from "react";
import "../../styles/quiz.css";
import { Badge, Button } from "@mui/material";
import Typewriter from "typewriter-effect";
import TimeProgress, { TimerProgressLoad } from "../../animations/TimeProgress";
import Dialog, { dialogProps } from "../../animations/dialog";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { basic_questions, QuizQuestion } from "../../data/questions_basic";
import { questions_intermidiate } from "../../data/questions_intermidiate";
import { question_advance } from "../../data/questions_advance";
import { questions_final } from "../../data/questions_final";
import { MoonLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { StatusAlertService }  from 'react-status-alert';

import {
  AppState,
  setAllAnswered,
  setCoins,
  setHealthSwap,
  setLiveCorrectAnswers,
  setSecondChance,
  setShakeTheSalt,
  setStatistic,
} from "../../store/Slice";
interface optionProp {
  value: string;
  correct: unknown;
}
const Quiz: React.FC = () => {
  const [options, setOptions] = useState<{ value: string; correct: unknown }[]>(
    []
  ); // Array of options
  const [visibleButtons, setVisibleButtons] = useState<
    { value: string; correct: unknown }[]
  >([]);
  const [correct, setCorrect] = useState<boolean>(false);
  const [wrong, setWrong] = useState<boolean>(false);
  const [params] = useSearchParams(); // Destructure useSearchParams hook
  // const shakeShaltPrice=20;
  // const buyNewQuestionPrice = 50;
  const questionPay = 10;
  const fastBonus = 10;
  const timeToAnswer = 30;
  const [coinsEarned, setCoinsEarned] = useState<number>(0);

  const [question, setQuestion] = useState<QuizQuestion>();
  const [message, setMessage] = useState<string>();
  const [isRunning, setIsRunning] = useState<boolean>(false); // Tracks if the timer is active
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Stores the interval reference
  const [secs, setSecs] = useState<number>(timeToAnswer);
  const [timer, setTimer] = useState<boolean>(false);
  const [level, setLevel] = useState<string>("");
  const [resetTimer, setResetTimer] = useState<boolean>(false);
  const [questionNum, setQuestionNum] = useState<number>(1);
  const {
    coins,
    allAnswered,
    liveCorrectAnswers,
    liveChance,
    ShakeTheSalt,
    SecondChance,
    HealthSwap,
    statistic
  } = useSelector((root: { app: AppState }) => root.app);

  const correctAudioRef = useRef<HTMLAudioElement | null>(null);
  const wrongAudioRef = useRef<HTMLAudioElement | null>(null);
  const gameOverAudioRef = useRef<HTMLAudioElement | null>(null);
  const winningAudioRef = useRef<HTMLAudioElement | null>(null);
  const timeoutAudioRef = useRef<HTMLAudioElement | null>(null);
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);
  const click2AudioRef = useRef<HTMLAudioElement | null>(null);
const backgroundAudioRef  = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Assigning audio elements to refs
    correctAudioRef.current = document.querySelector("#correctSound");
    wrongAudioRef.current = document.querySelector("#wrongSound");
    gameOverAudioRef.current = document.querySelector("#gameOverSound");
    winningAudioRef.current = document.querySelector("#winningSound");
    timeoutAudioRef.current = document.querySelector("#timeoutSound");
    clickAudioRef.current = document.querySelector("#clickSound");
    click2AudioRef.current = document.querySelector("#click2Sound");
    backgroundAudioRef.current = document.querySelector('#backgroundSound');

  }, []);


  //when user leave the screen should pause the game
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User left the tab or browser window
        // Run your function here
        onLeave();
        setIsRunning(false);
        if(backgroundAudioRef.current)return backgroundAudioRef.current.pause()
      } else {
        // User returned to the tab or window
        onBack();
        setIsRunning(true);

        if(backgroundAudioRef.current)return backgroundAudioRef.current.play()
      }
    };
  
    document.addEventListener("visibilitychange", handleVisibilityChange);
  
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
  
  const onLeave = () => {
        console.log("User left the website or browser tab");
  };
  const onBack = () => {
    console.log("User returned to the website");
  };
  //end operation


  // useEffect(() => {//test
  // console.log(
  //   correctAudioRef.current,
  //   wrongAudioRef.current,
  //   gameOverAudioRef.current,
  //   winningAudioRef.current,
  //   timeoutAudioRef.current,
  // )
  // },[])

  // const phrases = [
  //   "Good Effort",
  //   "Well Done",
  //   "Great Try",
  //   "Nice Attempt",
  //   "Keep Going",
  //   "Awesome Job",
  //   "You Did Well",
  //   "Solid Attempt",
  //   "Keep It Up",
  //   "Fantastic Effort",
  // ];

  // const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];

  const dispatch = useDispatch();
  const getQuestion = (level: string) => {
    switch (level) {
      case "basic":
        setQuestion(
          basic_questions[Math.floor(Math.random() * basic_questions.length)]
        );
        break;
      case "intermediate":
        setQuestion(
          questions_intermidiate[
            Math.floor(Math.random() * questions_intermidiate.length)
          ]
        );
        break;
      case "advance":
        setQuestion(
          question_advance[Math.floor(Math.random() * question_advance.length)]
        );
        break;
      case "final":
        setQuestion(
          questions_final[Math.floor(Math.random() * questions_final.length)]
        );
        break;
    }
  };

  useEffect(() => {
    const levelParam = params.get("level"); // Get the "level" parameter
    if (levelParam) {
      setLevel(levelParam); // Set the state if the parameter exists
      getQuestion(levelParam);
    }
  }, [params]);

  useEffect(() => {
    if (alreadyAnswered() || !question) {
      getQuestion(level);
    } else {
      setMessage(question?.question || "");
    }
   if(window.location.href.includes('localhost')) console.log(question);
  }, [question]);
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  // Function to pause the timer
  const pauseTimer = () => {
    if (isRunning) {
      setIsRunning(false);
    }
  };
  useEffect(() => {
    //for debug purposes
    console.log(secs, options, pauseTimer);
    dispatch(setLiveCorrectAnswers([]));
    dispatch(setStatistic({...statistic,playingTime:(statistic.playingTime||0)+1}))
    dispatch(setStatistic({...statistic,playingTime:(statistic.gamesStarted||0)+1}))
  }, []);

  useEffect(() => {
    localStorage.setItem("liveChance", liveChance.toString());
  }, [liveChance]);
  useEffect(() => {
    // localStorage.setItem('liveChance',liveChance.toString())
  }, [SecondChance, ShakeTheSalt, HealthSwap]);
  // Reset the interval if the state changes
  useEffect(() => {
    if (isRunning) {
      // Start the interval
      const func = () => {
        setSecs((prevSecs) => {
          if (prevSecs > 0) {
            return prevSecs - 1;
          } else {
            // alert('timeout...')
            // Stop the timer at 0
            setTimer(true);
            if (timeoutAudioRef.current) timeoutAudioRef.current.play();

            const retryQuestion = () => {
              if (SecondChance <= 0) {
                //print unsufficient message here
                console.log("should open buy chance");
                setTimeout(() => {
                  buyChance();
                }, 1000);
                return;
              }
              setMessage("");
              setVisibleButtons([]);
              setTimer(false);
              setSecs(timeToAnswer);
              setResetTimer(true);
              setTimeout(() => {
                if (SecondChance > 0)
                  dispatch(
                    setSecondChance(
                      Number(localStorage.getItem("SecondChance") || "3") - 1
                    )
                  );
                // console.log(SecondChance)
                setMessage(question?.question);
                setIsRunning(true);
                intervalRef.current = setInterval(func, 1000);
              }, 100);
            };

            const RestartQuiz = () => {
              setQuestionNum(0);
              changeQuestion();
            };

            setDialogProps({
              title: "Question Timeout ",
              cancelText: `Second Chance `,
              continueText: "Restart",
              text: (
                <>
                  <div>
                    <span style={{ color: "lightgrey" }}>
                      Question timeout Kindly retry the question or restart this
                      level
                    </span>
                  </div>
                </>
              ),
              onContinue: () => {
                RestartQuiz();
              },
              onCancel: () => {
                if (clickAudioRef.current) clickAudioRef.current.play();

                retryQuestion();
              },
            });
            setOpen(true);

            clearInterval(intervalRef.current!);
            return 0;
          }
        });
      };

      intervalRef.current = setInterval(func, 1000);
    } else {
      // Pause the interval
      console.log("Timer paused or stopped");
      clearInterval(intervalRef.current!);
    }

    // Cleanup the interval on unmount
    return () => clearInterval(intervalRef.current!);
  }, [isRunning]);

  const navigate = useNavigate();
  const handleTypingComplete = () => {
    const _: { value: string; correct: unknown }[] = [];
    if (question) {
      Object.values(question?.options || []).map((e: unknown, num: number) => {
        _.push({
          value: (e || "").toString() as string,
          correct:
            Object.getOwnPropertyNames(question.options)[num] ===
              question?.correctAnswer || e === question?.correctAnswer,
        });
      });
    }
    setOptions(_);
    setVisibleButtons(_);
    setResetTimer(false);

    //play drop down click
    // _.forEach((p:unknown, index:number) => {
    //   setTimeout(() => {
    if (click2AudioRef.current) {
      click2AudioRef.current.play();
    }
    //   }, (2000 / _.length) * index); // Spread evenly across 1000ms
    // });
    //play drop down click

    setTimeout(() => {
      startTimer();
    }, 1000);
  }; // 1-second delay

  useEffect(() => {
    if (message) {
      let typedText = "";
      const id = setInterval(() => {
        if (typedText.length >= message.length) {
          clearInterval(id);
          handleTypingComplete();
        } else {
          typedText += "1";
        }
      }, 10);
    }
  }, [message]);

  const ShakeSalt = async () => {
    if (ShakeTheSalt) {
      if (visibleButtons.length > 3) {
        const shuffled = [...visibleButtons].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 2);
        setShake(selected); // Set the selected buttons to state
        dispatch(setShakeTheSalt(ShakeTheSalt - 1));
      }
    } else {
      setDialogProps({
        title: "Insufficient Health Coins ",
        cancelText: "Buy 20 HC",
        continueText: "Continue",
        text: (
          <>
            <div>
  <span style={{ color: "lightgrey" }}>
    You don't have sufficient Health Coins to{" "}
    <strong>Shake The Salt</strong>{" "}
    <img src="/salt2.png" alt="Salt Icon" width={15} height={15} />. 
    Cost: <Link to="/Market">20 HC</Link>.
  </span>
</div>

          </>
        ),
        onContinue: () => {
          if (clickAudioRef.current) clickAudioRef.current.play();

          setIsRunning(true);
        },
        onCancel: () => {
          if (clickAudioRef.current) clickAudioRef.current.play();
          // navigate(`/Market`);
          if(coins >= 20){
            dispatch(setCoins(coins - 20))
            dispatch(setShakeTheSalt(ShakeTheSalt+1))
            dispatch(setStatistic({...statistic,useShakeTheSalt:(statistic.useShakeTheSalt||0) + 1}))
            }
            else{
              StatusAlertService.showError('Not enough Health Coins available.')
            }
        },
      });
      setOpen(true);
    }
  };
  const [shake, setShake] = useState<{ value: string; correct: unknown }[]>([]);

  const [open, setOpen] = useState<boolean>(false);
  const [dialogProps, setDialogProps] = useState<dialogProps>({
    title: "",
    cancelText: "",
    continueText: "",
    text: "",
  });

  const buyAnotherQuestion = () => {
    setIsRunning(false);
    if (HealthSwap) {
      setDialogProps({
        title: "Replace Question",
        cancelText: "Cancel",
        continueText: "Replace",
        text: (
          <>
            <div>
              {" "}
              Replacing a question with another will cost you{" "}
              <span style={{ color: "#ff4500" }}>50HC</span>.
            </div>
          </>
        ),
        onContinue: () => {
          if (clickAudioRef.current) clickAudioRef.current.play();

          if (HealthSwap) {
            dispatch(setHealthSwap(HealthSwap - 1));
            dispatch(setStatistic({...statistic,useHealthSwap:(statistic.useHealthSwap||0) + 1}))
            changeQuestion("isChange");
          }
          // setIsRunning(true);
        },
        onCancel: () => {
          if (clickAudioRef.current) clickAudioRef.current.play();

          setIsRunning(true);
        },
      });
    } else {
      setDialogProps({
        title: "Insufficient Health Swap  ",
        cancelText: "Buy",
        continueText: "Continue",
        text: (
          <>
            <div>
              <span style={{ color: "lightgrey" }}>
                You don’t have enough Health Swap coins to <b>Health Swap</b>
                <img
                  src="/reload2.png"
                  width={12}
                  height={12}
                  alt="Health Swap Icon"
                />{" "}
                this question. Please{" "}
                <Link to="/Market">buy Health Swap coins</Link> and try again.
              </span>
            </div>
          </>
        ),
        onCancel: () => {
          if (clickAudioRef.current) clickAudioRef.current.play();
          // navigate("/Market");
          if(coins >= 50){
          
    dispatch(setCoins(coins - 50))
    dispatch(setHealthSwap(HealthSwap+1))
          }
          else{
            StatusAlertService.showError('Not enough Health Coins available.')
          }

        },
      });
    }
    setOpen(true);
  };

  const changeQuestion = (type?: string) => {
    setShake([]);
    setVisibleButtons([]);
    // setMessage("This is next question!")
    getQuestion(level);
    setResetTimer(true);
    setIsRunning(false);
    setTimer(false);

    if (type !== "isChange") {
      setQuestionNum((prev: number) => {
        if (prev >= 3) {
          //show final result
        }
        return prev + 1;
      });
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setSecs(timeToAnswer);

    setWrong(false);
    setCorrect(false);
  };

  const alreadyAnswered = () =>
    allAnswered.filter((e) => e.feedback === question?.feedback).length > 0 ||
    liveCorrectAnswers.filter((e) => e.feedback === question?.feedback).length >
      0;

  const handleSelectedAnswer = async (option: optionProp) => {
    if (!alreadyAnswered()) {
      setIsRunning(false);
      if (option.correct) {
        ///correct answer
      dispatch(setStatistic({...statistic,correctAnswers:(statistic.correctAnswers || 0) +1,questionAnswered:(statistic.questionAnswered || 0) +1}))
        sessionStorage.setItem(
          "correctAnswer",
          [...liveCorrectAnswers, question].length.toString()
        );
        if (secs > 8) {
          dispatch(setCoins(coins + questionPay + fastBonus));
          setCoinsEarned(coinsEarned + questionPay + fastBonus);
        } else {
          dispatch(setCoins(coins + questionPay));
          setCoinsEarned(coinsEarned + questionPay);
        }
        if (question) {
          dispatch(setAllAnswered([...allAnswered, question]));
          dispatch(setLiveCorrectAnswers([...liveCorrectAnswers, question]));
        }
        setWrong(false);
        setTimer(false);
        setCorrect(true);
        setIsRunning(false);

        setTimeout(() => {
          setDialogProps({
            title: getCorrectAnswerHeading(),
            cancelText: "",
            continueText: "Next",
            text: (
              <>
                <div>
                  <span style={{ color: "lightgrey" }}>
                    <b>Feedback:</b> {question?.feedback}
                  </span>
                </div>
              </>
            ),
            onContinue: () => {
              setOpen(false);
              next();
              setIsRunning(true);
              if (clickAudioRef.current) clickAudioRef.current.play();
            },
            onCancel: () => {
              next();
              setIsRunning(true);
              if (clickAudioRef.current) clickAudioRef.current.play();
            },
          });
          setOpen(true);
        }, 1000);
        if (correctAudioRef.current) correctAudioRef.current.play();
        console.log(correctAudioRef.current);
      } else {
        //wrong answer
      dispatch(setStatistic({...statistic,wrongAnswers:(statistic.wrongAnswers || 0) +1,questionAnswered:(statistic.questionAnswered || 0) +1}))
        setTimer(false);
        setCorrect(false);
        setWrong(true);
        setIsRunning(false);
        if (SecondChance <= 0)
          return setTimeout(() => {
            next();
            setIsRunning(true);
          }, 500);

        setTimeout(() => {
          setDialogProps({
            title: "Wrong Answer",
            cancelText: `Second Chance `,
            continueText: "Next",
            text: (
              <>
                <div>
                  <span style={{ color: "lightgrey" }}>
                    You have a second chance coins available to retry this
                    question again
                  </span>
                </div>
              </>
            ),
            onContinue: () => {
              if (clickAudioRef.current) clickAudioRef.current.play();
              next();
              setIsRunning(true);
            },
            onCancel: () => {
              if (clickAudioRef.current) clickAudioRef.current.play();
              setSecs(timeToAnswer);
              if (SecondChance > 0){
                dispatch(
                  setSecondChance(
                    Number(localStorage.getItem("SecondChance") || "3") - 1
                  )
                );
                dispatch(setStatistic({...statistic,useSecondChance:(statistic.useSecondChance||0) + 1}))
              }
              else {
                next();
                setIsRunning(true);
              }
              // console.log(SecondChance)
              setMessage("");
              setVisibleButtons([]);
        setWrong(false)
              setTimeout(() => {
                setMessage(question?.question);
                setIsRunning(true);
              }, 500);
            },
          });
          setOpen(true);
        }, 1000);
        if (wrongAudioRef.current) wrongAudioRef.current.play();
      }
    }

    function next() {
      setTimeout(() => {
        if (questionNum >= 3) {
          sessionStorage.setItem("coinsEarned", coinsEarned.toString());
          sessionStorage.setItem("level", level);
          if (level === "final" &&  Number(sessionStorage.getItem("correctAnswer")?.toString() || 0) >=
          3) return navigate("/SuccessResult");
          else if (level==='final' ) return navigate("/LevelFailedResult");
          if (
            Number(sessionStorage.getItem("correctAnswer")?.toString() || 0) >=
            3
          )
            return navigate("/LevelWinResult");
          else return navigate("/LevelFailedResult");
        }

        changeQuestion();
      }, 500);
    }
  };

  useEffect(() => {
    // console.log(question)
  }, [question]);

  useEffect(() => {}, [liveCorrectAnswers]);

  const secondChancePrice = 30;
  const buyChance = () => {
    console.log('buy Chance fired')
    if (coins  < secondChancePrice) {
      setDialogProps({
        title: "Insufficient Health Coins ",
        cancelText: "",
        continueText: "Continue",
        text: (
          <>
            <div>
              <span style={{ color: "lightgrey" }}>
                Insufficient coins! You need {secondChancePrice}HC to buy Second
                Chance. Please earn more coins to proceed.
              </span>
            </div>
          </>
        ),
        onContinue: () => {
          if (clickAudioRef.current) clickAudioRef.current.play();

          setIsRunning(true);
        },
        onCancel: () => {
          if (clickAudioRef.current) clickAudioRef.current.play();

          setIsRunning(true);
        },
      });
      setOpen(true);
      return;
    }
    setIsRunning(false);

    setDialogProps({
      title: "Buy Chance ",
      cancelText: "Buy",
      continueText: "Continue",
      text: (
        <>
          <div>
            <span style={{ color: "lightgrey" }}>
              Second Chance gives you the ability to answer a failed question
              again. Buy a Chances for {secondChancePrice}HC.
            </span>
          </div>
        </>
      ),
      onContinue: () => {
        setIsRunning(true); 
      },
      onCancel: () => {
        if (clickAudioRef.current) clickAudioRef.current.play();
        setOpen(false);
        setIsRunning(true);
        dispatch(setCoins(coins - secondChancePrice));
        dispatch(setSecondChance(SecondChance + 1));
      },
    });
    setOpen(true);
  };


  useEffect(()=>{
if(open)setIsRunning(false);
else setIsRunning(true);
  },[open])
  return (
    <>
      {open && (
        <Dialog
          dialogProps={dialogProps}
          onContinue={() => {
            setTimeout(() => {
              setOpen(false);
            }, 400);
          }}
          onCancel={() => {
            if (clickAudioRef.current) clickAudioRef.current.play();

            setTimeout(() => {
              setOpen(false);
            }, 400);
          }}
        />
      )}
      <div className="body">
        {resetTimer ? (
          <TimerProgressLoad />
        ) : (
          <TimeProgress
            duration={timeToAnswer}
            secs={secs}
            isRunning={isRunning}
          />
        )}
        <br />
        <div className="quizQuestion">
          <div className="quizNum">{questionNum}/3</div>

          <span>
            <Typewriter
              options={{
                strings: message,
                autoStart: true,
                delay: 10,
                cursor: "", // Remove cursor when done typing
              }}
              onInit={(typewriter) => {
                typewriter
                  .callFunction(() => {
                    //error:fire sec after finished
                  })
                  .start()
                  .callFunction(() => {
                    //completed
                  });
              }}
            />
          </span>
        </div>
        <div className="QuizBottomNav">
          {/* <Button
            style={{ width: 35 }}
            onClick={() => {
              navigate("/SuccessResult");
              setOpen(true);
            }}
          >
            <img src="/healthcare.png" style={{ width: 30, height: 30 }} />
            Live 3
          </Button> */}
          <div style={{ width: "100%", position: "relative"}}>
            {/* <div className="line"></div> */}

            <div className="travia-container"  >
              <Button
                className={!SecondChance ? "disabled" : ""}
                style={{ width: 35 }}
                onClick={() => {
                  buyChance();
                }}
              >
                <Badge badgeContent={SecondChance} color="error">
                  <img
                  className='glow-icon rotate-zoom-icon'
                    src="/opportunity.png"
                    style={{ width: 30, height: 30 }}
                  />
                </Badge>
              </Button>

              <Button
                className={!HealthSwap ? "disabled" : ""}
                style={{ width: 35 }}
                
                onClick={() => {
                  buyAnotherQuestion();
                }}
              >
                <Badge badgeContent={HealthSwap} color="error">
                  <img 
                  className='glow-icon rotate-icon'
                  
                  
                  src="/reload2.png" style={{ width: 30, height: 30 }} />
                </Badge>
              </Button>

              <Button
                onClick={() => {
                  ShakeSalt();
                }}
                className={!ShakeTheSalt ? "disabled" : ""}
                style={{ width: 35 }}
              >
                <Badge badgeContent={ShakeTheSalt} color="error">
                  <img
                  
                  className='glow-icon rotate-icon'
                   src="/salt2.png" style={{ width: 30, height: 30 }} />
                </Badge>
              </Button>
            </div>
          </div>
        </div>
        {correct && (
          <h3 className="Correct">
            <FaCheck /> Correct{" "}
          </h3>
        )}
        {wrong && (
          <h3 className="Wrong">
            <FaTimes /> Wrong{" "}
          </h3>
        )}
        {timer && <h3 className="Wrong">Timeout </h3>}

        <div className="options">
          {visibleButtons.length <= 0 ? (
            <div
              className="d-flex justify-content-center"
              style={{ padding: 20 }}
            >
              <MoonLoader size={18} color="white" />
            </div>
          ) : (
            visibleButtons.map((option, index) => {
              const canBeShaked =
                shake.filter((e) => e.value === option.value).length > 0;
              return (
                <Button
                  onClick={() => {
                    handleSelectedAnswer(option);
                  }}
                  style={{ "--index": index } as React.CSSProperties} // Pass index to CSS variable
                  className={"fade-in" + " " + (canBeShaked ? "shake" : "")}
                  key={index}
                >
                  {option.value}
                </Button>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Quiz;

const getCorrectAnswerHeading = (): string => {
  const headings = [
    "Great Job!",
    "You Nailed It!",
    "Well Done!",
    "Fantastic Answer!",
    "Spot On!",
    "Excellent Work!",
    "Bravo!",
    "You Got It Right!",
    "Amazing!",
    "Correct Answer!",
  ];

  return headings[Math.floor(Math.random() * headings.length)];
};
