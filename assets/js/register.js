// =========================================================
// 1. UI SETUP (Rendered first so it never crashes)
// =========================================================

// --- PERKS DATA ---
const perks = [
    "IconPerks_aceInTheHole.webp", "IconPerks_adrenaline.webp", "IconPerks_aftercare.webp", "IconPerks_agitation.webp",
    "IconPerks_alert.webp", "IconPerks_alienInstinct.webp", "IconPerks_allShakingThunder.webp", "IconPerks_aNursesCalling.webp",
    "IconPerks_anyMeansNecessary.webp", "IconPerks_appraisal.webp", "IconPerks_autodidact.webp", "IconPerks_awakenedAwareness.webp",
    "IconPerks_babysitter.webp", "IconPerks_backgroundPlayer.webp", "IconPerks_balancedLanding.webp", "IconPerks_bamboozle.webp",
    "IconPerks_barbecueAndChilli.webp", "IconPerks_barbecueChili.webp", "IconPerks_bardicInspiration.webp", "IconPerks_batteriesIncluded.webp",
    "IconPerks_beastOfPrey.webp", "IconPerks_betterThanNew.webp", "IconPerks_betterTogether.webp", "IconPerks_biteTheBullet.webp",
    "IconPerks_bitterMurmur.webp", "IconPerks_blastMine.webp", "IconPerks_bloodEcho.webp", "IconPerks_bloodhound.webp",
    "IconPerks_bloodPact.webp", "IconPerks_bloodRush.webp", "IconPerks_bloodWarden.webp", "IconPerks_boilOver.webp",
    "IconPerks_bond.webp", "IconPerks_boonCircleOfHealing.webp", "IconPerks_boonDarkTheory.webp", "IconPerks_boonExponential.webp",
    "IconPerks_boonIllumination.webp", "IconPerks_boonShadowStep.webp", "IconPerks_borrowedTime.webp", "IconPerks_botanyKnowledge.webp",
    "IconPerks_breakdown.webp", "IconPerks_breakout.webp", "IconPerks_brutalStrength.webp", "IconPerks_buckleUp.webp",
    "IconPerks_builtToLast.webp", "IconPerks_callOfBrine.webp", "IconPerks_calmSpirit.webp", "IconPerks_camaraderie.webp",
    "IconPerks_championOfLight.webp", "IconPerks_chemicalTrap.webp", "IconPerks_clairvoyance.webp", "IconPerks_cleanBreak.webp",
    "IconPerks_correctiveAction.webp", "IconPerks_corruptIntervention.webp", "IconPerks_coulrophobia.webp", "IconPerks_counterforce.webp",
    "IconPerks_coupDeGrace.webp", "IconPerks_cruelLimits.webp", "IconPerks_cutLoose.webp", "IconPerks_danceWithMe.webp",
    "IconPerks_darkArrogance.webp", "IconPerks_darkDevotion.webp", "IconPerks_darknessRevealed.webp", "IconPerks_darkSense.webp",
    "IconPerks_deadHard.webp", "IconPerks_deadline.webp", "IconPerks_deadMansSwitch.webp", "IconPerks_deathbound.webp",
    "IconPerks_deception.webp", "IconPerks_decisiveStrike.webp", "IconPerks_deerstalker.webp", "IconPerks_dejaVu.webp",
    "IconPerks_deliverance.webp", "IconPerks_desperateMeasures.webp", "IconPerks_detectivesHunch.webp", "IconPerks_discordance.webp",
    "IconPerks_dissolution.webp", "IconPerks_distortion.webp", "IconPerks_distressing.webp", "IconPerks_diversion.webp",
    "IconPerks_Dominance.webp", "IconPerks_dragonsGrip.webp", "IconPerks_dramaturgy.webp", "IconPerks_dyingLight.webp",
    "IconPerks_empathicConnection.webp", "IconPerks_empathy.webp", "IconPerks_enduring.webp", "IconPerks_eruption.webp",
    "IconPerks_Exultation.webp", "IconPerks_EyesOfBelmont.webp", "IconPerks_fastTrack.webp", "IconPerks_finesse.webp",
    "IconPerks_fireUp.webp", "IconPerks_fixated.webp", "IconPerks_flashbang.webp", "IconPerks_flipFlop.webp", "IconPerks_flip-Flop.webp",
    "IconPerks_fogwise.webp", "IconPerks_forcedHesitation.webp", "IconPerks_forcedPenance.webp", "IconPerks_foreverEntwined.webp",
    "IconPerks_forThePeople.webp", "IconPerks_franklinsDemise.webp", "IconPerks_friendlyCompetition.webp", "IconPerks_friendsTilTheEnd.webp",
    "IconPerks_furtiveChase.webp", "IconPerks_gameAfoot.webp", "IconPerks_gearhead.webp", "IconPerks_geneticLimits.webp",
    "IconPerks_grimEmbrace.webp", "IconPerks_hardened.webp", "IconPerks_haywire.webp", "IconPerks_headOn.webp",
    "IconPerks_helpWanted.webp", "IconPerks_hexBloodFavour.webp", "IconPerks_hexCrowdControl.webp", "IconPerks_hexDevourHope.webp",
    "IconPerks_hexFaceTheDarkness.webp", "IconPerks_hexHauntedGround.webp", "IconPerks_hexHiveMind.webp", "IconPerks_hexHuntressLullaby.webp",
    "IconPerks_hexNoOneEscapesDeath.webp", "IconPerks_hexNothingButMisery.webp", "IconPerks_hexOvertureOfDoom.webp", "IconPerks_hexPentimento.webp",
    "IconPerks_hexRetribution.webp", "IconPerks_hexRuin.webp", "IconPerks_hexTheThirdSeal.webp", "IconPerks_hexThrillOfTheHunt.webp",
    "IconPerks_hexTwoCanPlay.webp", "IconPerks_hexUndying.webp", "IconPerks_HexWretchedFate.webp", "IconPerks_hoarder.webp",
    "IconPerks_hope.webp", "IconPerks_hubris.webp", "IconPerks_HumanGreed.webp", "IconPerks_hyperfocus.webp",
    "IconPerks_hysteria.webp", "IconPerks_imAllEars.webp", "IconPerks_infectiousFright.webp", "IconPerks_innerFocus.webp",
    "IconPerks_innerStrength.webp", "IconPerks_insidious.webp", "IconPerks_invocationTreacherousCrows.webp", "IconPerks_invocationWeavingSpiders.webp",
    "IconPerks_ironGrasp.webp", "IconPerks_ironMaiden.webp", "IconPerks_ironWill.webp", "IconPerks_kindred.webp",
    "IconPerks_knockOut.webp", "IconPerks_languidTouch.webp", "IconPerks_leader.webp", "IconPerks_leftBehind.webp",
    "IconPerks_lethalPursuer.webp", "IconPerks_leverage.webp", "IconPerks_lightborn.webp", "IconPerks_lightFooted.webp", "IconPerks_light-Footed.webp",
    "IconPerks_lightweight.webp", "IconPerks_lithe.webp", "IconPerks_lowProfile.webp", "IconPerks_luckyBreak.webp",
    "IconPerks_luckyStar.webp", "IconPerks_machineLearning.webp", "IconPerks_madeForThis.webp", "IconPerks_madGrit.webp",
    "IconPerks_makeYourChoice.webp", "IconPerks_mercilessStorm.webp", "IconPerks_mettleOfMan.webp", "IconPerks_mindbreaker.webp",
    "IconPerks_mirroredIllusion.webp", "IconPerks_MomentOfGlory.webp", "IconPerks_monitorAndAbuse.webp", "IconPerks_nemesis.webp",
    "IconPerks_noMither.webp", "IconPerks_noneAreFree.webp", "IconPerks_noOneLeftBehind.webp", "IconPerks_noQuarter.webp",
    "IconPerks_noWayOut.webp", "IconPerks_nowhereToHide.webp", "IconPerks_objectOfObsession.webp", "IconPerks_offTheRecord.webp",
    "IconPerks_openHanded.webp", "IconPerks_open-Handed.webp", "IconPerks_oppression.webp", "IconPerks_overcharge.webp",
    "IconPerks_overcome.webp", "IconPerks_overwhelmingPresence.webp", "IconPerks_overzealous.webp", "IconPerks_parentalGuidance.webp",
    "IconPerks_phantomFear.webp", "IconPerks_pharmacy.webp", "IconPerks_playWithYourFood.webp", "IconPerks_plotTwist.webp",
    "IconPerks_plunderersInstinct.webp", "IconPerks_poised.webp", "IconPerks_popGoesTheWeasel.webp", "IconPerks_potentialEnergy.webp",
    "IconPerks_powerStruggle.webp", "IconPerks_predator.webp", "IconPerks_premonition.webp", "IconPerks_proveThyself.webp",
    "IconPerks_quickGambit.webp", "IconPerks_quickAndQuiet.webp", "IconPerks_rancor.webp", "IconPerks_rapidBrutality.webp",
    "IconPerks_ravenous.webp", "IconPerks_reactiveHealing.webp", "IconPerks_reassurance.webp", "IconPerks_redHerring.webp",
    "IconPerks_rememberMe.webp", "IconPerks_repressedAlliance.webp", "IconPerks_residualManifest.webp", "IconPerks_resilience.webp",
    "IconPerks_resurgence.webp", "IconPerks_rookieSpirit.webp", "IconPerks_saboteur.webp", "IconPerks_saveTheBestForLast.webp",
    "IconPerks_scavenger.webp", "IconPerks_scenePartner.webp", "IconPerks_scourgeHookFloodsOfRage.webp", "IconPerks_scourgeHookHangmansTrick.webp",
    "IconPerks_scourgeHookJaggedCompass.webp", "IconPerks_scourgeHookMonstrousShrine.webp", "IconPerks_scourgeHookPainResonance.webp", "IconPerks_secondWind.webp",
    "IconPerks_secretProject.webp", "IconPerks_selfCare.webp", "IconPerks_self-Care.webp", "IconPerks_selfPreservation.webp", "IconPerks_self-Preservation.webp",
    "IconPerks_septicTouch.webp", "IconPerks_shadowborn.webp", "IconPerks_shatteredHope.webp", "IconPerks_shoulderTheBurden.webp",
    "IconPerks_slipperyMeat.webp", "IconPerks_sloppyButcher.webp", "IconPerks_smallGame.webp", "IconPerks_smashHit.webp",
    "IconPerks_soleSurvivor.webp", "IconPerks_solidarity.webp", "IconPerks_soulGuard.webp", "IconPerks_specialist.webp",
    "IconPerks_spiesFromTheShadows.webp", "IconPerks_spineChill.webp", "IconPerks_spiritFury.webp", "IconPerks_sprintBurst.webp",
    "IconPerks_stakeOut.webp", "IconPerks_starstruck.webp", "IconPerks_stillSight.webp", "IconPerks_streetwise.webp",
    "IconPerks_strengthInShadows.webp", "IconPerks_stridor.webp", "IconPerks_superiorAnatomy.webp", "IconPerks_surge.webp",
    "IconPerks_surveillance.webp", "IconPerks_teamworkCollectiveStealth.webp", "IconPerks_teamworkPowerOfTwo.webp", "IconPerks_technician.webp",
    "IconPerks_tenacity.webp", "IconPerks_terminus.webp", "IconPerks_territorialImperative.webp", "IconPerks_thanatophobia.webp",
    "IconPerks_thisIsNotHappening.webp", "IconPerks_thrillingTremors.webp", "IconPerks_thwack.webp", "IconPerks_tinkerer.webp",
    "IconPerks_trailOfTorment.webp", "IconPerks_troubleshooter.webp", "IconPerks_turnBackTheClock.webp", "IconPerks_ultimateWeapon.webp",
    "IconPerks_unbound.webp", "IconPerks_unbreakable.webp", "IconPerks_undone.webp", "IconPerks_unforeseen.webp",
    "IconPerks_unnervingPresence.webp", "IconPerks_unrelenting.webp", "IconPerks_upTheAnte.webp", "IconPerks_urbanEvasion.webp",
    "IconPerks_vigil.webp", "IconPerks_visionary.webp", "IconPerks_wakeUp.webp", "IconPerks_wanderingEye.webp",
    "IconPerks_weaveAttunement.webp", "IconPerks_wellMakeIt.webp", "IconPerks_wereGonnaLiveForever.webp", "IconPerks_whispers.webp",
    "IconPerks_wicked.webp", "IconPerks_windowsOfOpportunity.webp", "IconPerks_wiretap.webp", "IconPerks_zanshinTactics.webp"
];

let lockState = [perks[0], perks[0]];

function initScrollLocks() {
    const lockContainer = document.getElementById('combinationLock');
    if (!lockContainer) return;

    lockContainer.innerHTML = '';

    for (let i = 0; i < 2; i++) {
        const slotContainer = document.createElement('div');
        slotContainer.className = 'scroll-slot';

        perks.forEach((perkFile) => {
            const img = document.createElement('img');
            img.src = `../assets/images/perks/${perkFile}`;
            img.className = 'perk-option';

            if (perkFile === lockState[i]) {
                img.classList.add('selected');
                setTimeout(() => {
                    img.scrollIntoView({ block: 'center', behavior: 'smooth' });
                }, 100);
            }

            img.onclick = function () {
                lockState[i] = perkFile;
                const allImagesInSlot = slotContainer.querySelectorAll('.perk-option');
                allImagesInSlot.forEach(image => image.classList.remove('selected'));
                img.classList.add('selected');
            };

            slotContainer.appendChild(img);
        });

        lockContainer.appendChild(slotContainer);
    }
}

// Draw the locks immediately!
initScrollLocks();

const questionsData = {
    fresher: [
        "Looking at the intro cinematic, what was the very first object that made you think, 'I'm in trouble'?",
        "Which Survivor on the character screen looks like they'd be the first to die in a real horror movie?",
        "What was the name of the friend (or the streamer) who finally convinced/tricked you into downloading this?",
        "When you first saw the campfire on the main menu, what was the first 'vibe' or emotion you felt?",
        "Which Killer icon in the store looks the most like a nightmare you've actually had?",
        "If you had to hide in one corner of the Main Menu screen, which side (Left or Right) feels 'safer' to you?",
        "What is the one real-life item you wish you could bring into the game to defend yourself?",
        "Looking at the Survivors, who looks like they would be the nicest person in real life?",
        "What was the first sound effect in the lobby that made you turn your volume down?",
        "Which character's outfit looks the most ridiculous for someone trying to hide in a dark forest?",
        "How many seconds do you honestly think you will last in your very first chase?",
        "What does the title 'Dead by Daylight' actually mean to you before you've even played a match?",
        "If you were the Killer, what would be your signature 'scary noise' to let people know you're coming?",
        "Which Survivor looks like they have the best chance of fixing a car in real life?",
        "What is the 'horror movie trope' you plan on using to stay alive (e.g., hiding, running, or screaming)?",
        "Which color in the game's logo or UI stands out to you as the most 'threatening'?",
        "Who is the first person in your life you're going to blame when you eventually get caught?",
        "What was the specific reason or 'dare' that made you finally click the 'Download' button?",
        "If you get scared, are you a 'scream out loud' or a 'dead silence kind of person?",
        "Which character on the selection screen looks like they have the silliest hair?",
        "What was the first thing you noticed about 'The Entity's' claws surrounding the menu?",
        "What 'secret goal' have you set for yourself for your very first game ever?",
        "Which map name (shown in the tutorials) sounds like a place you'd never want to visit on vacation?",
        "What was your first thought when you saw the '5 marks' (tallies) in the game's icon?",
        "If you were trapped in 'The Fog,' what is the one thing from your house you'd miss the most?",
        "Which Survivor looks like they'd be the leader of the group based only on their face?",
        "What is the one piece of advice your friend gave you that you've already forgotten?",
        "Looking at the Killer's weapons, which one looks the most painful to be hit by?",
        "What is the first thing you plan to interact with the moment you load into a map?",
        "Which character's name is the easiest for you to remember right now?"
    ],
    beginner: [
        "What was the first Killer power that actually made you jump in real life?",
        "Which Survivor did you pick first simply because they looked like you or someone you know?",
        "What is the name of the first Perk you read and thought, 'This is definitely over-powered'?",
        "Which map's atmosphere did you find the most confusing to navigate during your first week?",
        "What was the 'noob' mistake you made for the longest time before someone corrected you?",
        "Who was the first Killer you managed to actually escape from through the Exit Gates?",
        "What is the nickname you gave to the crows before you knew they were a mechanic?",
        "Which item (Medkit, Flashlight, Toolbox, Map) did you refuse to bring because you were afraid of losing it?",
        "What was your very first 'main' character's most distinctive piece of clothing?",
        "Which sound effect in the game still gives you the most anxiety?",
        "What did you think the 'Red Stain' represented before you learned it was the Killer's vision?",
        "Who is the one Killer you refused to play against during your first 10 hours?",
        "What was the first cosmetic item you spent Bloodpoints or Shards on?",
        "Which tutorial tip did you find the most useless once you started playing real matches?",
        "What was the first 'unspoken rule' of the game you accidentally broke?"
    ],
    intermediate: [
        "Which Perk do you always keep in your 'emotional support' build, even if it isn't meta?",
        "What is your go-to strategy when you realize the Killer is a 'Scratch Mirror' Myers?",
        "Which specific Jungle Gym or tile shape do you feel most confident looping in?",
        "What is the most frustrating way you've ever seen a teammate use a Pallet?",
        "Which Killer do you find the most rewarding to 'dodge' or 'spin'?",
        "What is your personal 'cursed' map where you seem to lose every single time?",
        "What is the name of the Perk synergy you use specifically to annoy the other side?",
        "Which Hex Totem placement always makes you laugh because of how obvious it is?",
        "What is your 'Plan B' when you realize the Killer is guarding a 3-gen setup?",
        "Which Killer add-on do you think is underrated by the general community?",
        "What is the specific gesture or 'crouch code' you use to tell a teammate to stop healing you?",
        "Which offering do you burn when you're having a bad night and just want a win?",
        "What is the one Perk you think needs a complete rework more than any other?",
        "Who is the Killer you play when you just want to turn your brain off and chill?",
        "What was the most satisfying 'Kobe' (unhooking yourself) moment you've ever had?"
    ],
    pro: [
        "Which specific 'Checkspot' on a MacMillan map do you prioritize holding against a high-mobility Killer?",
        "What is your personal name for the 'Tech' you use that isn't officially recognized by the devs?",
        "Which Killer's 'lunge distance' do you have memorized to the millisecond?",
        "What is the most obscure 'Sound Cue' you use to track a Survivor without using any tracking perks?",
        "Which frame-perfect interaction (e.g., CJ Tech, Locker Save) do you fail most often despite being a pro?",
        "What is your preferred 'Pathing' route through the Killer Shack when the basement is spawned?",
        "Which specific tile combination (RNG) do you consider 'Infinite' if played correctly?",
        "What is the 'Telling' movement a Survivor makes that tips you off they are trying to bait a Dead Hard?",
        "Which map's 'Strong Window' do you prioritize forcing a block on as a Killer?",
        "What is your mental 'Timer' for how long you'll commit to a chase before breaking off?",
        "Which 'Niche' add-on combination do you run to counter the current 'Comp' meta?",
        "What is the most complex 'Mindgame' you've successfully pulled off at a T-and-L wall?",
        "Which specific interaction (e.g., vaulting, cleansing, searching) do you use to 'Buffer' your inputs?",
        "What is your 'Tell' for realizing a Killer is playing on a controller versus a mouse and keyboard?",
        "Which 'Jungle Gym' variation do you find most Killer-sided regardless of the map?",
        "What is the '99%' strategy you use most often (Gates, Recovery, Heals) to shift the end-game?",
        "Which Survivor's 'Injured Grunts' do you find the easiest to track through solid walls?",
        "What is the specific 'Pixel' or 'Collision' point you use for a Blight Rush or Billy Curve?",
        "Which 'Z-Wall' strategy do you employ to force a fast-vault against a patient Killer?",
        "What is the one 'Legacy' or 'Event' item in your inventory you will never, ever use?"
    ]
};

document.getElementById('categorySelect').addEventListener('change', function (e) {
    const category = e.target.value;
    const questionSelect = document.getElementById('questionSelect');

    questionSelect.innerHTML = '<option value="" disabled selected>Choose your secret question...</option>';

    if (category && questionsData[category]) {
        questionsData[category].forEach(question => {
            const option = document.createElement('option');
            option.value = question;
            option.textContent = question;
            questionSelect.appendChild(option);
        });
        questionSelect.disabled = false;
    }
});


// =========================================================
// 2. FIREBASE SETUP & SUBMISSION (Modern ES Module)
// =========================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, where, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// REPLACE THIS WITH YOUR ACTUAL FIREBASE CONFIG KEYS
const firebaseConfig = {
    apiKey: "AIzaSyBMAxj2E3snmnOcQXIylkIIS1cTnuu0hlY",
    authDomain: "dashboard-1db87.firebaseapp.com",
    projectId: "dashboard-1db87",
    storageBucket: "dashboard-1db87.firebasestorage.app",
    messagingSenderId: "711217707380",
    appId: "1:711217707380:web:247cfdfb2dc3c2c4485421",
    measurementId: "G-Z4WBDQ9HEH"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- HANDLE FORM SUBMISSION (Firebase) ---
document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const statusMsg = document.getElementById('statusMessage');
    statusMsg.style.color = 'white';
    statusMsg.textContent = "Summoning The Entity...";

    const sacrificeName = document.getElementById('sacrificeName').value.trim();
    const category = document.getElementById('categorySelect').value;
    const secretQuestion = document.getElementById('questionSelect').value;
    const secretAnswer = document.getElementById('secretAnswer').value.trim();

    try {
        const sacrificesRef = collection(db, "sacrifices");

        // 1. Check if username already exists
        const q = query(sacrificesRef, where("sacrifice_name", "==", sacrificeName));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            statusMsg.style.color = '#ff3333';
            statusMsg.textContent = "This Sacrifice Name is already taken!";
            return;
        }

        // 2. If it doesn't exist, Insert the new user
        await addDoc(sacrificesRef, {
            sacrifice_name: sacrificeName,
            combo_1: lockState[0],
            combo_2: lockState[1],
            secret_category: category,
            secret_question: secretQuestion,
            secret_answer: secretAnswer
        });

        statusMsg.style.color = '#33ff33';
        statusMsg.textContent = "Sacrifice Accepted! You are now registered.";
        setTimeout(() => {
            window.location.href = '../pages/login.html';
        }, 2000);

    } catch (error) {
        console.error('Firebase Error:', error);
        statusMsg.style.color = '#ff3333';
        statusMsg.textContent = "The Entity rejected your offering. Check console.";
    }
});