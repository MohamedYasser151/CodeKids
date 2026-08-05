import { useState } from "react";
import "./CodeKidsIsland.css";

import island from "../../assets/island.png";
import playerImage from "../../assets/player.png";

import stages from "./stages";

function CodeKidsIsland() {

    const [player, setPlayer] = useState({
        x: 250,
        y: 650
    });

    const moveToStage = (stage) => {

        setPlayer({
            x: stage.x,
            y: stage.y
        });

    };

    return (

        <div className="world">

            <div className="game-map">

                <img
                    src={island}
                    alt=""
                    className="world-map"
                />

                <img
                    src={playerImage}
                    alt=""
                    className="player"
                    style={{
                        left: player.x,
                        top: player.y
                    }}
                />

                {stages.map((stage) => (

                    <button

                        key={stage.id}

                        onClick={() => moveToStage(stage)}

                        className={`stage ${stage.status}`}

                        style={{
                            left: stage.x,
                            top: stage.y
                        }}

                    >

                        {stage.id}

                    </button>

                ))}

            </div>

        </div>

    );

}

export default CodeKidsIsland;