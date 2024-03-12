import React, { useEffect, useState } from "react";

const nums = [1, 2, 3, 4, 5, 6, 7];
const sparkles = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const colors = { green: "#4CAF50", red: "#f44336", blue: "#2196F3" };
const colorRules = [
  { a: colors.green, b: colors.red },
  { a: colors.red, b: colors.blue },
  { a: colors.blue, b: colors.green },
];
const levels = ["Standard", "Hard", "Impossible"];

export const SquareWars = () => {
  const [coords, setCoords] = useState([4, 4]);
  const [heroColor, setHeroColor] = useState("#4CAF50");
  const [defeatedHero, setDefeatedHero] = useState(false);

  const [enemy, setEnemy] = useState([1, 1]);
  const [enemyColor, setEnemyColor] = useState("#f44336");
  const [defeatedEnemy, setDefeatedEnemy] = useState(false);

  const [enemy2, setEnemy2] = useState([4, 1]);
  // const [enemy2Color, setEnemy2Color] = useState("#2196F3");
  const [defeatedEnemy2, setDefeatedEnemy2] = useState(false);

  const [enemy3, setEnemy3] = useState([1, 4]);
  const [defeatedEnemy3, setDefeatedEnemy3] = useState(false);

  const [blueCoords, setBlueCoords] = useState([0, 0]);
  const [redCoords, setRedCoords] = useState([0, 0]);
  const [greenCoords, setGreenCoords] = useState([0, 0]);

  const [iterations, setIterations] = useState(0);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [lost, setLost] = useState(false);
  const [paused, setPaused] = useState(true);
  const [level, setLevel] = useState(0);
  const [menu, setMenu] = useState(true);

  useEffect(() => {
    const best = window.localStorage.getItem("bestScore");
    if (best) setBestScore(best);
    setBlueCoords([
      Math.ceil(Math.random() * nums.length),
      Math.ceil(Math.random() * nums.length),
    ]);
    setRedCoords([
      Math.ceil(Math.random() * nums.length),
      Math.ceil(Math.random() * nums.length),
    ]);
  }, []);

  useEffect(() => {
    if (level === 0) {
      setEnemy2([-1, -1]);
      setEnemy3([-1, -1]);
    }
    if (level === 1) {
      setEnemy3([-1, -1]);
    }
  }, [level]);

  useEffect(() => {
    window.addEventListener("keydown", handleMove);
    return () => {
      window.removeEventListener("keydown", handleMove);
    };
  }, [heroColor, redCoords]);

  useEffect(() => {
    handleColorChange(
      coords,
      blueCoords,
      setHeroColor,
      setBlueCoords,
      setGreenCoords,
      setRedCoords,
      "blue"
    );
    handleColorChange(
      coords,
      redCoords,
      setHeroColor,
      setRedCoords,
      setBlueCoords,
      setGreenCoords,
      "red"
    );
    handleColorChange(
      coords,
      greenCoords,
      setHeroColor,
      setGreenCoords,
      setBlueCoords,
      setRedCoords,
      "green"
    );
    handleColorChange(
      enemy,
      blueCoords,
      setEnemyColor,
      setBlueCoords,
      setGreenCoords,
      setRedCoords,
      "blue"
    );
    handleColorChange(
      enemy,
      redCoords,
      setEnemyColor,
      setRedCoords,
      setBlueCoords,
      setGreenCoords,
      "red"
    );
    handleColorChange(
      enemy,
      greenCoords,
      setEnemyColor,
      setGreenCoords,
      setBlueCoords,
      setRedCoords,
      "green"
    );
    handleColorChange(
      enemy2,
      blueCoords,
      setEnemyColor,
      setBlueCoords,
      setGreenCoords,
      setRedCoords,
      "blue"
    );
    handleColorChange(
      enemy2,
      redCoords,
      setEnemyColor,
      setRedCoords,
      setBlueCoords,
      setGreenCoords,
      "red"
    );
    handleColorChange(
      enemy2,
      greenCoords,
      setEnemyColor,
      setGreenCoords,
      setBlueCoords,
      setRedCoords,
      "green"
    );
    handleColorChange(
      enemy3,
      blueCoords,
      setEnemyColor,
      setBlueCoords,
      setGreenCoords,
      setRedCoords,
      "blue"
    );
    handleColorChange(
      enemy3,
      redCoords,
      setEnemyColor,
      setRedCoords,
      setBlueCoords,
      setGreenCoords,
      "red"
    );
    handleColorChange(
      enemy3,
      greenCoords,
      setEnemyColor,
      setGreenCoords,
      setBlueCoords,
      setRedCoords,
      "green"
    );
  }, [greenCoords, coords, blueCoords, redCoords, enemy, enemy2, enemy3]);

  useEffect(() => {
    handleFight(enemy, setEnemy, enemyColor, setEnemyColor, setDefeatedEnemy);
    handleFight(
      enemy2,
      setEnemy2,
      enemyColor,
      setEnemyColor,
      setDefeatedEnemy2
    );
    handleFight(
      enemy3,
      setEnemy3,
      enemyColor,
      setEnemyColor,
      setDefeatedEnemy3
    );
  }, [coords, enemy, enemy2, enemy3, heroColor]);

  useEffect(() => {
    if (!paused) {
      const interval = setInterval(
        () => handleEnemyMove(enemy, setEnemy, 1),
        700
      );
      const interval2 =
        level !== 0
          ? setInterval(() => handleEnemyMove(enemy2, setEnemy2, 2), 700)
          : null;
      const interval3 =
        level === 2
          ? setInterval(() => handleEnemyMove(enemy3, setEnemy3, 3), 700)
          : null;

      function handleEnemyMove(enemy, setEnemy, num) {
        if (iterations >= 990) {
          clearInterval(num === 1 ? interval : num === 2 ? interval2 : interval3);
          return;
        }

        const randomIndex = Math.floor(Math.random() * enemy.length);
        let randomOperation = Math.random() < 0.3 ? -1 : 1;
        const newEnemy = [...enemy];
        newEnemy[randomIndex] += randomOperation;
        if (newEnemy[randomIndex] < 1) {
          newEnemy[randomIndex] = 2;
        }
        // If the result is larger than 4, change operation to subtract
        if (newEnemy[randomIndex] > nums.length) {
          newEnemy[randomIndex] = nums.length - 1;
        }
        setEnemy(newEnemy);
        setIterations((prevIterations) => prevIterations + 1);
      }

      return () => {
        clearInterval(interval);
        clearInterval(interval2);
        clearInterval(interval3);
      };
    }
  }, [enemy, iterations, score, paused]);

  const handleFight = (
    enemy,
    setEnemy,
    enemyColor,
    setEnemyColor,
    setDefeatedEnemy
  ) => {
    if (coords[0] === enemy[0] && coords[1] === enemy[1]) {
      if (
        (heroColor === colors.red && enemyColor === colors.green) ||
        (heroColor === colors.green && enemyColor === colors.blue) ||
        (heroColor === colors.blue && enemyColor === colors.red)
      ) {
        setDefeatedEnemy(true);
        setScore(score + 1);

        setTimeout(() => {
          setDefeatedEnemy(false);
          const x = Math.ceil(Math.random() * nums.length);
          const y = Math.ceil(Math.random() * nums.length);
          setEnemy([x, y]);
          const col = Math.ceil(Math.random() * 4);
          const color =
            col === 1 ? "#2196F3" : col === 2 ? "#4CAF50" : "#f44336";
          setEnemyColor(
            col === 1 ? "#2196F3" : col === 2 ? "#4CAF50" : "#f44336"
          );
        }, 500);
      } else if (
        (heroColor === colors.green && enemyColor === colors.red) ||
        (heroColor === colors.red && enemyColor === colors.blue) ||
        (heroColor === colors.blue && enemyColor === colors.green)
      ) {
        setDefeatedHero(true);
        setLost(true);
        if (score > bestScore) window.localStorage.setItem("bestScore", score);
        setIterations(999);
      }
    }
  };

  const handleMove = (event) => {
    let index;
    let operation;
    switch (event.key) {
      case "ArrowUp":
        index = 0;
        operation = -1;
        break;
      case "ArrowDown":
        index = 0;
        operation = 1;
        break;
      case "ArrowLeft":
        index = 1;
        operation = -1;
        break;
      case "ArrowRight":
        index = 1;
        operation = 1;
        break;
      default:
        break;
    }
    setCoords((prev) => {
      const newCoords = [...prev];
      if (
        newCoords[index] + operation > 0 &&
        newCoords[index] + operation < nums.length + 1
      ) {
        newCoords[index] += operation;
      }
      return newCoords;
    });
  };

  const handleReload = () => {
    window.location.reload();
  };

  const handleColorChange = (
    elementCoords,
    colorCoords,
    setElement,
    setColor1,
    setColor2,
    setColor3,
    color
  ) => {
    if (
      elementCoords[0] === colorCoords[0] &&
      elementCoords[1] === colorCoords[1]
    ) {
      setElement(colors[`${color}`]);
      setColor2([
        Math.ceil(Math.random() * nums.length),
        Math.ceil(Math.random() * nums.length),
      ]);
      setColor3([
        Math.ceil(Math.random() * nums.length),
        Math.ceil(Math.random() * nums.length),
      ]);
      setColor1([0, 0]);
    }
  };

  return (
    <>
      {menu && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "#000000b0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "9999999",
          }}
        >
          <div
            style={{
              background: "black",
              color: "yellow",
              padding: "50px 100px",
              borderRadius: "10px",
              border: "1px solid",
            }}
          >
            <div className="">
              <h2>Square Wars</h2>
              <p>Choose level:</p>
            </div>
            {levels.map((lvl, i) => (
              <div
                style={{
                  marginTop: "1.5rem",
                  fontSize: "20px",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  color: "yellow",
                  fontWeight: "500",
                  cursor: "pointer",
                  border: "1px solid",
                  transition: "all .3s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = colors.green;
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                }}
                onClick={() => {
                  setMenu(false);
                  setPaused(false);
                  setLevel(i);
                  // if (i===0) setEnemy2([0,0])
                }}
              >
                {lvl}
              </div>
            ))}
          </div>
        </div>
      )}
      {(lost || paused) && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "#000000b0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "999999",
          }}
        >
          <div
            style={{
              background: "black",
              color: "yellow",
              padding: "50px 100px",
              borderRadius: "10px",
              border: "1px solid",
            }}
          >
            {lost ? (
              <div className="">
                <p style={{ margin: "0" }}>Game over</p>
                <h2>Score: {score}</h2>
              </div>
            ) : (
              <p style={{ margin: "0" }}>Paused</p>
            )}
            <div
              style={{
                marginTop: "1.5rem",
                fontSize: "20px",
                padding: "10px 20px",
                borderRadius: "5px",
                border: "1px solid",
                color: "yellow",
                fontWeight: "700",
                cursor: "pointer",
              }}
              onClick={handleReload}
            >
              Restart
            </div>
            {paused && (
              <>
                <div
                  style={{
                    marginTop: "1.5rem",
                    fontSize: "20px",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    border: "1px solid",
                    color: "yellow",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setMenu(true);
                  }}
                >
                  Menu
                </div>
                <div
                  style={{
                    marginTop: "1.5rem",
                    fontSize: "20px",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    background: "#4CAF50",
                    color: "black",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setIterations(0);
                    setPaused(false);
                  }}
                >
                  Continue
                </div>
              </>
            )}
          </div>
        </div>
      )}
      <div
        style={{
          color: "#fff",
          position: "absolute",
          padding: "60px",
          fontSize: "20px",
          fontWeight: "600",
          textAlign: "initial",
        }}
      >
        Score:
        <span> {score}</span>
        <br />
        Best Score:
        <span> {bestScore > score ? bestScore : score}</span>
        <div style={{ marginTop: "3rem" }}>
          {colorRules.map((entry) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                margin: "15px 0",
              }}
            >
              <div
                style={{ background: entry.b, height: "50px", width: "50px" }}
              ></div>{" "}
              {" => "}{" "}
              <div
                style={{ background: entry.a, height: "50px", width: "50px" }}
              ></div>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          color: "#fff",
          position: "absolute",
          padding: "60px",
          fontSize: "46px",
          fontWeight: "600",
          textAlign: "initial",
          right: "0",
          cursor: "pointer",
        }}
        onClick={() => {
          if (paused) {
            setIterations(0);
            setPaused(false);
          } else {
            setIterations(999);
            setPaused(true);
          }
        }}
      >
        {!paused ? (
          "| |"
        ) : (
          <div
            style={{
              borderTop: "20px solid #f4433600",
              borderBottom: "20px solid #9c27b000",
              borderLeft: "25px solid white",
            }}
          ></div>
        )}
      </div>
      <div
        style={{
          background: "#000",
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          alignItems: "center",
        }}
      >
        <table>
          {nums.map((n) => (
            <tr>
              {nums.map((m) => (
                <td
                  style={{
                    width: "80px",
                    height: "80px",
                    border:
                      n === coords[0] && m === coords[1]
                        ? "1px solid yellow"
                        : "1px solid #ffffff29",
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    transition: ".3s all",
                    background:
                      n === enemy[0] && m === enemy[1] && !defeatedEnemy
                        ? enemyColor
                        : n === enemy2[0] && m === enemy2[1] && !defeatedEnemy2
                        ? enemyColor
                        : n === enemy3[0] && m === enemy3[1] && !defeatedEnemy3
                        ? enemyColor
                        : n === coords[0] && m === coords[1] && !defeatedHero
                        ? heroColor
                        : "",
                  }}
                >
                  {n === blueCoords[0] && m === blueCoords[1] && (
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        background: "#2196F3",
                        borderRadius: "50%",
                      }}
                    ></div>
                  )}
                  {n === redCoords[0] && m === redCoords[1] && (
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        background: "#f44336",
                        borderRadius: "50%",
                      }}
                    ></div>
                  )}
                  {n === greenCoords[0] && m === greenCoords[1] && (
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        background: "#4CAF50",
                        borderRadius: "50%",
                      }}
                    ></div>
                  )}
                  {n === coords[0] && m === coords[1] && (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        position: "absolute",
                      }}
                      onClick={() => setDefeatedHero(!defeatedHero)}
                    >
                      {sparkles.map((n) => {
                        let transform = !defeatedHero
                          ? {}
                          : {
                              transform: `translate(${
                                n === 1 || n === 4 || n === 7
                                  ? "-30px"
                                  : n === 2 || n === 5 || n === 8
                                  ? "0px"
                                  : "30px"
                              }, ${
                                n === 1 || n === 2 || n === 3
                                  ? "-30px"
                                  : n === 4 || n === 5 || n === 6
                                  ? "0px"
                                  : "30px"
                              }) scale(.5)`,
                              opacity: "0",
                            };
                        return (
                          <div
                            className="sparkle"
                            style={{
                              ...{
                                background: heroColor,
                                width: "27px",
                                height: "27px",
                                transition: "all .3s",
                              },
                              ...transform,
                            }}
                          ></div>
                        );
                      })}
                    </div>
                  )}
                  {n === enemy[0] && m === enemy[1] && (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        position: "absolute",
                      }}
                      onClick={() => setDefeatedEnemy(!defeatedEnemy)}
                    >
                      {sparkles.map((n) => {
                        let transform = !defeatedEnemy
                          ? {}
                          : {
                              transform: `translate(${
                                n === 1 || n === 4 || n === 7
                                  ? "-30px"
                                  : n === 2 || n === 5 || n === 8
                                  ? "0px"
                                  : "30px"
                              }, ${
                                n === 1 || n === 2 || n === 3
                                  ? "-30px"
                                  : n === 4 || n === 5 || n === 6
                                  ? "0px"
                                  : "30px"
                              }) scale(.5)`,
                              opacity: "0",
                            };
                        return (
                          <div
                            className="sparkle"
                            style={{
                              ...{
                                background: enemyColor,
                                width: "27px",
                                height: "27px",
                                transition: "all .3s",
                              },
                              ...transform,
                            }}
                          ></div>
                        );
                      })}
                    </div>
                  )}
                  {n === enemy2[0] && m === enemy2[1] && (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        position: "absolute",
                      }}
                      onClick={() => setDefeatedEnemy(!defeatedEnemy2)}
                    >
                      {sparkles.map((n) => {
                        let transform = !defeatedEnemy2
                          ? {}
                          : {
                              transform: `translate(${
                                n === 1 || n === 4 || n === 7
                                  ? "-30px"
                                  : n === 2 || n === 5 || n === 8
                                  ? "0px"
                                  : "30px"
                              }, ${
                                n === 1 || n === 2 || n === 3
                                  ? "-30px"
                                  : n === 4 || n === 5 || n === 6
                                  ? "0px"
                                  : "30px"
                              }) scale(.5)`,
                              opacity: "0",
                            };
                        return (
                          <div
                            className="sparkle"
                            style={{
                              ...{
                                background: enemyColor,
                                width: "27px",
                                height: "27px",
                                transition: "all .3s",
                              },
                              ...transform,
                            }}
                          ></div>
                        );
                      })}
                    </div>
                  )}
                  {n === enemy3[0] && m === enemy3[1] && (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        position: "absolute",
                      }}
                      onClick={() => setDefeatedEnemy(!defeatedEnemy3)}
                    >
                      {sparkles.map((n) => {
                        let transform = !defeatedEnemy3
                          ? {}
                          : {
                              transform: `translate(${
                                n === 1 || n === 4 || n === 7
                                  ? "-30px"
                                  : n === 2 || n === 5 || n === 8
                                  ? "0px"
                                  : "30px"
                              }, ${
                                n === 1 || n === 2 || n === 3
                                  ? "-30px"
                                  : n === 4 || n === 5 || n === 6
                                  ? "0px"
                                  : "30px"
                              }) scale(.5)`,
                              opacity: "0",
                            };
                        return (
                          <div
                            className="sparkle"
                            style={{
                              ...{
                                background: enemyColor,
                                width: "27px",
                                height: "27px",
                                transition: "all .3s",
                              },
                              ...transform,
                            }}
                          ></div>
                        );
                      })}
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </table>
      </div>
    </>
  );
};
