import "aframe";
import { useEffect, useRef, useState } from "react";
import "./CodeKidsIsland.css";
import stages from "./stages.js";



/* =========================================
   TREE
========================================= */

function Tree({ position, scale = "1 1 1" }) {

    return (
        <a-entity
            position={position}
            scale={scale}
        >

            <a-cylinder
                position="0 0.8 0"
                radius="0.25"
                height="1.6"
                color="#75462A"
            />

            <a-cone
                position="0 2 0"
                radius-bottom="1"
                radius-top="0.15"
                height="1.8"
                color="#2E8B57"
            />

            <a-cone
                position="0 2.7 0"
                radius-bottom="0.75"
                radius-top="0.1"
                height="1.4"
                color="#3FAE62"
            />

        </a-entity>
    );
}


/* =========================================
   CLOUD
========================================= */

function Cloud({ position, scale = "1 1 1" }) {

    return (

        <a-entity
            position={position}
            scale={scale}

            animation="
                property: position;
                to: 15 8 -18;
                dur: 45000;
                loop: true;
                easing: linear;
            "
        >

            <a-sphere
                position="0 0 0"
                radius="1"
                color="#FFFFFF"
            />

            <a-sphere
                position="1 0.2 0"
                radius="1.2"
                color="#FFFFFF"
            />

            <a-sphere
                position="2 0 0"
                radius="0.9"
                color="#FFFFFF"
            />

            <a-sphere
                position="1 -0.25 0"
                radius="0.8"
                color="#FFFFFF"
            />

        </a-entity>
    );
}


/* =========================================
   STAGE
========================================= */

function Stage({ stage }) {

    let color = "#999999";

    if (stage.status === "completed") {
        color = "#35D05A";
    }

    if (stage.status === "current") {
        color = "#2196F3";
    }

    return (

        <a-entity
            position={`${stage.x} ${stage.y} ${stage.z}`}
        >

            {/* منصة المرحلة */}

            <a-cylinder
                radius="0.85"
                height="0.18"
                color="#E8C47A"
            />

            {/* الحلقة */}

            <a-torus
                radius="0.85"
                radius-tubular="0.07"
                color={color}
                rotation="90 0 0"
            />

            {/* المرحلة الحالية */}

            {stage.status === "current" && (

                <a-torus
                    radius="1.15"
                    radius-tubular="0.05"
                    color="#FFD93D"
                    rotation="90 0 0"

                    animation="
                        property: scale;
                        from: 1 1 1;
                        to: 1.3 1.3 1.3;
                        dur: 1000;
                        loop: true;
                        dir: alternate;
                    "
                />

            )}

            {/* رقم المرحلة */}

            <a-text
                value={`${stage.id}`}
                align="center"
                color="#FFFFFF"
                width="2"
                position="0 0.25 0"
            />

            {/* اسم المرحلة */}

            <a-text
                value={stage.name}
                align="center"
                color="#FFFFFF"
                width="3"
                position="0 0.75 0"
            />

            {/* مكتملة */}

            {stage.status === "completed" && (

                <a-text
                    value="✓"
                    align="center"
                    color="#35D05A"
                    width="1.5"
                    position="0 1.15 0"
                />

            )}

            {/* مقفولة */}

            {stage.status === "locked" && (

                <a-text
                    value="LOCKED"
                    align="center"
                    color="#FFFFFF"
                    width="2"
                    position="0 1.15 0"
                />

            )}

        </a-entity>
    );
}


/* =========================================
   PLAYER
========================================= */

function PlayerController({ position, onStageEnter }) {

    const playerRef = useRef(null);

    const currentStageRef = useRef(null);

    useEffect(() => {

        const player = playerRef.current;

        if (!player) return;

        const keys = {};

        // سرعة اللاعب الحالية
        let velocityX = 0;
        let velocityZ = 0;

        const acceleration = 0.012;
        const maxSpeed = 0.10;

        // نعومة التوقف
        const friction = 0.82;

        const handleKeyDown = (event) => {

            keys[event.key.toLowerCase()] = true;

        };

        const handleKeyUp = (event) => {

            keys[event.key.toLowerCase()] = false;

        };

        window.addEventListener(
            "keydown",
            handleKeyDown
        );

        window.addEventListener(
            "keyup",
            handleKeyUp
        );


        let animationFrame;


        const gameLoop = () => {

            const object = player.object3D;


            /*
            =================================
            INPUT
            =================================
            */

            let inputX = 0;
            let inputZ = 0;


            if (
                keys["a"] ||
                keys["arrowleft"]
            ) {

                inputX -= 1;

            }


            if (
                keys["d"] ||
                keys["arrowright"]
            ) {

                inputX += 1;

            }


            if (
                keys["w"] ||
                keys["arrowup"]
            ) {

                inputZ -= 1;

            }


            if (
                keys["s"] ||
                keys["arrowdown"]
            ) {

                inputZ += 1;

            }


            /*
            =================================
            ACCELERATION
            =================================
            */

            if (inputX !== 0) {

                velocityX +=
                    inputX * acceleration;

            }

            if (inputZ !== 0) {

                velocityZ +=
                    inputZ * acceleration;

            }


            /*
            =================================
            LIMIT SPEED
            =================================
            */

            velocityX = Math.max(
                -maxSpeed,
                Math.min(maxSpeed, velocityX)
            );

            velocityZ = Math.max(
                -maxSpeed,
                Math.min(maxSpeed, velocityZ)
            );


            /*
            =================================
            FRICTION
            =================================
            */

            if (inputX === 0) {

                velocityX *= friction;

            }

            if (inputZ === 0) {

                velocityZ *= friction;

            }


            /*
            =================================
            NEW POSITION
            =================================
            */

            const newX =
                object.position.x + velocityX;

            const newZ =
                object.position.z + velocityZ;


            /*
            =================================
            ISLAND BOUNDARY
            =================================
            */

            const distance = Math.sqrt(
                newX * newX +
                newZ * newZ
            );

            const maxDistance = 9.2;


            if (distance < maxDistance) {

                object.position.x = newX;
                object.position.z = newZ;

            } else {

                // لو وصل الحافة
                // نوقف الحركة

                velocityX *= 0.2;
                velocityZ *= 0.2;

            }


            /*
            =================================
            CHECK STAGES
            =================================
            */

            let nearStage = null;

            stages.forEach((stage) => {

                const dx =
                    object.position.x - stage.x;

                const dz =
                    object.position.z - stage.z;

                const stageDistance =
                    Math.sqrt(
                        dx * dx +
                        dz * dz
                    );


                if (stageDistance < 1.25) {

                    nearStage = stage;

                }

            });


            /*
            =================================
            ENTER STAGE
            =================================
            */

            if (
                nearStage &&
                currentStageRef.current !== nearStage.id
            ) {

                currentStageRef.current =
                    nearStage.id;

                onStageEnter(nearStage);

            }


            /*
            =================================
            LEAVE STAGE
            =================================
            */

            if (!nearStage) {

                currentStageRef.current = null;

            }


            animationFrame =
                requestAnimationFrame(gameLoop);

        };


        gameLoop();


        return () => {

            window.removeEventListener(
                "keydown",
                handleKeyDown
            );

            window.removeEventListener(
                "keyup",
                handleKeyUp
            );

            cancelAnimationFrame(
                animationFrame
            );

        };

    }, [onStageEnter]);


    return (

        <a-entity
            ref={playerRef}
            position={`
                ${position.x}
                0.25
                ${position.z}
            `}
        >

            {/* BODY */}

            <a-cylinder
                position="0 0.75 0"
                radius="0.32"
                height="0.9"
                color="#2474D2"
            />


            {/* HEAD */}

            <a-sphere
                position="0 1.45 0"
                radius="0.35"
                color="#F5C6A5"
            />


            {/* HAIR */}

            <a-sphere
                position="0 1.68 -0.03"
                radius="0.36"
                color="#5A3825"
                scale="1 0.5 1"
            />


            {/* BACKPACK */}

            <a-box
                position="0 0.8 0.35"
                width="0.5"
                height="0.6"
                depth="0.2"
                color="#FFD43B"
            />


            {/* LEFT LEG */}

            <a-cylinder
                position="-0.16 0.2 0"
                radius="0.1"
                height="0.4"
                color="#263238"
            />


            {/* RIGHT LEG */}

            <a-cylinder
                position="0.16 0.2 0"
                radius="0.1"
                height="0.4"
                color="#263238"
            />


            {/* NAME */}

            <a-text
                value="YOU"
                align="center"
                color="#FFFFFF"
                width="2"
                position="0 2.1 0"
            />


            {/* CAMERA */}

            <a-camera
                position="0 3.3 5.5"
                look-controls="enabled: false"
                wasd-controls="enabled: false"
            />

        </a-entity>

    );

}

/* =========================================
   MAIN
========================================= */
function CodeKidsIsland() {

    const [selectedStage, setSelectedStage] =
        useState(null);


    const currentStage =
        stages.find(
            stage =>
                stage.status === "current"
        );


    const playerStart = {

        x: currentStage
            ? currentStage.x
            : 0,

        z: currentStage
            ? currentStage.z
            : 5

    };


    const handleStageEnter = (stage) => {

        setSelectedStage(stage);

    };


    const closeModal = () => {

        setSelectedStage(null);

    };


    return (

        <div className="code-kids-world">


            {/* =================================
                3D WORLD
            ================================= */}

            <a-scene
                embedded
                renderer="
                    antialias: true;
                    colorManagement: true;
                "
                fog="
                    type: exponential;
                    color: #8bd8ff;
                    density: 0.015;
                "
            >

                {/* SKY */}

                <a-sky
                    color="#75D5FF"
                />


                {/* LIGHT */}

                <a-light
                    type="ambient"
                    intensity="1.8"
                    color="#FFFFFF"
                />

                <a-light
                    type="directional"
                    position="-5 12 8"
                    intensity="2"
                />


                {/* OCEAN */}

                <a-plane
                    position="0 -1.5 0"
                    rotation="-90 0 0"
                    width="80"
                    height="80"
                    color="#24BFEA"
                    material="
                        roughness:0.2;
                        metalness:0;
                        opacity:0.9;
                        transparent:true;
                    "
                />


                {/* ISLAND */}

                <a-cylinder
                    position="0 -0.8 0"
                    radius="12"
                    height="1.5"
                    color="#3D8F45"
                />

                <a-cylinder
                    position="0 0"
                    radius="11.5"
                    height="0.45"
                    color="#65C95A"
                />


                {/* BEACH */}

                <a-ring
                    position="0 0.24 0"
                    rotation="-90 0 0"
                    radius-inner="10.2"
                    radius-outer="11.5"
                    color="#F3D58A"
                />


                {/* ROAD */}

                <a-box
                    position="0 0.32 3"
                    rotation="0 0 8"
                    width="2"
                    height="0.12"
                    depth="14"
                    color="#D6A85D"
                />

                <a-box
                    position="-3 0.34 -3"
                    rotation="0 -20 90"
                    width="2"
                    height="0.12"
                    depth="8"
                    color="#D6A85D"
                />

                <a-box
                    position="3 0.36 -5"
                    rotation="0 0 35"
                    width="2"
                    height="0.12"
                    depth="8"
                    color="#D6A85D"
                />


                {/* TREES */}

                <Tree
                    position="-7 0 -4"
                    scale="1.2 1.2 1.2"
                />

                <Tree
                    position="-5 0 5"
                />

                <Tree
                    position="7 0 4"
                    scale="1.3 1.3 1.3"
                />

                <Tree
                    position="6 0 -5"
                />

                <Tree
                    position="2 0 -8"
                    scale="1.4 1.4 1.4"
                />

                <Tree
                    position="-2 0 -7"
                />


                {/* HOUSE */}

                <a-box
                    position="-5 1.3 2"
                    width="2.5"
                    height="2"
                    depth="2.5"
                    color="#F2A65A"
                />

                <a-cone
                    position="-5 2.9 2"
                    radius-bottom="2"
                    radius-top="0"
                    height="1.6"
                    color="#D94F4F"
                />


                {/* STAGES */}

                {stages.map((stage) => (

                    <Stage
                        key={stage.id}
                        stage={stage}
                    />

                ))}


                {/* PLAYER */}

                <PlayerController
                    position={playerStart}
                    onStageEnter={handleStageEnter}
                />


                {/* CASTLE */}

                <a-box
                    position="2 2 -7"
                    width="3"
                    height="4"
                    depth="3"
                    color="#B8C7E8"
                />

                <a-cylinder
                    position="0.7 3 -7"
                    radius="0.7"
                    height="5"
                    color="#AFC2E8"
                />

                <a-cone
                    position="0.7 6 -7"
                    radius-bottom="1"
                    radius-top="0"
                    height="1.8"
                    color="#6B5DD3"
                />

                <a-cylinder
                    position="3.3 3 -7"
                    radius="0.7"
                    height="5"
                    color="#AFC2E8"
                />

                <a-cone
                    position="3.3 6 -7"
                    radius-bottom="1"
                    radius-top="0"
                    height="1.8"
                    color="#6B5DD3"
                />


                {/* CODE KIDS */}

                <a-text
                    value="CODE KIDS"
                    position="0 5 -8"
                    align="center"
                    width="8"
                    color="#FFD43B"
                    side="double"
                />


                {/* CLOUDS */}

                <Cloud
                    position="-12 8 -10"
                    scale="1.5 1.5 1.5"
                />

                <Cloud
                    position="5 9 -15"
                    scale="1.2 1.2 1.2"
                />

                <Cloud
                    position="12 7 -5"
                />

            </a-scene>


            {/* =================================
                STAGE MODAL
            ================================= */}

            {selectedStage && (

                <div className="stage-modal-overlay">

                    <div className="stage-modal">


                        {/* CLOSE */}

                        <button
                            className="modal-close"
                            onClick={closeModal}
                        >
                            ×
                        </button>


                        {/* ICON */}

                        <div className="modal-stage-icon">

                            {selectedStage.status === "completed"
                                ? "✓"
                                : selectedStage.status === "current"
                                    ? "⭐"
                                    : "🔒"
                            }

                        </div>


                        {/* TITLE */}

                        <h2>

                            {selectedStage.name}

                        </h2>


                        <div className="modal-stage-number">

                            المرحلة {selectedStage.id}

                        </div>


                        {/* LESSON */}

                        <div className="modal-section">

                            <span>
                                📚 درس اليوم
                            </span>

                            <p>
                                {selectedStage.lesson}
                            </p>

                        </div>


                        {/* EXPLANATION */}

                        <div className="modal-section">

                            <span>
                                💡 ماذا تعلمنا؟
                            </span>

                            <p>
                                {selectedStage.explanation}
                            </p>

                        </div>


                        {/* EVALUATION */}

                        {selectedStage.evaluation && (

                            <div className="modal-section">

                                <span>
                                    ⭐ تقييم الطفل
                                </span>

                                <p>
                                    {selectedStage.evaluation}
                                </p>

                            </div>

                        )}


                        {/* NOTES */}

                        {selectedStage.notes && (

                            <div className="modal-section">

                                <span>
                                    👨‍🏫 ملاحظات المدرس
                                </span>

                                <p>
                                    {selectedStage.notes}
                                </p>

                            </div>

                        )}


                        <button
                            className="modal-button"
                            onClick={closeModal}
                        >

                            استمرار الرحلة 🚀

                        </button>


                    </div>

                </div>

            )}

        </div>
    );

}


export default CodeKidsIsland;