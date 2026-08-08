import "aframe";

import {
    useCallback,
    useEffect,
    useRef,
    useState
} from "react";

import "./CodeKidsIsland.css";

import stages from "./stages.js";


/* =====================================================
   IMAGE MATERIAL
===================================================== */

const imageMaterial = `
    shader: standard;
    transparent: true;
    alphaTest: 0.05;
    side: double;
`;


/* =====================================================
   TREE IMAGE
===================================================== */

function TreeImage({
    type = "round",
    position = "0 0 0",
    width = 3,
    height = 4,
    rotation = "0 0 0"
}) {

    const images = {

        big: "/images/tree-big.png",

        pine: "/images/tree-pine.png",

        round: "/images/tree-round.png"

    };


    return (

        <a-image
            src={images[type]}
            position={position}
            width={width}
            height={height}
            rotation={rotation}
            material={imageMaterial}
        />

    );
}


/* =====================================================
   HOUSE IMAGE
===================================================== */

function HouseImage({
    type = "red",
    position = "0 0 0",
    width = 4,
    height = 4
}) {

    const image =
        type === "blue"
            ? "/images/house-blue.png"
            : "/images/house-red.png";


    return (

        <a-image
            src={image}
            position={position}
            width={width}
            height={height}
            material={imageMaterial}
        />

    );
}


/* =====================================================
   WATERFALL
===================================================== */

function Waterfall() {

    return (

        <a-image
            src="/images/waterfall.png"
            position="10 2.7 -5"
            width="5"
            height="6"
            material={imageMaterial}
        />

    );
}


/* =====================================================
   CASTLE
===================================================== */

function Castle() {

    return (

        <a-image
            src="/images/code-kids-castle.png"
            position="0 4.5 -10"
            width="15"
            height="10"
            material={imageMaterial}
        />

    );
}


/* =====================================================
   CLOUD
===================================================== */

function Cloud({
    position,
    scale = "1 1 1"
}) {

    return (

        <a-entity
            position={position}
            scale={scale}
            animation="
                property: position;
                from: -18 10 -12;
                to: 18 10 -12;
                dur: 50000;
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


/* =====================================================
   FLOWER
===================================================== */

function Flower({
    position,
    color = "#FF5C8A"
}) {

    return (

        <a-entity
            position={position}
        >

            <a-cylinder
                position="0 0.25 0"
                radius="0.035"
                height="0.5"
                color="#319B46"
            />

            <a-sphere
                position="0 0.55 0"
                radius="0.14"
                color={color}
            />

        </a-entity>
    );
}


/* =====================================================
   ROCK
===================================================== */

function Rock({
    position,
    scale = "1 1 1"
}) {

    return (

        <a-entity
            position={position}
            scale={scale}
        >

            <a-dodecahedron
                radius="0.7"
                color="#718096"
            />

            <a-dodecahedron
                radius="0.45"
                position="0.45 0.15 0.2"
                color="#8795A5"
            />

        </a-entity>
    );
}


/* =====================================================
   STAGE
===================================================== */

function Stage({
    stage,
    isLatest,
    onClick
}) {

    let ringColor = "#9CA3AF";


    if (stage.status === "completed") {

        ringColor = "#35D05A";

    }


    if (stage.status === "current") {

        ringColor = "#2196F3";

    }


    const unread =
        !stage.read &&
        (
            stage.status === "current" ||
            stage.status === "completed"
        );


    return (

        <a-entity
            position={`
                ${stage.x}
                ${stage.y}
                ${stage.z}
            `}
        >

            {/* =================================================
                MESSAGE
            ================================================= */}

            <a-entity
                position="0 2.2 0"
            >

                <a-plane
                    position="0 -0.05 -0.04"
                    width="3.8"
                    height="1.25"
                    color="#000000"
                    material="
                        opacity:0.15;
                        transparent:true;
                    "
                />


                <a-plane
                    position="0 0 0"
                    width="3.8"
                    height="1.25"
                    color="#FFFFFF"
                    material="
                        opacity:0.94;
                        transparent:true;
                        side:double;
                    "
                />


                <a-triangle
                    position="0 -0.72 0"
                    rotation="0 0 180"
                    vertex-a="0 0.18 0"
                    vertex-b="-0.18 -0.15 0"
                    vertex-c="0.18 -0.15 0"
                    color="#FFFFFF"
                />


                <a-text
                    value={stage.name}
                    align="center"
                    color="#243B53"
                    width="4.5"
                    position="0 0.25 0.02"
                />


                {stage.read ? (

                    <a-text
                        value="✓ مقروءة"
                        align="center"
                        color="#2E9D4D"
                        width="3"
                        position="0 -0.15 0.02"
                    />

                ) : unread ? (

                    <a-text
                        value="🔴 غير مقروءة"
                        align="center"
                        color="#E53935"
                        width="3"
                        position="0 -0.15 0.02"
                    />

                ) : null}


                {isLatest && (

                    <a-text
                        value="⭐ آخر حصة"
                        align="center"
                        color="#F5A623"
                        width="3.4"
                        position="0 0.65 0.02"
                    />

                )}

            </a-entity>


            {/* =================================================
                GOLD PLATFORM
            ================================================= */}

            <a-cylinder
                position="0 0.05 0"
                radius="1.25"
                height="0.25"
                color="#F6C945"
            />


            <a-cylinder
                position="0 -0.08 0"
                radius="1.35"
                height="0.08"
                color="#B8871D"
            />


            {/* =================================================
                RING
            ================================================= */}

            <a-torus
                position="0 0.22 0"
                radius="1.12"
                radius-tubular="0.10"
                rotation="90 0 0"
                color={ringColor}
            />


            {/* =================================================
                CURRENT ANIMATION
            ================================================= */}

            {stage.status === "current" && (

                <a-torus
                    position="0 0.28 0"
                    radius="1.42"
                    radius-tubular="0.07"
                    rotation="90 0 0"
                    color="#FFD93D"
                    animation="
                        property: scale;
                        from: 1 1 1;
                        to: 1.15 1.15 1.15;
                        dur: 900;
                        loop: true;
                        dir: alternate;
                        easing: easeInOutSine;
                    "
                />

            )}


            {/* =================================================
                NUMBER
            ================================================= */}

            <a-sphere
                position="0 0.42 0"
                radius="0.75"
                color={
                    stage.status === "completed"
                        ? "#45C84A"
                        : stage.status === "current"
                            ? "#2196F3"
                            : "#6B7280"
                }
            />


            <a-text
                value={`${stage.id}`}
                align="center"
                color="#FFFFFF"
                width="2.8"
                position="0 0.25 0.76"
            />


            {/* =================================================
                STARS
            ================================================= */}

            {stage.status !== "locked" && (

                <a-text
                    value="★★★"
                    align="center"
                    color="#FFD43B"
                    width="3"
                    position="0 -0.35 0"
                />

            )}


            {/* =================================================
                LOCK
            ================================================= */}

            {stage.status === "locked" && (

                <a-text
                    value="🔒"
                    align="center"
                    color="#FFFFFF"
                    width="2"
                    position="0 0.15 0.78"
                />

            )}


            {/* =================================================
                CLICK
            ================================================= */}

            <a-cylinder
                position="0 0.35 0"
                radius="1.45"
                height="0.5"
                material="
                    opacity:0;
                    transparent:true;
                "
                class="clickable"
                onClick={() =>
                    onClick(stage)
                }
            />

        </a-entity>
    );
}


/* =====================================================
   PLAYER + FOLLOW CAMERA
===================================================== */
function PlayerController({
    position,
    onStageEnter,
    controls
}) {

    const playerRef = useRef(null);

    const currentStageRef = useRef(null);

    const keysRef = useRef({});

    const controlsRef = useRef(controls);

    const velocityRef = useRef({
        x: 0,
        z: 0
    });


    useEffect(() => {

        controlsRef.current = controls;

    }, [controls]);


    useEffect(() => {

        const player = playerRef.current;

        if (!player) return;


        const keys = keysRef.current;


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


        let frame;


        const loop = () => {

            const object = player.object3D;


            let inputX = 0;

            let inputZ = 0;


            const mobile = controlsRef.current;


            /* ===============================
               KEYBOARD
            =============================== */

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


            /* ===============================
               MOBILE
            =============================== */

            if (mobile.left) {

                inputX -= 1;

            }

            if (mobile.right) {

                inputX += 1;

            }

            if (mobile.up) {

                inputZ -= 1;

            }

            if (mobile.down) {

                inputZ += 1;

            }


            /* ===============================
               NORMALIZE
            =============================== */

            if (
                inputX !== 0 &&
                inputZ !== 0
            ) {

                inputX *= 0.707;

                inputZ *= 0.707;

            }


            /* ===============================
               MOVEMENT
            =============================== */

            const velocity =
                velocityRef.current;


            const acceleration = 0.018;


            if (inputX !== 0) {

                velocity.x +=
                    inputX *
                    acceleration;

            }


            if (inputZ !== 0) {

                velocity.z +=
                    inputZ *
                    acceleration;

            }


            /* ===============================
               FRICTION
            =============================== */

            velocity.x *= 0.82;

            velocity.z *= 0.82;


            /* ===============================
               MAX SPEED
            =============================== */

            const maxSpeed = 0.14;


            velocity.x =
                Math.max(
                    -maxSpeed,
                    Math.min(
                        maxSpeed,
                        velocity.x
                    )
                );


            velocity.z =
                Math.max(
                    -maxSpeed,
                    Math.min(
                        maxSpeed,
                        velocity.z
                    )
                );


            /* ===============================
               POSITION
            =============================== */

            const newX =
                object.position.x +
                velocity.x;


            const newZ =
                object.position.z +
                velocity.z;


            /* ===============================
               ISLAND BOUNDARY
            =============================== */

            const islandRadius = 12;


            const distance =
                Math.sqrt(
                    newX * newX +
                    newZ * newZ
                );


            if (
                distance <
                islandRadius
            ) {

                object.position.x =
                    newX;

                object.position.z =
                    newZ;

            } else {

                velocity.x *= 0.1;

                velocity.z *= 0.1;

            }


            /* ===============================
               STAGE DETECTION
            =============================== */

            let nearStage = null;


            stages.forEach((stage) => {

                const dx =
                    object.position.x -
                    stage.x;


                const dz =
                    object.position.z -
                    stage.z;


                const stageDistance =
                    Math.sqrt(
                        dx * dx +
                        dz * dz
                    );


                if (
                    stageDistance <
                    1.55
                ) {

                    nearStage = stage;

                }

            });


            /* ===============================
               ENTER STAGE
            =============================== */

            if (
                nearStage &&
                currentStageRef.current !==
                nearStage.id
            ) {

                currentStageRef.current =
                    nearStage.id;


                onStageEnter(
                    nearStage
                );

            }


            /* ===============================
               LEAVE STAGE
            =============================== */

            if (!nearStage) {

                currentStageRef.current =
                    null;

            }


            frame =
                requestAnimationFrame(
                    loop
                );

        };


        loop();


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
                frame
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

            {/* ===============================
                BODY
            =============================== */}

            <a-cylinder
                position="0 0.75 0"
                radius="0.32"
                height="0.9"
                color="#2474D2"
            />


            {/* ===============================
                HEAD
            =============================== */}

            <a-sphere
                position="0 1.45 0"
                radius="0.35"
                color="#F5C6A5"
            />


            {/* ===============================
                HAIR
            =============================== */}

            <a-sphere
                position="0 1.68 -0.02"
                radius="0.36"
                color="#5A3825"
                scale="1 0.5 1"
            />


            {/* ===============================
                BACKPACK
            =============================== */}

            <a-box
                position="0 0.8 0.35"
                width="0.5"
                height="0.6"
                depth="0.2"
                color="#FFD43B"
            />


            {/* ===============================
                LEFT LEG
            =============================== */}

            <a-cylinder
                position="-0.16 0.2 0"
                radius="0.1"
                height="0.4"
                color="#263238"
            />


            {/* ===============================
                RIGHT LEG
            =============================== */}

            <a-cylinder
                position="0.16 0.2 0"
                radius="0.1"
                height="0.4"
                color="#263238"
            />


            {/* ===============================
                NAME
            =============================== */}

            <a-text
                value="YOU"
                align="center"
                color="#FFFFFF"
                width="2"
                position="0 2.15 0"
            />


            {/* ===============================
                CAMERA
                LOW THIRD PERSON
            =============================== */}

            <a-camera
                position="0 3.0 6.8"
                rotation="-7 0 0"
                look-controls="
                    enabled: false;
                    pointerLockEnabled: false;
                "
                wasd-controls="
                    enabled: false;
                "
            />

        </a-entity>

    );
}


/* =====================================================
   MAIN COMPONENT
===================================================== */

function CodeKidsIsland() {

    /* =================================================
       SELECTED STAGE
    ================================================= */

    const [
        selectedStage,
        setSelectedStage
    ] = useState(null);


    /* =================================================
       READ STAGES
    ================================================= */

    const [
        readStages,
        setReadStages
    ] = useState(() => {

        const saved =
            localStorage.getItem(
                "codeKidsReadStages"
            );


        return saved
            ? JSON.parse(saved)
            : [];

    });


    /* =================================================
       MOBILE CONTROLS
    ================================================= */

    const [
        controls,
        setControls
    ] = useState({

        up: false,

        down: false,

        left: false,

        right: false

    });


    /* =================================================
       CURRENT STAGE
    ================================================= */

    const currentStage =
        stages.find(
            stage =>
                stage.status ===
                "current"
        );


    /* =================================================
       PLAYER START
    ================================================= */

    const playerStart = {

        x: currentStage
            ? currentStage.x
            : 0,

        z: currentStage
            ? currentStage.z + 2
            : 6

    };


    /* =================================================
       LATEST STAGE
    ================================================= */

    const latestStage =
        stages[
            stages.length - 1
        ];


    /* =================================================
       MARK AS READ
    ================================================= */

    const markAsRead =
        useCallback(
            (stage) => {

                setReadStages(
                    prev => {

                        if (
                            prev.includes(
                                stage.id
                            )
                        ) {

                            return prev;

                        }


                        const next = [

                            ...prev,

                            stage.id

                        ];


                        localStorage.setItem(
                            "codeKidsReadStages",
                            JSON.stringify(
                                next
                            )
                        );


                        return next;

                    }
                );

            },
            []
        );


    /* =================================================
       STAGE ENTER
    ================================================= */

    const handleStageEnter =
        useCallback(
            (stage) => {

                setSelectedStage(
                    stage
                );

            },
            []
        );


    /* =================================================
       STAGE CLICK
    ================================================= */

    const handleStageClick =
        (stage) => {

            setSelectedStage(
                stage
            );

        };


    /* =================================================
       CLOSE MODAL
    ================================================= */

    const closeModal =
        () => {

            if (
                selectedStage
            ) {

                markAsRead(
                    selectedStage
                );

            }


            setSelectedStage(
                null
            );

        };


    /* =================================================
       PRESS BUTTON
    ================================================= */

    const press =
        (direction) => {

            setControls(
                prev => ({

                    ...prev,

                    [direction]:
                        true

                })
            );

        };


    /* =================================================
       RELEASE BUTTON
    ================================================= */

    const release =
        (direction) => {

            setControls(
                prev => ({

                    ...prev,

                    [direction]:
                        false

                })
            );

        };


    /* =================================================
       BUTTON EVENTS
    ================================================= */

    const buttonEvents =
        (direction) => ({

            onTouchStart: (event) => {

                event.preventDefault();

                press(direction);

            },


            onTouchEnd: (event) => {

                event.preventDefault();

                release(direction);

            },


            onTouchCancel: () => {

                release(direction);

            },


            onMouseDown: () => {

                press(direction);

            },


            onMouseUp: () => {

                release(direction);

            },


            onMouseLeave: () => {

                release(direction);

            }

        });


    return (

        <div className="code-kids-world">

            {/* =================================================
                A-FRAME SCENE
            ================================================= */}

            <a-scene
                embedded

                renderer="
                    antialias: true;
                    colorManagement: true;
                    physicallyCorrectLights: true;
                "

                vr-mode-ui="
                    enabled: false;
                "

                device-orientation-permission-ui="
                    enabled: false;
                "

                background="
                    color: #65CFFF;
                "

                fog="
                    type: exponential;
                    color: #8BD8FF;
                    density: 0.004;
                "
            >

                {/* =================================================
                    SKY
                ================================================= */}

                <a-sky
                    color="#65CFFF"
                />


                {/* =================================================
                    LIGHT
                ================================================= */}

                <a-light
                    type="ambient"
                    intensity="1.7"
                    color="#FFFFFF"
                />


                <a-light
                    type="directional"
                    position="-8 15 10"
                    intensity="2.2"
                    castShadow="true"
                />


                {/* =================================================
                    OCEAN
                ================================================= */}

                <a-plane
                    position="0 -1.5 0"
                    rotation="-90 0 0"
                    width="100"
                    height="100"
                    color="#18BCE7"
                    material="
                        roughness:0.25;
                        metalness:0;
                    "
                />


                {/* =================================================
                    ISLAND BASE
                ================================================= */}

                <a-cylinder
                    position="0 -1 0"
                    radius="15"
                    height="2"
                    color="#236B38"
                />


                {/* =================================================
                    ISLAND GRASS
                ================================================= */}

                <a-cylinder
                    position="0 -0.1 0"
                    radius="14"
                    height="0.7"
                    color="#67C95A"
                />


                {/* =================================================
                    BEACH
                ================================================= */}

                <a-ring
                    position="0 0.27 0"
                    rotation="-90 0 0"
                    radius-inner="12.2"
                    radius-outer="14"
                    color="#F3D58A"
                />


                {/* =================================================
                    OCEAN IMAGE
                    Optional visual layer
                ================================================= */}

                <a-image
                    src="/images/ocean.png"
                    position="0 -1.45 -15"
                    width="40"
                    height="15"
                    rotation="0 0 0"
                    material="
                        transparent: true;
                        alphaTest: 0.05;
                        side: double;
                    "
                />


                {/* =================================================
                    ROADS
                ================================================= */}

                <a-box
                    position="0 0.38 4"
                    rotation="0 0 4"
                    width="2.2"
                    height="0.12"
                    depth="14"
                    color="#D9AE65"
                />


                <a-box
                    position="-4 0.4 -1"
                    rotation="0 0 55"
                    width="2"
                    height="0.12"
                    depth="10"
                    color="#D9AE65"
                />


                <a-box
                    position="4 0.4 -4"
                    rotation="0 0 -45"
                    width="2"
                    height="0.12"
                    depth="10"
                    color="#D9AE65"
                />


                <a-box
                    position="0 0.4 -7"
                    rotation="0 0 0"
                    width="2"
                    height="0.12"
                    depth="7"
                    color="#D9AE65"
                />


                {/* =================================================
                    TREES
                ================================================= */}

                <TreeImage
                    type="big"
                    position="-9 2.1 -4"
                    width="3.5"
                    height="4.5"
                />


                <TreeImage
                    type="round"
                    position="-10 1.8 5"
                    width="3"
                    height="4"
                />


                <TreeImage
                    type="pine"
                    position="-7 2.1 -9"
                    width="2.8"
                    height="4.5"
                />


                <TreeImage
                    type="big"
                    position="10 2.1 5"
                    width="3.5"
                    height="4.5"
                />


                <TreeImage
                    type="round"
                    position="10 1.8 -5"
                    width="3"
                    height="4"
                />


                <TreeImage
                    type="pine"
                    position="6 2.1 -9"
                    width="2.8"
                    height="4.5"
                />


                <TreeImage
                    type="round"
                    position="-2 1.7 -10"
                    width="2.8"
                    height="3.8"
                />


                <TreeImage
                    type="big"
                    position="7 2 8"
                    width="3.2"
                    height="4.2"
                />


                {/* =================================================
                    HOUSES
                ================================================= */}

                <HouseImage
                    type="red"
                    position="-8 3 2"
                    width="9"
                    height="7"
                />


                <HouseImage
                    type="blue"
                    position="8 3 -2"
                    width="9"
                    height="7"
                />


                {/* =================================================
                    WATERFALL
                ================================================= */}

                <Waterfall />


                {/* =================================================
                    ROCKS
                ================================================= */}

                <Rock
                    position="-11 0.4 -2"
                    scale="1.3 1.3 1.3"
                />


                <Rock
                    position="11 0.4 1"
                    scale="1.2 1.2 1.2"
                />


                <Rock
                    position="8 0.4 -8"
                />


                <Rock
                    position="-7 0.4 8"
                />


                {/* =================================================
                    FLOWERS
                ================================================= */}

                <Flower
                    position="-6 0 -3"
                    color="#FF5C8A"
                />


                <Flower
                    position="-5.5 0 -3.5"
                    color="#FFD43B"
                />


                <Flower
                    position="5 0 2"
                    color="#FF5C8A"
                />


                <Flower
                    position="5.5 0 2.5"
                    color="#A855F7"
                />


                <Flower
                    position="1 0 -6"
                    color="#FFD43B"
                />


                <Flower
                    position="-2 0 -5"
                    color="#FF5C8A"
                />


                {/* =================================================
                    CASTLE
                ================================================= */}

                <Castle />


                {/* =================================================
                    CASTLE TITLE
                ================================================= */}

                <a-text
                    value="CODE KIDS"
                    position="0 6.7 -9.3"
                    align="center"
                    width="8"
                    color="#FFD43B"
                />


                {/* =================================================
                    STAGES
                ================================================= */}

                {stages.map(
                    (stage) => {

                        const stageData = {

                            ...stage,

                            read:
                                readStages.includes(
                                    stage.id
                                ) ||
                                stage.read

                        };


                        return (

                            <Stage
                                key={
                                    stage.id
                                }

                                stage={
                                    stageData
                                }

                                isLatest={
                                    stage.id ===
                                    latestStage.id
                                }

                                onClick={
                                    handleStageClick
                                }

                            />

                        );

                    }
                )}


                {/* =================================================
                    PLAYER
                ================================================= */}

                <PlayerController
                    position={
                        playerStart
                    }

                    onStageEnter={
                        handleStageEnter
                    }

                    controls={
                        controls
                    }
                />


                {/* =================================================
                    CLOUDS
                ================================================= */}

                <Cloud
                    position="-15 9 -10"
                    scale="1.5 1.5 1.5"
                />


                <Cloud
                    position="6 10 -15"
                    scale="1.3 1.3 1.3"
                />


                <Cloud
                    position="15 8 -5"
                    scale="1.1 1.1 1.1"
                />

            </a-scene>


            {/* =================================================
                MOBILE CONTROLS
            ================================================= */}

            <div className="mobile-controls">

                <button
                    className="control-up"
                    {...buttonEvents("up")}
                >
                    ▲
                </button>


                <div className="horizontal-controls">

                    <button
                        {...buttonEvents("left")}
                    >
                        ◀
                    </button>


                    <button
                        {...buttonEvents("down")}
                    >
                        ▼
                    </button>


                    <button
                        {...buttonEvents("right")}
                    >
                        ▶
                    </button>

                </div>

            </div>


            {/* =================================================
                STAGE MODAL
            ================================================= */}

            {selectedStage && (

                <div
                    className="stage-modal-overlay"
                    onClick={
                        closeModal
                    }
                >

                    <div
                        className="stage-modal"
                        onClick={
                            (event) =>
                                event.stopPropagation()
                        }
                    >

                        {/* CLOSE */}

                        <button
                            className="modal-close"
                            onClick={
                                closeModal
                            }
                        >
                            ×
                        </button>


                        {/* ICON */}

                        <div className="modal-stage-icon">

                            {
                                selectedStage.status ===
                                "completed"

                                    ? "✓"

                                    : selectedStage.status ===
                                      "current"

                                        ? "⭐"

                                        : "🔒"
                            }

                        </div>


                        {/* TITLE */}

                        <h2>

                            {
                                selectedStage.name
                            }

                        </h2>


                        {/* NUMBER */}

                        <div
                            className="
                                modal-stage-number
                            "
                        >

                            المرحلة{" "}

                            {
                                selectedStage.id
                            }

                        </div>


                        {/* LAST LESSON */}

                        {selectedStage.id ===
                            latestStage.id && (

                            <div
                                className="
                                    latest-badge
                                "
                            >

                                ⭐ آخر حصة

                            </div>

                        )}


                        {/* UNREAD */}

                        {!(
                            readStages.includes(
                                selectedStage.id
                            ) ||
                            selectedStage.read
                        ) && (

                            <div
                                className="
                                    unread-badge
                                "
                            >

                                🔴 هذه الحصة
                                لم تُقرأ بعد

                            </div>

                        )}


                        {/* LESSON */}

                        <div
                            className="
                                modal-section
                            "
                        >

                            <span>
                                📚 درس اليوم
                            </span>

                            <p>

                                {
                                    selectedStage.lesson
                                }

                            </p>

                        </div>


                        {/* EXPLANATION */}

                        <div
                            className="
                                modal-section
                            "
                        >

                            <span>
                                💡 ماذا تعلمنا؟
                            </span>

                            <p>

                                {
                                    selectedStage.explanation
                                }

                            </p>

                        </div>


                        {/* EVALUATION */}

                        {selectedStage.evaluation && (

                            <div
                                className="
                                    modal-section
                                "
                            >

                                <span>
                                    ⭐ تقييم الطفل
                                </span>

                                <p>

                                    {
                                        selectedStage.evaluation
                                    }

                                </p>

                            </div>

                        )}


                        {/* NOTES */}

                        {selectedStage.notes && (

                            <div
                                className="
                                    modal-section
                                "
                            >

                                <span>
                                    👨‍🏫 ملاحظات المدرس
                                </span>

                                <p>

                                    {
                                        selectedStage.notes
                                    }

                                </p>

                            </div>

                        )}


                        {/* BUTTON */}

                        <button
                            className="
                                modal-button
                            "
                            onClick={
                                closeModal
                            }
                        >

                            قرأت الحصة
                            واستمرار الرحلة 🚀

                        </button>

                    </div>

                </div>

            )}

        </div>
    );
}


export default CodeKidsIsland;