        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
        import { getFirestore, doc, getDoc, setDoc, collection, getDocs, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

        const firebaseConfig = {
            apiKey: "AIzaSyBMAxj2E3snmnOcQXIylkIIS1cTnuu0hlY",
            authDomain: "dashboard-1db87.firebaseapp.com",
            projectId: "dashboard-1db87",
            storageBucket: "dashboard-1db87.firebasestorage.app",
            messagingSenderId: "711217707380",
            appId: "1:711217707380:web:247cfdfb2dc3c2c4485421",
            measurementId: "G-Z4WBDQ9HEH"
        };
        // =======================================================

        let app, db;
        try {
            app = initializeApp(firebaseConfig);
            db = getFirestore(app);
            console.log("Firebase Initialized Successfully.");
        } catch(e) {
            console.warn("Firebase not initialized. Paste your config to enable database saves.", e);
        }

        const currentUser = localStorage.getItem('currentUser') || 'Unknown_Victim';

        // --- GLOBAL DATA ---
        const rawPerkData = `
A Place For Us|Kwon Tae-young|When finishing healing another Survivor, both gain the Elusive Status Effect.
Ace in the Hole|Ace Visconti|Items retrieved from Chests have 1 guaranteed Add-on.
Adrenaline|Meg Thomas|When Exit Gates are powered, instantly heal one Health State and gain +50% Haste for 3 seconds.
Aftercare|Jeff Johansen|You and recent Survivors who unhooked/healed you can see each other's Auras.
Alert|Feng Min|Whenever the Killer performs a Break or Damage action, their Aura is revealed.
Any Means Necessary|Yui Kimura|See the Auras of dropped Pallets. Press Active Ability to reset it upright.
Apocalyptic Ingenuity|Rick Grimes|See Auras of broken Pallets. Rebuild them as Fragile Pallets.
Appraisal|Élodie Rakoto|Start with Tokens. Rummage empty Chests faster to retrieve an extra Item.
Autodidact|Adam Francis|Gain Tokens on Good Heal Checks for massive bonus progression. Inactive with Med-Kits.
Babysitter|Steve Harrington|When unhooking, see Killer's Aura. Unhooked Survivor leaves no tracks and gets Haste.
Background Player|Renato Lyra|When Killer picks up another Survivor, running grants +50% Haste.
Bada Bada Boom|Dustin Henderson|Install a Trap on a window. Killer vaulting it suffers -50% Hindered.
Balanced Landing|Nea Karlsson|Falling from height reduces Stagger and grants +50% Haste for 3 seconds.
Bardic Inspiration|Aestri (The Troupe)|Perform stationary. Nearby Survivors get buffed Skill Checks based on d20 roll.
Better Together|Nancy Wheeler|Generator you repair is revealed to all.
Better than New|Rebecca Chambers|Fully healing another Survivor grants them Action speed buffs.
Bite the Bullet|Leon Scott Kennedy|Suppresses Healing noises and failed check notifications.
Blast Mine|Jill Valentine|Trap a Gen. Killer damaging it gets stunned and players are blinded.
Blood Pact|Cheryl Mason|You and Obsession see each other. Healing grants Haste.
Blood Rush|Renato Lyra|After unhook, press Active Ability to instantly cure Exhausted.
Boil Over|Kate Denson|Wiggling effect is stronger, Hook Auras hidden, landing grants Wiggle progress.
Bond|Dwight Fairfield|See Auras of all other Survivors within 36 metres.
Boon: Circle of Healing|Mikaela Reid|Bless a Totem. Altruistic Healing speed +100% and injured Auras revealed.
Boon: Dark Theory|Yoichi Asakawa|Bless a Totem. Gain +3% Haste in radius.
Boon: Exponential|Jonah Vasquez|Bless a Totem. Recovery speed +100% and unlock Self-Recovery.
Boon: Illumination|Alan Wake|Bless a Totem. See Chest/Generator Auras in blue.
Boon: Shadow Step|Mikaela Reid|Bless a Totem. Scratch Marks suppressed and Auras hidden from Killer.
Boon: Steadfast|Aurora Stardotter|Bless a Totem. Gens regress slower and repair faster.
Borrowed Time|Bill Overbeck|Unhooking extends Endurance and Haste duration for the rescued.
Botany Knowledge|Claudette Morel|Permanently increases your Healing speed by 50%.
Bound by Obsession|Laurie Strode|When Killer reads your Aura, reveal Killer's Aura and gain Action speed.
Breakdown|Jeff Johansen|Upon unhook, instantly break that Hook and reveal Killer's Aura.
Breakout|Yui Kimura|Near carried Survivor, gain Haste and increase their Wiggling speed.
Buckle Up|Ash Williams|When healing a Dying Survivor, both see Killer's Aura.
Built to Last|Felix Richter|Hiding in a Locker with depleted Item recharges it.
Calm Spirit|Jake Park|Crows don't fly off. Suppresses screams and interaction noises.
Camaraderie|Steve Harrington|Pause Struggle timer if an ally is near the hook.
Champion of Light|Alan Wake|Using Flashlight grants Haste. Blinding Killer Hinders them.
Change of Plan|Dustin Henderson|In a Locker, transform a Toolbox into a Med-Kit.
Chemical Trap|Ellen Ripley|Trap a dropped Pallet. Killer breaking it is Hindered.
Clairvoyance|Mikaela Reid|After cleansing Totem, see Auras of objects within 64m.
Clean Break|Taurie Cain|Press button while being healed to become Broken, automatically healing later.
Come and Get Me!|Rick Grimes|Suppress tracks for injured Survivors, but you scream and reveal Aura.
Conviction|Michonne Grimes|While Dying, unlock Self-Recovery, become Broken, re-enter Dying later.
Corrective Action|Jonah Vasquez|Converts other Survivors' Failed Checks to Good.
Counterforce|Jill Valentine|Cleansing a Totem grants stackable speed and reveals furthest Totem Aura.
Cross-Examination|Shane Wiigwaas|See Killer's Light Marks. Standing on Mark grants Elusive.
Cut Loose|Thalita Lyra|Suppress vault noise/notification after a Rushed Vault.
Dance With Me|Kate Denson|After Rushing a Window or Locker, suppress Scratch Marks for 5s.
Dark Sense|All|Upon Generator completion, Killer's Aura is revealed.
Dead Hard|David King|While injured and running, gain Endurance for 0.5 seconds to dodge hits.
Deadline|Alan Wake|When injured, Skill Checks appear randomly and more often.
Deception|Élodie Rakoto|Fake a Locker entry to suppress Scratch Marks and trigger Loud Noise.
Decisive Strike|Laurie Strode|After unhook, hit a Skill Check when grabbed by Killer to escape.
Déjà Vu|All|See Auras of 3 closest Generators. Repair speed on them increased.
Deliverance|Adam Francis|After safe unhook, grants 100% self-unhook chance on first Hook.
Desperate Measures|Felix Richter|Healing/Unhooking speed increased per injured/dying/hooked Survivor.
Detective's Hunch|David Tapp|Upon Gen completion, see Auras of Chests, Gens, Totems.
Distortion|Jeff Johansen|When Killer reads Aura, consume Token to block Aura and suppress Scratch Marks.
Diversion|Adam Francis|Throw a pebble to create a fake Loud Noise Notification.
Down to the Last|Laurie Strode|Killed Survivors block Killer Aura-reading. As last Survivor, gain Action speed.
Dramaturgy|Nicolas Cage|While healthy, gain random effect: Haste, Exposed, scream, or Rare Item.
Duty of Care|Orela Rose|Taking a Protection Hit grants nearby Survivors Haste.
Empathic Connection|Yoichi Asakawa|Healing speed increased. Injured Survivors see your Aura.
Empathy|Claudette Morel|See Auras of injured or dying Survivors within 128 metres.
Extrasensory Perception|Eleven|Crouch to reveal Auras of Survivors, Killer, and key objects. Gain Elusive.
Exultation|Trevor Belmont|Stunning Killer with Pallet upgrades holding Item Rarity.
Eyes of Belmont|Trevor Belmont|Upon Gen completion, see Killer Aura. Extends all Killer Aura reveals.
Fast Track|Yun-Jin Lee|Great Repair Checks consume Tokens to instantly progress Generator.
Finesse|Lara Croft|While healthy, Fast Vault speed increased by 20%.
Five Moves Ahead|Kwon Tae-young|After dropping Pallet, see Auras of 5 closest Pallets/Windows.
Fixated|Nancy Wheeler|Walking speed increased. See your own Scratch Marks.
Flashbang|Leon Scott Kennedy|Hide in Locker to craft a Flash Grenade.
Flip-Flop|Ash Williams|Recovery progress also charges Wiggle progression.
Flow State|Kwon Tae-young|Completed Gens grant Action speed buffs.
Fogwise|Vittorio Toscano|Great Repair Skill Check reveals the Killer's Aura.
For the People|Zarina Kassir|Instantly heal another Survivor by sacrificing your own health state.
Friendly Competition|Thalita Lyra|Completing a Gen with others grants permanent Repair speed buff.
Fruits of Your Labor|Aurora Stardotter|Finishing a repair grants Haste and passive healing progress.
Ghost Notes|Vee Boonyasak|While Exhausted, Scratch Marks fade faster.
Hardened|Lara Croft|After looting and cleansing, screams reveal Killer's Aura instead.
Head On|Jane Romero|Sprint-exit a Locker to stun the nearby Killer.
Hope|All|Once Exit Gates are powered, gain a permanent Haste Status Effect.
Hyperfocus|Rebecca Chambers|Great Skill Checks grant Tokens for massive bonus repair progression.
Inner Focus|Haddie Kaur|See other Survivors' Scratch Marks. See Killer Aura when ally takes a hit.
Inner Strength|Nancy Wheeler|After cleansing Totem, hiding in Locker heals you.
Invocation: Treacherous Crows|Taurie Cain|Basement ritual. Killer scaring Crows reveals Aura. You become Broken permanently.
Invocation: Weaving Spiders|Sable Ward|Basement ritual. Reduces all Gen repair requirements. You become Broken permanently.
Iron Will|Jake Park|While injured, Grunt volume is reduced to 0%.
Kindred|All|When anyone is hooked, see Killer Aura and all Survivor Auras.
Leader|Dwight Fairfield|Nearby Survivors gain massive Action speed buffs.
Left Behind|Bill Overbeck|As the Last Survivor, see Hatch Aura.
Lend a Hand|Shane Wiigwaas|After Cleansing, grant another Survivor permanent healing charges.
Light-Footed|Ellen Ripley|While healthy, suppress footstep sounds entirely.
Lightweight|All|Scratch Mark lifetime and spawn chance significantly reduced.
Lithe|Feng Min|Rushed Vault grants massive Haste for 3 seconds. Causes Exhausted.
Low Profile|Ada Wong|When last one standing, suppress Grunts, Blood, and Scratch Marks.
Lucky Break|Yui Kimura|When injured, completely suppress Blood and Scratch Marks temporarily.
Lucky Star|Ellen Ripley|Suppress Grunts in Lockers. Exiting reveals Auras.
Made for This|Gabriel Soma|Healing grants Endurance. While Deep Wound, running grants Haste.
Mettle of Man|Ash Williams|Take Protection Hits to ignore the next hit that would down you.
Mirrored Illusion|Aestri (The Troupe)|Spawn a Static Illusion of yourself on a Gen/Totem.
Moment of Glory|Trevor Belmont|After looting 2 Chests, become Broken upon injury and auto-heal later.
No Mither|David King|Permanently Broken (injured). Leave no blood, suppress grunts, infinite self-pickup.
No One Left Behind|All|Endgame altruism speed +100%. See all Auras.
Off the Record|Zarina Kassir|After unhook, block Aura, suppress tracks, and gain Endurance.
One-Two-Three-Four!|Vee Boonyasak|Perform music. Grants nearby Survivors bonus Skill Check odds.
Open-Handed|Ace Visconti|Increases all Survivors' Aura-reading ranges by 16 metres.
Overcome|Jonah Vasquez|Taking damage extends your On-hit Sprint duration.
Overzealous|Haddie Kaur|Cleansing a Totem grants Repair speed until you get injured.
Parental Guidance|Yoichi Asakawa|Stunning Killer suppresses Grunts, Scratch Marks, and Blood.
Pharmacy|Quentin Smith|Chests open faster and guarantee an Emergency Med-Kit.
Plot Twist|Nicolas Cage|Silently enter Dying State to fully self-recover and gain Haste.
Plunderer's Instinct|All|See Auras of Chests. Find much rarer Items.
Poised|Jane Romero|Completing a Gen suppresses Scratch Marks. See Killer Aura on first repair.
Potential Energy|Vittorio Toscano|Store Repair progression as Tokens to instantly dump into another Gen later.
Power Struggle|Élodie Rakoto|Drop Pallet while being carried to stun Killer and escape.
Premonition|All|Audio cue when looking in Killer's direction.
Prove Thyself|Dwight Fairfield|Repairing together grants bonus Repair speed to all involved.
Quick & Quiet|Meg Thomas|Make completely silent Rushed Vaults or Locker entries.
Quick Gambit|Vittorio Toscano|Being chased near allies gives them a Repair speed boost.
Rapid Response|Orela Rose|When Exhausted, see Killer's Aura. Rushing Locker triggers Exhausted.
Reactive Healing|Ada Wong|Gain healing progress when an ally gets hit nearby.
Reassurance|Rebecca Chambers|Pause a hooked Survivor's Sacrifice timer from a distance.
Red Herring|Zarina Kassir|Enter Locker to trigger a fake Loud Noise Notification on a repaired Gen.
Repressed Alliance|Cheryl Mason|Block a Generator with the Entity to stop Killer from kicking it.
Residual Manifest|Haddie Kaur|Blinding Killer inflicts Blindness. Rummage opened Chest for Flashlight.
Resilience|All|When injured, perform all Actions 9% faster.
Resurgence|Jill Valentine|Start with 70% Healing progression after being unhooked.
Road Life|Vee Boonyasak|Repair Great Checks grant Tokens. Consume for +100% Healing speed.
Rookie Spirit|Leon Scott Kennedy|Permanently see Auras of regressing Generators after hitting skill checks.
Saboteur|Jake Park|See Hook Auras when Killer picks someone up. Sabotage hooks without Toolbox.
Salvation's Cry|Aurora Stardotter|When chased, see ally Auras. They see you and the Killer.
Scavenger|Gabriel Soma|Great Repair Checks recharge depleted Toolbox but incur Repair penalty.
Scene Partner|Nicolas Cage|Looking at Killer makes you scream but reveals their Aura.
Second Wind|Steve Harrington|Heal an ally. Next time you're unhooked, you auto-heal over time.
Self-Care|Claudette Morel|Unlock self-heal ability without a Med-Kit at 35% speed.
Self-Preservation|Yun-Jin Lee|When another Survivor is hooked, gain Elusive Status Effect.
Shoulder the Burden|Taurie Cain|Unhook an ally to trade a Hook Stage with them. You become Exposed.
Slippery Meat|All|Gain 3 extra Self-Unhook attempts and higher luck.
Small Game|All|Audio cue when looking at a hidden Totem.
Smash Hit|Yun-Jin Lee|Stunning Killer with a Pallet grants massive Haste. Causes Exhausted.
Solidarity|Jane Romero|Healing another passively heals yourself at the same time.
Soul Guard|Cheryl Mason|Picking yourself up grants Endurance. Infinite pickups if Cursed by Hex.
Specialist|Lara Croft|Loot Chests for Tokens. Consume on Gens to permanently reduce required charges.
Spine Chill|All|UI lights up when Killer looks at you. Grants minor Action speed.
Sprint Burst|Meg Thomas|Starting to run grants immediate massive Haste. Causes Exhausted.
Stake Out|David Tapp|Hide in Terror Radius for Tokens. Tokens guarantee Great Skill Checks.
Still Sight|Aestri (The Troupe)|Standing still reveals Killer, Chest, and Gen Auras.
Streetwise|Nea Karlsson|Items last significantly longer. See Killer Aura when item breaks.
Strength in Shadows|Sable Ward|Unlock fast self-heal in the Basement. Reveals Killer Aura after.
Teamwork: Collective Stealth|Renato Lyra|After healing, both survivors leave no Scratch Marks while close.
Teamwork: Full Circuit|Dustin Henderson|Co-op repairing grants larger Skill Check zones and extra speed.
Teamwork: Power of Two|Thalita Lyra|After healing, both survivors gain Haste while staying close.
Teamwork: Soft-Spoken|Eleven|Co-op repairing is quieter and faster.
Teamwork: Throw Down|Michonne Grimes|Blinding/stunning Killer grants Endurance to all injured nearby allies.
Teamwork: Toughen Up|Rick Grimes|Ally stunning Killer suppresses your injured tracks completely.
Technician|Feng Min|Missed Gen skill checks don't explode, but lose extra progress. Gen noises reduced.
Tenacity|David Tapp|Crawl faster on the ground while recovering simultaneously. Suppress grunts.
This Is Not Happening|All|While injured, Great Skill Check success zones are much larger.
Troubleshooter|Gabriel Soma|When chased, see most progressed Gen. Dropping Pallet reveals Killer Aura.
Unbreakable|Bill Overbeck|Recover on ground faster. Once per trial, pick yourself up completely.
Up the Ante|Ace Visconti|All Survivors can self-unhook on first stage. Grants team luck.
Urban Evasion|Nea Karlsson|Crouch walking is as fast as normal walking.
Vigil|Quentin Smith|Recover from Exhaustion and negative status effects much faster.
Visionary|Felix Richter|See all Generator Auras nearby.
Wake Up!|Quentin Smith|See Gate Auras. Open Gates significantly faster.
We See You|Eleven|When Killer reads your Aura, store Tokens to reveal Killer to team later.
We'll Make It|All|After unhooking, heal others at double speed for 90 seconds.
We're Gonna Live Forever|David King|Heal Dying Survivors at double speed. Grants them Endurance.
Wicked|Sable Ward|100% self-unhook chance in the Basement. See Killer Aura after unhook.
Wide Open Throttle|Shane Wiigwaas|Fast-vaulting a Pallet grants Haste and resets/blocks the Pallet.
Will to Live|All|After unhook, escape Killer's grasp if grabbed.
Windows of Opportunity|Kate Denson|See Auras of all Pallets and Windows nearby.
Wiretap|Ada Wong|Bug a Generator to reveal the Killer's Aura to the whole team.`;

        const iconFilenames = ["IconPerks_aceInTheHole.webp", "IconPerks_adrenaline.webp", "IconPerks_aftercare.webp", "IconPerks_alert.webp", "IconPerks_anyMeansNecessary.webp", "IconPerks_appraisal.webp", "IconPerks_autodidact.webp", "IconPerks_babysitter.webp", "IconPerks_backgroundPlayer.webp", "IconPerks_balancedLanding.webp", "IconPerks_bardicInspiration.webp", "IconPerks_betterThanNew.webp", "IconPerks_betterTogether.webp", "IconPerks_biteTheBullet.webp", "IconPerks_blastMine.webp", "IconPerks_bloodPact.webp", "IconPerks_bloodRush.webp", "IconPerks_boilOver.webp", "IconPerks_bond.webp", "IconPerks_boonCircleOfHealing.webp", "IconPerks_boonDarkTheory.webp", "IconPerks_boonExponential.webp", "IconPerks_boonIllumination.webp", "IconPerks_boonShadowStep.webp", "IconPerks_borrowedTime.webp", "IconPerks_botanyKnowledge.webp", "IconPerks_breakdown.webp", "IconPerks_breakout.webp", "IconPerks_buckleUp.webp", "IconPerks_builtToLast.webp", "IconPerks_calmSpirit.webp", "IconPerks_camaraderie.webp", "IconPerks_championOfLight.webp", "IconPerks_chemicalTrap.webp", "IconPerks_clairvoyance.webp", "IconPerks_cleanBreak.webp", "IconPerks_correctiveAction.webp", "IconPerks_counterforce.webp", "IconPerks_cutLoose.webp", "IconPerks_danceWithMe.webp", "IconPerks_darkSense.webp", "IconPerks_deadHard.webp", "IconPerks_deadline.webp", "IconPerks_deception.webp", "IconPerks_decisiveStrike.webp", "IconPerks_dejaVu.webp", "IconPerks_deliverance.webp", "IconPerks_desperateMeasures.webp", "IconPerks_detectivesHunch.webp", "IconPerks_distortion.webp", "IconPerks_diversion.webp", "IconPerks_dramaturgy.webp", "IconPerks_empathicConnection.webp", "IconPerks_empathy.webp", "IconPerks_Exultation.webp", "IconPerks_EyesOfBelmont.webp", "IconPerks_fastTrack.webp", "IconPerks_finesse.webp", "IconPerks_fixated.webp", "IconPerks_flashbang.webp", "IconPerks_flipFlop.webp", "IconPerks_fogwise.webp", "IconPerks_forThePeople.webp", "IconPerks_friendlyCompetition.webp", "IconPerks_hardened.webp", "IconPerks_headOn.webp", "IconPerks_hope.webp", "IconPerks_hyperfocus.webp", "IconPerks_iconperksDejavu.webp", "IconPerks_innerFocus.webp", "IconPerks_innerStrength.webp", "IconPerks_invocationTreacherousCrows.webp", "IconPerks_invocationWeavingSpiders.webp", "IconPerks_ironWill.webp", "IconPerks_kindred.webp", "IconPerks_leader.webp", "IconPerks_leftBehind.webp", "IconPerks_lightFooted.webp", "IconPerks_lightweight.webp", "IconPerks_lithe.webp", "IconPerks_lowProfile.webp", "IconPerks_luckyBreak.webp", "IconPerks_luckyStar.webp", "IconPerks_madeForThis.webp", "IconPerks_mettleOfMan.webp", "IconPerks_mirroredIllusion.webp", "IconPerks_MomentOfGlory.webp", "IconPerks_noMither.webp", "IconPerks_noOneLeftBehind.webp", "IconPerks_objectOfObsession.webp", "IconPerks_offTheRecord.webp", "IconPerks_openHanded.webp", "IconPerks_overcome.webp", "IconPerks_overzealous.webp", "IconPerks_parentalGuidance.webp", "IconPerks_pharmacy.webp", "IconPerks_plotTwist.webp", "IconPerks_plunderersInstinct.webp", "IconPerks_poised.webp", "IconPerks_potentialEnergy.webp", "IconPerks_powerStruggle.webp", "IconPerks_premonition.webp", "IconPerks_proveThyself.webp", "IconPerks_quickGambit.webp", "IconPerks_quick&Quiet.webp", "IconPerks_reactiveHealing.webp", "IconPerks_reassurance.webp", "IconPerks_redHerring.webp", "IconPerks_repressedAlliance.webp", "IconPerks_residualManifest.webp", "IconPerks_resilience.webp", "IconPerks_resurgence.webp", "IconPerks_rookieSpirit.webp", "IconPerks_saboteur.webp", "IconPerks_scavenger.webp", "IconPerks_scenePartner.webp", "IconPerks_secondWind.webp", "IconPerks_selfCare.webp", "IconPerks_selfPreservation.webp", "IconPerks_shoulderTheBurden.webp", "IconPerks_slipperyMeat.webp", "IconPerks_smallGame.webp", "IconPerks_smashHit.webp", "IconPerks_soleSurvivor.webp", "IconPerks_solidarity.webp", "IconPerks_soulGuard.webp", "IconPerks_specialist.webp", "IconPerks_spineChill.webp", "IconPerks_sprintBurst.webp", "IconPerks_stakeOut.webp", "IconPerks_stillSight.webp", "IconPerks_streetwise.webp", "IconPerks_strengthInShadows.webp", "IconPerks_teamworkCollectiveStealth.webp", "IconPerks_teamworkPowerOfTwo.webp", "IconPerks_technician.webp", "IconPerks_tenacity.webp", "IconPerks_thisIsNotHappening.webp", "IconPerks_troubleshooter.webp", "IconPerks_unbreakable.webp", "IconPerks_upTheAnte.webp", "IconPerks_urbanEvasion.webp", "IconPerks_vigil.webp", "IconPerks_visionary.webp", "IconPerks_wakeUp.webp", "IconPerks_wellMakeIt.webp", "IconPerks_wereGonnaLiveForever.webp", "IconPerks_wicked.webp", "IconPerks_windowsOfOpportunity.webp", "IconPerks_wiretap.webp"];

        function getExactOrFuzzyFilename(perkName) {
            const normPerk = perkName.toLowerCase().replace(/[^a-z0-9]/g, '');
            const overrides = { 'quickquiet': 'IconPerks_quick&Quiet.webp', 'dejavu': 'IconPerks_dejaVu.webp', 'downtothelast': 'IconPerks_soleSurvivor.webp', 'solesurvivor': 'IconPerks_soleSurvivor.webp', 'decisivestrike': 'IconPerks_decisiveStrike.webp', 'willtolive': 'IconPerks_decisiveStrike.webp', 'boundbyobsession': 'IconPerks_objectOfObsession.webp', 'objectofobsession': 'IconPerks_objectOfObsession.webp' };
            if (overrides[normPerk]) return overrides[normPerk];
            for (let file of iconFilenames) {
                let cleanFile = file.replace('IconPerks_', '').replace('.webp', '').toLowerCase().replace(/[^a-z0-9]/g, '');
                if (cleanFile === normPerk || cleanFile.includes(normPerk) || normPerk.includes(cleanFile)) return file;
            }
            let camelCase = perkName.replace(/[^a-zA-Z0-9 ]/g, '').split(' ').map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
            return `IconPerks_${camelCase}.webp`;
        }

        const SURVIVOR_PERKS = [];
        rawPerkData.trim().split('\n').forEach(line => {
            if(!line.trim()) return;
            const parts = line.split('|');
            if(parts.length === 3) {
                SURVIVOR_PERKS.push({ name: parts[0].trim(), character: parts[1].trim(), effect: parts[2].trim(), iconPath: `../assets/images/perks/${getExactOrFuzzyFilename(parts[0].trim())}` });
            }
        });

        // --- GLOBAL UI EXPORTS TO WINDOW (CRUCIAL FIX) ---
        window.switchCampaign = function(type) {
            document.getElementById('killer-campaign').style.display = type === 'killer' ? 'block' : 'none';
            document.getElementById('survivor-campaign').style.display = type === 'survivor' ? 'block' : 'none';
            document.getElementById('btn-toggle-killer').classList.toggle('active', type === 'killer');
            document.getElementById('btn-toggle-survivor').classList.toggle('active', type === 'survivor');
            document.getElementById('killer-tracker-window').classList.remove('active');
            document.getElementById('survivor-tracker-window').classList.remove('active');
        };

        window.toggleMinimize = function(id, e) {
            if (e && e.target.innerText === 'X') return;
            document.getElementById(id).classList.toggle('minimized');
        };

        window.closeTracker = function(id, e) {
            if (e) e.stopPropagation();
            document.getElementById(id).classList.remove('active');
        };

        const tooltip = document.getElementById('custom-tooltip');
        function attachTooltipEvents(element, perkData) {
            element.addEventListener('mouseenter', (e) => {
                document.getElementById('tt-title').textContent = perkData.name;
                document.getElementById('tt-char').textContent = perkData.character;
                document.getElementById('tt-effect').innerHTML = perkData.effect.replace(/(\+\d+%|-\d+%|\d+s|\d+m|\d+%)/g, '<strong>$1</strong>');
                tooltip.classList.add('visible');
                positionTooltip(e);
            });
            element.addEventListener('mousemove', positionTooltip);
            element.addEventListener('mouseleave', () => tooltip.classList.remove('visible'));
        }
        function positionTooltip(e) {
            let x = e.clientX + 20, y = e.clientY + 20;
            const ttRect = tooltip.getBoundingClientRect();
            if (x + ttRect.width > window.innerWidth) x = e.clientX - ttRect.width - 20;
            if (y + ttRect.height > window.innerHeight) y = e.clientY - ttRect.height - 20;
            tooltip.style.left = `${x}px`; tooltip.style.top = `${y}px`;
        }
        const AscensionTierData = [
            { name: "The Baseline", desc: "Standard Descent Rules. Complete the roster without modifiers to unlock the true nightmare." },
            { name: "Weakened Tools", desc: "You are no longer allowed to use strong items. Only the weakest Brown and Yellow add-ons are allowed." },
            { name: "The Entity's Choice", desc: "Before you even pick your perks, the Entity randomly bans two whole Disciplines. You have to make do with what's left." },
            { name: "A Fast Fall", desc: "The punishment for losing is much faster. If you lose once, you drop straight down to 2 perks. Lose again, and you are immediately at zero." },
            { name: "Perfect or Nothing", desc: "A normal win isn't good enough anymore. If even one survivor escapes (through the gates or the hatch), it counts as a loss. You must kill all four." }
        ];

        const tierTooltip = document.getElementById('tier-tooltip');
        function positionTierTooltip(e) {
            let x = e.clientX + 20, y = e.clientY + 20;
            const ttRect = tierTooltip.getBoundingClientRect();
            if (x + ttRect.width > window.innerWidth) x = e.clientX - ttRect.width - 20;
            if (y + ttRect.height > window.innerHeight) y = e.clientY - ttRect.height - 20;
            tierTooltip.style.left = `${x}px`; tierTooltip.style.top = `${y}px`;
        }

        // Accordion for Killer Logic
        window.toggleAccordion = function(header) {
            const accordion = header.parentElement;
            const content = accordion.querySelector('.accordion-content');
            document.querySelectorAll('.perk-accordion').forEach(acc => {
                if (acc !== accordion) { acc.classList.remove('active'); acc.querySelector('.accordion-content').style.maxHeight = null; }
            });
            accordion.classList.toggle('active');
            content.style.maxHeight = accordion.classList.contains('active') ? content.scrollHeight + "px" : null;
        };

        function startDescentLoop() {
            const slots = [ document.getElementById('loop-perk-1'), document.getElementById('loop-perk-2'), document.getElementById('loop-perk-3'), document.getElementById('loop-perk-4') ];
            let currentIndex = 0;
            setInterval(() => {
                if (currentIndex >= slots.length) { slots.forEach(slot => slot.classList.remove('consumed')); currentIndex = 0; return; }
                slots[currentIndex].classList.add('consumed'); currentIndex++;
            }, 1500);
        }
        window.addEventListener('DOMContentLoaded', startDescentLoop);

        // Modals for Other Challenges
        const challengeData = {
            'phantom': { title: "The Phantom of the Fog", meta: "Survivor // Difficulty: Extreme", desc: "Complete pacifism. Never trigger a chase sequence. Escape 10 times.", perks: ["Distortion", "Urban Evasion", "Calm Spirit", "Iron Will"] },
            'warden': { title: "The Entity's Warden", meta: "Killer // Difficulty: Hard", desc: "Pick one area. Never hook outside of it.", perks: ["Agitation", "Iron Grasp", "Territorial Imperative", "Monstrous Shrine"] },
            'purifier': { title: "The Hex Purifier", meta: "Mixed // Difficulty: Insane", desc: "Cleanse all 5 totems before touching a generator.", perks: ["Counterforce", "Small Game", "Plunderer's Instinct", "We'll Make It"] }
        };
        window.openModal = function(id) {
            const data = challengeData[id];
            document.getElementById('modalBody').innerHTML = `
                <h2 style="font-size: 2.5rem; color: #fff; margin-bottom: 0.5rem; font-family: var(--font-title); text-shadow: 0 0 10px rgba(211,47,47,0.8);">${data.title}</h2>
                <div style="color: var(--arterial-spray); font-weight: bold; margin-bottom: 2rem; border-bottom: 1px solid #333; padding-bottom: 1rem; font-family: var(--font-ui); font-size: 1.2rem;">${data.meta}</div>
                <p style="font-size: 1.1rem; color: #ccc; font-family: var(--font-journal);">${data.desc}</p>
                <h4 style="margin-top: 2rem; color: var(--arterial-spray); font-size: 1.2rem; text-transform: uppercase; font-family: var(--font-ui);">Mandatory Build</h4>
                <div style="display: flex; gap: 1rem; margin-top: 1rem; flex-wrap: wrap;">
                    ${data.perks.map(perk => `<div style="background: rgba(255,255,255,0.05); border: 1px dashed #555; padding: 1rem 1.5rem; border-radius: 6px; flex: 1; text-align: center; font-family: var(--font-tracker); font-weight: bold;">${perk}</div>`).join('')}
                </div>`;
            document.getElementById('modalOverlay').classList.add('active');
        };
        window.closeModal = function() { document.getElementById('modalOverlay').classList.remove('active'); };
        
        window.openKillerTracker = function() { 
            document.getElementById('killer-tracker-window').classList.add('active'); 
            document.getElementById('killer-tracker-window').classList.remove('minimized'); 
            DescentTracker.showView('t-roster'); 
        };
        window.openSurvivorTracker = function() { 
            document.getElementById('survivor-tracker-window').classList.add('active'); 
            document.getElementById('survivor-tracker-window').classList.remove('minimized'); 
            RouletteTracker.showView('t-s-dashboard'); 
        };


        /* ==========================================================================
           DESCENT (KILLER) LOGIC (UNCHANGED)
           ========================================================================== */
        const Killers = [ "The Shape", "The Cenobite", "The Slasher", "The Trickster", "The First", "The Krasue", "The Animatronic", "The Ghoul", "The Houndmaster", "Dracula", "The Lich - Vecna", "The Unknown", "The Good Guy - Chucky", "The Xenomorph", "The Singularity", "The Skull Merchant", "The Knight", "The Mastermind", "The Dredge", "The Onryō – Sadako", "The Artist", "The Nemesis", "The Twins", "The Blight", "The Executioner – Pyramid Head", "The Deathslinger", "The Oni", "The Demogorgon", "The Ghost Face", "The Plague", "The Legion", "The Spirit", "The Clown", "The Pig – Amanda Young", "The Nightmare – Freddy Krueger", "The Cannibal – Leatherface", "The Doctor", "The Hag", "The Huntress", "The Nurse", "The Hillbilly", "The Wraith", "The Trapper" ];
        const KillerPerks = {
            INFO: ["A Nurse's Calling", "Alien Instinct", "Awakened Awareness", "Barbecue & Chilli", "Bitter Murmur", "Darkness Revealed", "Deathbound", "Deerstalker", "Discordance", "Gearhead", "Hoarder", "Human Greed", "I'm All Ears", "Infectious Fright", "Lethal Pursuer", "Nemesis", "Nowhere to Hide", "Phantom Fear", "Scourge Hook: Floods of Rage", "Scourge Hook: Hangman's Trick", "Scourge Hook: Jagged Compass", "Shattered Hope", "Spies from the Shadows", "Stridor", "Surveillance", "THWACK!", "Territorial Imperative", "Thrilling Tremors", "Tinkerer", "Ultimate Weapon", "Wandering Eye", "Weave Attunement", "Whispers", "Zanshin Tactics"],
            CHASE: ["All-Shaking Thunder", "Bamboozle", "Bloodhound", "Brutal Strength", "Coup de Grâce", "Cruel Limits", "Dark Arrogance", "Dissolution", "Enduring", "Iron Grasp", "Lightborn", "Mad Grit", "Predator", "Spirit Fury", "Superior Anatomy", "Unrelenting"],
            SPEED: ["Agitation", "Batteries Included", "Fire Up", "Forever Entwined", "Game Afoot", "Help Wanted", "Keep Them Waiting", "Machine Learning", "Play With Your Food", "Rampage", "Rapid Brutality", "Save the Best for Last", "Scourge Hook: Monstrous Shrine", "See How They Run", "Shadowborn", "Unbound"],
            SLOWDOWN: ["Blood Echo", "Blood Warden", "Corrupt Intervention", "Coulrophobia", "Cull the Weak", "Dead Man's Switch", "Deadlock", "Dominance", "Dying Light", "Forced Hesitation", "Forced Penance", "Franklin's Demise", "Genetic Limits", "Grim Embrace", "Haywire", "Hysteria", "Knock Out", "Languid Touch", "Leverage", "Mindbreaker", "No Holds Barred", "No Quarter", "No Way Out", "None Are Free", "Overwhelming Presence", "Remember Me", "Scourge Hook: Gift of Pain", "Scourge Hook: Weeping Wounds", "Septic Touch", "Sloppy Butcher", "Terminus", "Thanatophobia", "Unnerving Presence"],
            GEN: ["Call of Brine", "Eruption", "Merciless Storm", "Oppression", "Overcharge", "Pop Goes the Weasel", "Pain Resonance", "Surge", "Turn Back the Clock", "Undone"],
            TERROR: ["Beast of Prey", "Dark Devotion", "Distressing", "Furtive Chase", "Insidious", "Monitor & Abuse", "Secret Project", "Silent Shadow", "Trail of Torment", "Unforeseen"],
            EXPOSE: ["Dragon's Grip", "Friends 'til the End", "Hubris", "Iron Maiden", "Make Your Choice", "Rancor", "Ravenous", "Starstruck"],
            HEX: ["Blood Favour", "Crowd Control", "Devour Hope", "Face the Darkness", "Fortune's Fool", "Haunted Ground", "Hive Mind", "Huntress Lullaby", "NOED", "Nothing but Misery", "Overture of Doom", "Pentimento", "Plaything", "Retribution", "Ruin", "Scared to Death", "Third Seal", "Thrill of the Hunt", "Two Can Play", "Undying", "Wretched Fate"]
        };

        const DescentState = {
            mode: 'normal',
            currentTier: 0, tierArchive: {},
            completedKillers: [], bannedPerks: {}, points: 0, stats: { sacrificed: 0, lifelines: 0, losses: 0 },
            currentKiller: null, selectedLoadout: [], activePerks: [], sacrificedThisRun: [],
            runBannedDisciplines: [], // NEW: Tracks Tier 2 blocked disciplines
            
            async load() {
                if(!db) return this.updateUI();
                try {
                    const docSnap = await getDoc(doc(db, 'player_state', currentUser));
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        this.mode = data.mode || 'normal';
                        this.currentTier = data.currentTier || 0;
                        this.tierArchive = data.tierArchive || {};
                        this.completedKillers = data.completed_killers || [];
                        const loadedBans = data.banned_perks || {};
                        Killers.forEach(k => { this.bannedPerks[k] = loadedBans[k] || []; });
                        this.points = data.points || 0;
                        this.stats = data.stats || { sacrificed: 0, lifelines: 0, losses: 0 };
                        this.runBannedDisciplines = data.runBannedDisciplines || [];
                    }
                    this.updateUI();
                } catch (e) { 
                    console.error("Firebase Descent Load Error:", e);
                    this.updateUI(); 
                }
            },
            async save() {
                this.updateUI();
                if(!db) return;
                try { 
                    await setDoc(doc(db, 'player_state', currentUser), { 
                        mode: this.mode, currentTier: this.currentTier, tierArchive: this.tierArchive,
                        completed_killers: this.completedKillers, banned_perks: this.bannedPerks, 
                        points: this.points, stats: this.stats, runBannedDisciplines: this.runBannedDisciplines 
                    }, { merge: true }); 
                } catch (e) { console.error("Firebase Save Error:", e); }
            },
            updateUI() {
                let totalCleansed = (this.currentTier * 43) + this.completedKillers.length;
                document.getElementById('stat-points').innerText = this.points;
                document.getElementById('stat-killers').innerText = `${totalCleansed} (T${this.currentTier}: ${this.completedKillers.length}/43)`;
                document.getElementById('stat-sacrificed').innerText = this.stats.sacrificed;
                document.getElementById('stat-lifelines').innerText = this.stats.lifelines;
                
                const timeline = document.getElementById('tier-timeline');
                if (timeline) {
                    timeline.innerHTML = '';
                    for (let i = 0; i <= 4; i++) {
                        const node = document.createElement('div');
                        node.className = 'tier-node';
                        if (i < this.currentTier) node.classList.add('completed');
                        else if (i === this.currentTier) node.classList.add('active-tier');
                        node.innerText = i;
                        
                        node.addEventListener('mouseenter', (e) => {
                            document.getElementById('tt-tier-name').textContent = AscensionTierData[i].name;
                            document.getElementById('tt-tier-num').textContent = "TIER " + i;
                            document.getElementById('tt-tier-desc').textContent = AscensionTierData[i].desc;
                            tierTooltip.classList.add('visible');
                            positionTierTooltip(e);
                        });
                        node.addEventListener('mousemove', positionTierTooltip);
                        node.addEventListener('mouseleave', () => tierTooltip.classList.remove('visible'));

                        timeline.appendChild(node);
                        
                        if (i < 4) {
                            const path = document.createElement('div');
                            path.className = 'tier-path';
                            if (i < this.currentTier) path.classList.add('completed');
                            timeline.appendChild(path);
                        }
                    }
                }
                
                const ascendBtn = document.getElementById('btn-ascend');
                if (ascendBtn) {
                    if (this.completedKillers.length >= 43 && this.currentTier < 4) {
                        ascendBtn.style.display = 'block';
                        document.getElementById('next-tier-num').innerText = this.currentTier + 1;
                    } else {
                        ascendBtn.style.display = 'none';
                    }
                }
                
                const modeSelect = document.getElementById('descent-mode-select');
                if (modeSelect) {
                    modeSelect.value = this.mode;
                    const hasProgressInCurrentTier = this.completedKillers.length > 0 || 
                                                     this.stats.losses > 0 || 
                                                     Object.values(this.bannedPerks).some(arr => arr.length > 0);
                    
                    if (hasProgressInCurrentTier) {
                        modeSelect.disabled = true;
                        modeSelect.title = "Difficulty is locked because you have already started this Tier. Wipe Data to change.";
                    } else {
                        modeSelect.disabled = false;
                        modeSelect.title = "Select your difficulty before starting your first match in this Tier.";
                    }
                }
                if (document.getElementById('t-roster').classList.contains('active')) DescentRoster.render();
            },
            changeMode(newMode) { this.mode = newMode; this.save(); },
            ascendTier() {
                if (this.completedKillers.length >= 43 && this.currentTier < 4) {
                    if (confirm(`Are you ready to Ascend to Tier ${this.currentTier + 1}? \n\n- Your Roster will reset to 0/43 for the new Tier.\n- ALL Perk Bans will be lifted!\n- You can choose a new Difficulty Mode.\n\n(Your Tier ${this.currentTier} history is permanently archived safely).`)) {
                        this.tierArchive[this.currentTier] = { mode: this.mode, bans: JSON.parse(JSON.stringify(this.bannedPerks)) };
                        this.currentTier++; this.completedKillers = []; this.runBannedDisciplines = [];
                        Killers.forEach(k => { this.bannedPerks[k] = []; }); 
                        this.mode = 'normal'; this.points += 10000; this.save();
                        DescentTracker.showView('t-roster');
                        alert(`ASCENSION SUCCESSFUL! Welcome to Tier ${this.currentTier}. All perks have been restored. +10,000 Points.`);
                    }
                }
            },
            resetRun() { this.selectedLoadout = []; this.activePerks = []; this.sacrificedThisRun = []; this.runBannedDisciplines = []; },
            hardReset() {
                if (confirm("WARNING: Wipe all Killer Challenge Data? This resets completions, points, Tiers, Archives, and ALL perk bans.")) {
                    this.currentTier = 0; this.tierArchive = {}; this.completedKillers = []; this.points = 0; 
                    this.stats = { sacrificed: 0, lifelines: 0, losses: 0 }; this.runBannedDisciplines = [];
                    Killers.forEach(k => { this.bannedPerks[k] = []; });
                    this.save(); DescentTracker.showView('t-roster'); alert("Killer Database WIPED.");
                }
            }
        };
        Killers.forEach(k => { DescentState.bannedPerks[k] = []; });
        
        const DescentTracker = {
            showView(viewId) {
                document.querySelectorAll('#killer-tracker-window .t-view').forEach(v => v.classList.remove('active'));
                document.querySelectorAll('#killer-tracker-window .tracker-nav button').forEach(b => b.classList.remove('active-btn'));
                document.getElementById(viewId).classList.add('active');
                if (document.getElementById(`nav-${viewId.split('-')[1]}-k`)) document.getElementById(`nav-${viewId.split('-')[1]}-k`).classList.add('active-btn');
                if (viewId === 't-roster') DescentRoster.render();
                if (viewId === 't-leaderboard') DescentLeaderboard.fetch();
            }
        };

        const DescentRoster = {
            render() {
                const grid = document.getElementById('roster-grid'); grid.innerHTML = '';
                Killers.forEach(killer => {
                    const el = document.createElement('div');
                    el.className = `tracker-killer-card ${DescentState.completedKillers.includes(killer) ? 'completed' : ''}`;
                    el.innerText = killer;
                    el.onclick = () => {
                        if (!DescentState.completedKillers.includes(killer)) {
                            DescentState.currentKiller = killer; 
                            DescentState.resetRun();
                            
                            // TIER 2+ RULE: Entity's Choice (Ban 2 Disciplines)
                            if (DescentState.currentTier >= 2) {
                                const schools = Object.keys(KillerPerks);
                                let shuffled = [...schools].sort(() => 0.5 - Math.random());
                                DescentState.runBannedDisciplines = [shuffled[0], shuffled[1]];
                                alert(`ASCENSION TIER ${DescentState.currentTier} PROTOCOL:\nThe Entity has sealed the ${shuffled[0]} and ${shuffled[1]} disciplines for this trial!`);
                                DescentState.save();
                            }

                            DescentTracker.showView('t-builder');
                            document.getElementById('nav-builder-k').style.display = 'block'; document.getElementById('nav-trial-k').style.display = 'none';
                            DescentBuilder.init();
                        }
                    };
                    grid.appendChild(el);
                });
            }
        };

        const DescentBuilder = {
            currentTab: "INFO",
            init() {
                document.getElementById('builder-killer-name').innerText = DescentState.currentKiller;
                
                // Ensure the builder doesn't default to a banned tab
                let startTab = "INFO";
                if (DescentState.runBannedDisciplines && DescentState.runBannedDisciplines.includes("INFO")) {
                    startTab = Object.keys(KillerPerks).find(s => !DescentState.runBannedDisciplines.includes(s));
                }
                
                this.renderSidebar(); this.renderSlots(); this.switchTab(startTab);
            },
            renderSidebar() {
                const sidebar = document.getElementById('schools-sidebar'); sidebar.innerHTML = '';
                Object.keys(KillerPerks).forEach(school => {
                    const btn = document.createElement('button'); btn.className = 'school-btn'; btn.id = `tab-${school}`; btn.innerText = school;
                    btn.onclick = () => this.switchTab(school); sidebar.appendChild(btn);
                });
                this.updateSidebarState();
            },
            updateSidebarState() {
                const selectedSchools = DescentState.selectedLoadout.map(l => l.school);
                const isFull = DescentState.selectedLoadout.length >= 4;
                Object.keys(KillerPerks).forEach(school => {
                    const btn = document.getElementById(`tab-${school}`); if (!btn) return;
                    btn.classList.remove('locked', 'disabled');
                    btn.style.opacity = '1'; btn.innerHTML = school; // Reset
                    
                    if (DescentState.runBannedDisciplines && DescentState.runBannedDisciplines.includes(school)) {
                        btn.classList.add('disabled');
                        btn.style.opacity = '0.3';
                        btn.innerHTML = `<span style="color:var(--entity-red)">✖ ${school}</span>`;
                    } else if (selectedSchools.includes(school)) {
                        btn.classList.add('locked');
                    } else if (isFull) {
                        btn.classList.add('disabled');
                    }
                });
            },
            switchTab(school) {
                // Prevent clicking a banned tab
                if (DescentState.runBannedDisciplines && DescentState.runBannedDisciplines.includes(school)) return; 
                
                document.querySelectorAll('.school-btn').forEach(b => b.classList.remove('active-tab'));
                document.getElementById(`tab-${school}`).classList.add('active-tab');
                this.currentTab = school; document.getElementById('perk-search').value = ''; this.renderMatrix(school);
            },
            renderMatrix(school, filter = '') {
                const grid = document.getElementById('matrix-grid'); grid.innerHTML = '';
                const banned = DescentState.bannedPerks[DescentState.currentKiller] || [];
                const currentlySelectedPerk = DescentState.selectedLoadout.find(l => l.school === school)?.perk;
                KillerPerks[school].forEach(perkName => {
                    if (filter && !perkName.toLowerCase().includes(filter.toLowerCase())) return;
                    const item = document.createElement('div'); item.className = 'perk-item tracker-perk-item'; item.innerText = perkName;
                    if (banned.includes(perkName)) item.classList.add('banned');
                    if (currentlySelectedPerk === perkName) item.classList.add('selected');
                    if (!banned.includes(perkName)) {
                        item.onclick = () => {
                            if (currentlySelectedPerk === perkName) DescentState.selectedLoadout = DescentState.selectedLoadout.filter(l => l.perk !== perkName);
                            else {
                                const existIdx = DescentState.selectedLoadout.findIndex(l => l.school === school);
                                if (existIdx !== -1) DescentState.selectedLoadout[existIdx].perk = perkName;
                                else if (DescentState.selectedLoadout.length < 4) DescentState.selectedLoadout.push({ school, perk: perkName });
                            }
                            this.renderMatrix(school, document.getElementById('perk-search').value); this.updateSidebarState(); this.renderSlots();
                        };
                    }
                    grid.appendChild(item);
                });
            },
            filterPerks() { this.renderMatrix(this.currentTab, document.getElementById('perk-search').value); },
            renderSlots() {
                for (let i = 0; i < 4; i++) {
                    const slot = document.getElementById(`slot-${i}`);
                    if (DescentState.selectedLoadout[i]) {
                        slot.innerHTML = `<span class="school-label">${DescentState.selectedLoadout[i].school}</span>${DescentState.selectedLoadout[i].perk}`;
                        slot.classList.add('filled');
                    } else { slot.innerHTML = `Empty`; slot.classList.remove('filled'); }
                }
                document.getElementById('start-trial-btn').style.display = DescentState.selectedLoadout.length === 4 ? 'block' : 'none';
            }
        };

        const DescentTrial = {
            isSacrificeMode: false,
            init() { document.getElementById('trial-killer-name').innerText = DescentState.currentKiller; DescentState.activePerks = JSON.parse(JSON.stringify(DescentState.selectedLoadout)); this.isSacrificeMode = false; this.renderStage(); },
            start() { document.getElementById('nav-trial-k').style.display = 'block'; DescentTracker.showView('t-trial'); this.init(); },
            renderStage() {
                const container = document.getElementById('trial-perks-container'); const msg = document.getElementById('trial-message'); const controls = document.getElementById('trial-controls');
                container.innerHTML = '';
                if (this.isSacrificeMode) { msg.innerText = "THE ENTITY DEMANDS A SACRIFICE. SELECT A PERK TO SHATTER."; msg.style.color = "var(--neon-red)"; controls.style.display = 'none'; container.classList.add('sacrifice-mode'); }
                else {
                    if (DescentState.activePerks.length === 0) { msg.innerText = "THE PERKLESS LIFELINE. WIN TO REGAIN HOPE."; msg.style.color = "#00ff66"; } else { msg.innerText = "Survive. Kill. Appease."; msg.style.color = "var(--entity-orange)"; }
                    controls.style.display = 'flex'; container.classList.remove('sacrifice-mode');
                }
                for (let i = 0; i < 4; i++) {
                    const el = document.createElement('div'); el.className = 'trial-perk';
                    if (i < DescentState.activePerks.length) {
                        const p = DescentState.activePerks[i]; el.classList.add('active-perk');
                        el.innerHTML = `<div class="school" style="color:var(--entity-orange); font-size:0.75rem; font-weight:bold;">${p.school}</div><div class="name" style="color:white; font-weight:bold;">${p.perk}</div>`;
                        if (this.isSacrificeMode) el.onclick = () => this.executeSacrifice(i);
                    } else {
                        el.style.background = 'rgba(0,0,0,0.5)'; el.style.border = '1px dashed rgba(255,255,255,0.05)'; el.innerHTML = `<div style="color: rgba(255,255,255,0.05); font-size: 3rem;">✖</div>`;
                    }
                    container.appendChild(el);
                }
            },
            win() {
                const pCount = DescentState.activePerks.length;
                let pts = pCount === 4 ? 1000 : pCount === 3 ? 750 : pCount === 2 ? 500 : pCount === 1 ? 250 : 1500;
                DescentState.points += pts;
                if (pCount === 0) {
                    DescentState.stats.lifelines++; alert(`Incredible! +1500 Points. You regain 1 perk and continue!`);
                    if (DescentState.sacrificedThisRun.length > 0) { DescentState.activePerks.push(DescentState.sacrificedThisRun.pop()); this.renderStage(); }
                    DescentState.save(); return;
                }
                DescentState.completedKillers.push(DescentState.currentKiller); DescentState.save();
                alert(`The Entity is pleased. +${pts} Points.`);
                document.getElementById('nav-builder-k').style.display = 'none'; document.getElementById('nav-trial-k').style.display = 'none';
                DescentTracker.showView('t-roster');
            },
            lose() {
                DescentState.points -= 100; DescentState.stats.losses++; DescentState.save();
                
                if (DescentState.activePerks.length === 0) {
                    if (DescentState.mode === 'hardcore') {
                        alert("THE ENTITY IS ENRAGED.\n[HARDCORE MODE] Your 4 initial perks are banned GLOBALLY for ALL killers. Start over.");
                        DescentState.selectedLoadout.forEach(l => {
                            Killers.forEach(k => {
                                if (!DescentState.bannedPerks[k].includes(l.perk)) {
                                    DescentState.bannedPerks[k].push(l.perk);
                                }
                            });
                        });
                    } else {
                        alert("THE ENTITY IS ENRAGED.\nYour 4 initial perks are banned for this killer forever. Start over.");
                        DescentState.selectedLoadout.forEach(l => {
                            if (!DescentState.bannedPerks[DescentState.currentKiller].includes(l.perk)) {
                                DescentState.bannedPerks[DescentState.currentKiller].push(l.perk);
                            }
                        });
                    }
                    DescentState.save();
                    document.getElementById('nav-builder-k').style.display = 'none'; document.getElementById('nav-trial-k').style.display = 'none'; DescentTracker.showView('t-roster'); return;
                }
                this.isSacrificeMode = true; this.renderStage();
            },
            executeSacrifice(index) {
                const perkElements = document.querySelectorAll('.trial-perk'); perkElements[index].classList.add('perk-shattered');
                setTimeout(() => {
                    const sacrificed = DescentState.activePerks.splice(index, 1)[0]; DescentState.sacrificedThisRun.push(sacrificed); DescentState.stats.sacrificed++; DescentState.save();
                    this.isSacrificeMode = false; this.renderStage();
                }, 1100);
            }
        };

        const DescentLeaderboard = {
            async fetch() {
                const lbContainer = document.getElementById('leaderboard-list'); 
                lbContainer.innerHTML = 'Consulting the Archives...';
                if(!db) {
                    lbContainer.innerHTML = '<span style="color:red;">Firebase is not configured. Connect database to see leaderboard.</span>';
                    return;
                }
                try {
                    // Sort descending by points
                    const q = query(collection(db, 'player_state'), orderBy('points', 'desc'), limit(100));
                    const snapshot = await getDocs(q);
                    if (snapshot.empty) { lbContainer.innerHTML = 'No sacrifices recorded yet.'; return; }
                    
                    let html = `<table class="lb-table">
                        <tr>
                            <th>Rank</th>
                            <th>Sacrifice Name</th>
                            <th>Mode</th>
                            <th>Tier</th>
                            <th>Points</th>
                            <th>Killers Cleansed</th>
                            <th>Perks Broken</th>
                            <th>Losses</th>
                        </tr>`;
                        
                    let rank = 1;
                    snapshot.forEach(doc => {
                        const data = doc.data(); 
                        const isMe = doc.id === currentUser; 
                        const stats = data.stats || {};
                        const playerTier = data.currentTier || 0;
                        
                        // Legacy support: If mode isn't defined, assume they are a veteran Normal mode player
                        const playerMode = data.mode === 'hardcore' ? 'Hardcore' : 'Normal';
                        const modeStyle = playerMode === 'Hardcore' 
                            ? 'color: var(--entity-red); font-weight: bold; text-shadow: 0 0 5px rgba(211,47,47,0.5);' 
                            : 'color: var(--text-muted);';

                        // Check if they beat the challenge (43/43 on current tier)
                        const completedCount = (data.completed_killers || []).length;
                        const isVictor = completedCount >= 43;
                        const nameDisplay = isVictor 
                            ? `🏆 <span style="color:var(--gold-ascension); text-shadow: 0 0 5px var(--gold-ascension); font-weight: bold;">${doc.id}</span> ${isMe ? '(You)' : ''}` 
                            : `${doc.id} ${isMe ? '(You)' : ''}`;

                        html += `<tr class="${isMe ? 'lb-me' : ''}">
                            <td>#${rank}</td>
                            <td>${nameDisplay}</td>
                            <td><span style="${modeStyle}">${playerMode}</span></td>
                            <td><strong style="color:var(--gold-ascension); text-shadow: var(--gold-glow); font-size: 1.2rem;">${playerTier}</strong></td>
                            <td><strong style="color:var(--entity-orange);">${data.points || 0}</strong></td>
                            <td>${completedCount} / 43</td>
                            <td>${stats.sacrificed || 0}</td>
                            <td>${stats.losses || 0}</td>
                        </tr>`;
                        rank++;
                    });
                    html += `</table>`; 
                    lbContainer.innerHTML = html;
                } catch (e) { 
                    console.error("Leaderboard Error:", e);
                    lbContainer.innerHTML = `<span style="color:red;">The connection was severed. Error: ${e.message}</span>`; 
                }
            }
        };

        // EXPORT DESCENT TO WINDOW
        window.DescentState = DescentState; // <-- This is the missing line!
        window.DescentTracker = DescentTracker; 
        window.DescentTrial = DescentTrial; 
        window.DescentBuilder = DescentBuilder;
        window.DescentRoster = DescentRoster;
        
        DescentState.load();


        /* ==========================================================================
           ROULETTE (SURVIVOR) LOGIC (REDESIGNED ALGORITHM)
           ========================================================================== */
        
        // Base points per party size
        const BASE_POINTS = { "1": 200, "2": 150, "3": 125, "4": 100 };
        // Risk match thresholds
        const RISK_MATCHES = [9, 19, 29, 39, 49, 50];

const RouletteState = {
            safeBank: 0, currentPot: 0, currentLocalStreak: 0, totalStreak: 0, highestStreak: 0,
            victorTimestamp: null, ransomJail: [], activeDraft: [], isGoldenMode: false, 
            ownedCharacters: new Set(), isJailbreakActive: false, lockedPartySize: null,
            
            async load() {
                let chars = [...new Set(SURVIVOR_PERKS.map(p => p.character))];
                chars.forEach(c => this.ownedCharacters.add(c));
                if(!db) { RouletteUI.updateDashboard(); RouletteUI.renderInventory(); return; }
                try {
                    const docSnap = await getDoc(doc(db, 'roulette_state', currentUser));
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        this.safeBank = data.safeBank || 0; 
                        this.currentPot = data.currentPot || 0; 
                        this.currentLocalStreak = data.currentLocalStreak || 0;
                        this.totalStreak = data.totalStreak || 0;
                        this.highestStreak = data.highestStreak || 0;
                        this.victorTimestamp = data.victorTimestamp || null;
                        this.ransomJail = data.ransomJail || [];
                        this.lockedPartySize = data.lockedPartySize || null;
                        if (data.ownedCharacters) this.ownedCharacters = new Set(data.ownedCharacters);
                    }
                    RouletteUI.updateDashboard(); RouletteUI.renderInventory();
                } catch (e) { RouletteUI.updateDashboard(); RouletteUI.renderInventory(); }
            },
            
            async save() {
                RouletteUI.updateDashboard();
                if(!db) return;
                try { 
                    await setDoc(doc(db, 'roulette_state', currentUser), { 
                        safeBank: this.safeBank, currentPot: this.currentPot, 
                        currentLocalStreak: this.currentLocalStreak, totalStreak: this.totalStreak,
                        highestStreak: this.highestStreak, victorTimestamp: this.victorTimestamp,
                        lockedPartySize: this.lockedPartySize, ransomJail: this.ransomJail, 
                        ownedCharacters: Array.from(this.ownedCharacters) 
                    }, { merge: true }); 
                } catch (e) {}
            },
            
            reset() {
                this.safeBank = 0; this.currentPot = 0; this.currentLocalStreak = 0; 
                this.totalStreak = 0; this.highestStreak = 0; this.victorTimestamp = null; 
                this.ransomJail = []; this.activeDraft = []; this.isGoldenMode = false; 
                this.isJailbreakActive = false; this.lockedPartySize = null; 
                this.save(); RouletteUI.resetToInitial();
            }
        };
        let rouletteDecisionTimeout = null;

        const RouletteTracker = {
            showView(viewId) {
                document.querySelectorAll('#survivor-tracker-window .t-view').forEach(v => v.classList.remove('active'));
                document.querySelectorAll('#survivor-tracker-window .tracker-nav button').forEach(b => b.classList.remove('active-btn'));
                document.getElementById(viewId).classList.add('active');
                if (document.getElementById(`nav-${viewId.substring(2)}`)) document.getElementById(`nav-${viewId.substring(2)}`).classList.add('active-btn');
                if (viewId === 't-s-dashboard') RouletteUI.updateDashboard();
                if (viewId === 't-s-roster') RouletteUI.renderInventory();
                if (viewId === 't-s-leaderboard') RouletteLeaderboard.fetch();
            }
        };

        const RouletteUI = {
            updateDashboard() {
                document.getElementById('s-stat-safe').textContent = RouletteState.safeBank;
                document.getElementById('s-stat-pot').textContent = RouletteState.currentPot;
                
                let currentMultiplier = 1.0 + (RouletteState.currentLocalStreak * 0.5);
                document.getElementById('s-stat-multiplier').textContent = `${currentMultiplier.toFixed(1)}x`;
                
                document.getElementById('s-stat-jail').textContent = RouletteState.ransomJail.length;
                
                // Point Goal Progress
                let percent = Math.min(100, (RouletteState.safeBank / 20000) * 100);
                document.getElementById('s-goal-progress').style.width = `${percent}%`;
                document.getElementById('s-goal-text').textContent = `${RouletteState.safeBank} / 20,000 Pts`;
                
                // Streak Progress
                let streakPercent = Math.min(100, (RouletteState.totalStreak / 50) * 100);
                document.getElementById('s-streak-progress').style.width = `${streakPercent}%`;
                document.getElementById('s-streak-text').textContent = `${RouletteState.totalStreak} / 50 Streak`;

                document.getElementById('btnJailbreak').style.display = RouletteState.ransomJail.length > 0 ? 'inline-block' : 'none';
                
                // Lock Party Size Dropdown if Pot exists to prevent exploit
                const partySelect = document.getElementById('party-size');
                if (RouletteState.currentPot > 0 && RouletteState.lockedPartySize) {
                    partySelect.value = RouletteState.lockedPartySize;
                    partySelect.disabled = true;
                } else {
                    partySelect.disabled = false;
                }
            },
            renderInventory() {
                const container = document.getElementById('s-inventoryGrid'); container.innerHTML = '';
                let chars = [...new Set(SURVIVOR_PERKS.map(p => p.character))].sort((a,b) => a === 'All' ? -1 : b === 'All' ? 1 : a.localeCompare(b));
                chars.forEach(char => {
                    const label = document.createElement('label'); label.className = 'char-checkbox-label';
                    const input = document.createElement('input'); input.type = 'checkbox'; input.checked = RouletteState.ownedCharacters.has(char);
                    if (char === 'All') { input.disabled = true; input.checked = true; RouletteState.ownedCharacters.add('All'); }
                    else {
                        input.addEventListener('change', (e) => {
                            if (e.target.checked) RouletteState.ownedCharacters.add(char); else RouletteState.ownedCharacters.delete(char);
                            RouletteState.save();
                        });
                    }
                    label.appendChild(input); label.appendChild(document.createTextNode(char)); container.appendChild(label);
                });
            },
            resetToInitial() {
                document.getElementById('s-perkDisplayArea').innerHTML = '<p style="color: var(--text-muted); width: 100%; text-align: center; margin-top: 50px;">Awaiting algorithmic input...</p>';
                document.getElementById('s-actionZoneInitial').style.display = 'flex';
                document.getElementById('s-actionZoneMatch').style.display = 'none';
                this.updateDashboard();
            },
            hardReset() {
                if (confirm("WARNING: Are you entirely sure you want to wipe your Survivor Database? This sets ALL Points, Streaks, and Pot to 0. (Roster unlock settings will remain).")) {
                    RouletteState.reset();
                    alert("Database WIPED. Good luck in the fog.");
                }
            }
        };

        const RouletteGame = {
            startDraft(isDoubleDown = false) {
                document.getElementById('s-decisionPanel').classList.remove('active'); clearInterval(rouletteDecisionTimeout);
                const displayArea = document.getElementById('s-perkDisplayArea');
                const btnInitiate = document.getElementById('btnInitiate');
                
                // Enforce party size lock if Doubling Down
                if (RouletteState.currentPot === 0 || !RouletteState.lockedPartySize) {
                    RouletteState.lockedPartySize = document.getElementById('party-size').value;
                } else {
                    document.getElementById('party-size').value = RouletteState.lockedPartySize;
                }
                
                const partySize = parseInt(document.getElementById('party-size').value);
                const numPerks = partySize * 4;
                
                document.getElementById('s-actionZoneInitial').style.display = 'none';
                document.getElementById('s-actionZoneMatch').style.display = 'none';
                displayArea.innerHTML = ''; 

                let availablePool = SURVIVOR_PERKS.filter(p => RouletteState.ownedCharacters.has(p.character) && !RouletteState.ransomJail.includes(p.name));

                if (availablePool.length < numPerks) {
                    alert(`WARNING: The Entity has drained your resources. Only ${availablePool.length} perks remain. You must survive with empty slots!`);
                }

                RouletteState.isGoldenMode = Math.random() < 0.15;
                const box = document.getElementById('s-randomizerBox'); const banner = document.getElementById('s-goldenBanner');
                if (RouletteState.isGoldenMode) { box.classList.add('golden-active'); banner.style.display = 'block'; }
                else { box.classList.remove('golden-active'); banner.style.display = 'none'; }

                let shuffled = [...availablePool];
for (let i = shuffled.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; }
RouletteState.activeDraft = shuffled.slice(0, numPerks);

// Pad with empty slots if the pool was too small
while (RouletteState.activeDraft.length < numPerks) {
    RouletteState.activeDraft.push({
        name: "EMPTY SLOT",
        character: "The Entity",
        effect: "You have run out of tools. Survive with nothing.",
        iconPath: "" 
    });
}

                RouletteState.activeDraft.forEach((perk, index) => {
                    const card = document.createElement('div'); card.className = 'perk-card-container';
                    const node = document.createElement('div'); node.className = 'perk-node';
                    const rhombus = document.createElement('div'); rhombus.className = 'rhombus-outer';
                    const img = document.createElement('img'); img.className = 'rhombus-inner-img'; img.alt = perk.name; img.src = perk.iconPath;
                    img.onerror = function() { this.style.display = 'none'; const fallback = document.createElement('div'); fallback.className = 'perk-fallback-badge'; fallback.textContent = perk.name.replace(/[^a-zA-Z]/g, '').substring(0, 3).toUpperCase(); rhombus.appendChild(fallback); };
                    rhombus.appendChild(img); node.appendChild(rhombus);
                    const label = document.createElement('div'); label.className = 'perk-name-label'; label.textContent = perk.name;
                    card.appendChild(node); card.appendChild(label);
                    attachTooltipEvents(card, perk); displayArea.appendChild(card);
                    setTimeout(() => card.classList.add('revealed'), index * 120);
                });

                setTimeout(() => { document.getElementById('s-actionZoneMatch').style.display = 'flex'; RouletteState.save(); }, numPerks * 120 + 400);
            },
            initiateJailbreak() { RouletteState.isJailbreakActive = true; this.startDraft(); },
            resolveMatch(outcome) {
                document.getElementById('s-actionZoneMatch').style.display = 'none';
                if(outcome === 'win') {
                    if(RouletteState.isJailbreakActive) {
                        RouletteState.ransomJail = []; RouletteState.isJailbreakActive = false; RouletteState.lockedPartySize = null;
                        alert("JAILBREAK SUCCESSFUL: All perks freed."); RouletteUI.resetToInitial();
                    } else {
                        // Core Progression Logic
                        // Core Progression Logic
RouletteState.currentLocalStreak += 1;
RouletteState.totalStreak += 1;

// Check if we beat our highest streak
if (RouletteState.totalStreak > RouletteState.highestStreak) {
    RouletteState.highestStreak = RouletteState.totalStreak;
}
                        
                        let base = BASE_POINTS[RouletteState.lockedPartySize];
                        let multiplier = 1.0 + ((RouletteState.currentLocalStreak - 1) * 0.5); // 1.0, 1.5, 2.0...
                        let earned = Math.floor(base * multiplier);
                        
                        if(RouletteState.isGoldenMode) earned *= 2; 
                        
                        RouletteState.currentPot += earned;
                        
                        if (RouletteState.totalStreak >= 50) {
                            alert("INCREDIBLE! YOU HAVE SURVIVED THE 50 STREAK ENTITY CHALLENGE!");
                        }
                        
                        this.triggerDecisionPhase();
                    }
                } else {
                    if(RouletteState.isJailbreakActive) { RouletteState.safeBank = Math.max(0, RouletteState.safeBank - 1000); RouletteState.isJailbreakActive = false; }
                    
                    // Jailing logic
                    // Jailing logic
RouletteState.activeDraft.forEach(p => {
    if (p.name !== "EMPTY SLOT") RouletteState.ransomJail.push(p.name);
});
                    
                    // Universal Streak Checkpoint & Risk Logic
                    let isRiskMatch = RISK_MATCHES.includes(RouletteState.totalStreak);
                    if (isRiskMatch) {
                        alert("THE ENTITY PUNISHES GREED. Risk match failed. Universal Streak reset to 0.");
                        RouletteState.totalStreak = 0;
                    } else {
                        // Fall back to nearest 10
                        let fallback = Math.floor(RouletteState.totalStreak / 10) * 10;
                        if (RouletteState.totalStreak > 0) {
                            alert(`The Entity hungers. Falling back to Checkpoint: ${fallback}. Perks jailed.`);
                        }
                        RouletteState.totalStreak = fallback;
                    }
                    
                    RouletteState.currentLocalStreak = 0; 
                    RouletteState.currentPot = 0; 
                    RouletteState.lockedPartySize = null;
                    RouletteState.activeDraft = [];
                    RouletteUI.resetToInitial();
                }
                RouletteState.save();
            },
            triggerDecisionPhase() {
                const panel = document.getElementById('s-decisionPanel'); const potValue = document.getElementById('s-decisionPotValue'); const timerFill = document.getElementById('s-decisionTimer');
                panel.classList.add('active'); potValue.textContent = `Pot: ${RouletteState.currentPot} Pts`;
                
                document.getElementById('btnCashOut').disabled = RouletteState.isGoldenMode;
                if(RouletteState.isGoldenMode) document.getElementById('btnCashOut').innerText = "LOCKED (Golden Mode)"; else document.getElementById('btnCashOut').innerText = "Cash Out (Secure)";

                timerFill.style.transition = 'none'; timerFill.style.transform = 'scaleX(1)';
                setTimeout(() => { timerFill.style.transition = 'transform 60s linear'; timerFill.style.transform = 'scaleX(0)'; }, 50);
                rouletteDecisionTimeout = setTimeout(() => { if(panel.classList.contains('active')) { this.startDraft(true); } }, 60000);
            },
            executeCashOut() {
                if(RouletteState.isGoldenMode) return;
                
                RouletteState.safeBank += RouletteState.currentPot; 
                
                // If they hit 20,000 for the FIRST time, record the exact timestamp
                if (RouletteState.safeBank >= 20000 && !RouletteState.victorTimestamp) {
                    RouletteState.victorTimestamp = Date.now();
                }

                RouletteState.currentPot = 0; 
                RouletteState.currentLocalStreak = 0; 
                RouletteState.lockedPartySize = null;
                RouletteState.activeDraft = [];
                document.getElementById('s-decisionPanel').classList.remove('active'); clearInterval(rouletteDecisionTimeout);
                RouletteUI.resetToInitial(); RouletteState.save();
            }
        };

const RouletteLeaderboard = {
            async fetch() {
                const lbContainer = document.getElementById('s-leaderboard-list'); 
                lbContainer.innerHTML = 'Consulting the Archives...';
                if(!db) {
                    lbContainer.innerHTML = '<span style="color:red;">Firebase is not configured. Connect database to see leaderboard.</span>';
                    return;
                }
                try {
                    // Fetch top players by safeBank
                    const q = query(collection(db, 'roulette_state'), orderBy('safeBank', 'desc'), limit(100));
                    const snapshot = await getDocs(q);
                    if (snapshot.empty) { lbContainer.innerHTML = 'No survivors recorded yet.'; return; }
                    
                    // Extract data into an array so we can custom sort it
                    let players = [];
                    snapshot.forEach(doc => { players.push({ id: doc.id, ...doc.data() }); });
                    
                    // Custom Algorithm:
                    // 1. Victors (20,000+ points) are placed at the top and sorted by earliest timestamp (Who got there first).
                    // 2. Non-Victors are sorted by highest points descending.
                    players.sort((a, b) => {
                        const aIsVictor = a.safeBank >= 20000 && a.victorTimestamp;
                        const bIsVictor = b.safeBank >= 20000 && b.victorTimestamp;

                        if (aIsVictor && bIsVictor) {
                            return a.victorTimestamp - b.victorTimestamp; // Earliest time wins
                        } else if (aIsVictor) {
                            return -1; // a goes to the top
                        } else if (bIsVictor) {
                            return 1;  // b goes to the top
                        } else {
                            return (b.safeBank || 0) - (a.safeBank || 0); // Highest points wins
                        }
                    });

                    let html = `<table class="lb-table">
                        <tr>
                            <th>Rank</th>
                            <th>Survivor Name</th>
                            <th>Date Conquered</th>
                            <th>Safe Bank</th>
                            <th>Highest Streak</th>
                        </tr>`;
                    
                    let rank = 1;
                    players.forEach(data => {
                        const isMe = data.id === currentUser;
                        const safePoints = data.safeBank || 0;
                        const isVictor = safePoints >= 20000 && data.victorTimestamp;
                        
                        // Format Name and Badge
                        const nameDisplay = isVictor 
                            ? `🏆 <span style="color:var(--gold-ascension); text-shadow: 0 0 5px var(--gold-ascension); font-weight: bold;">${data.id}</span> ${isMe ? '(You)' : ''}` 
                            : `${data.id} ${isMe ? '(You)' : ''}`;
                        
                        // Format the date they hit 20k
                        let dateDisplay = `<span style="color:#555;">-</span>`;
                        if (isVictor) {
                            const d = new Date(data.victorTimestamp);
                            dateDisplay = `<span style="color:#aaa;">${d.toLocaleDateString()}</span>`;
                        }
                        
                        html += `<tr class="${isMe ? 'lb-me' : ''}">
                            <td>#${rank}</td>
                            <td>${nameDisplay}</td>
                            <td>${dateDisplay}</td>
                            <td><strong style="color:${isVictor ? 'var(--gold-ascension)' : 'var(--bone-white)'};">${safePoints}</strong></td>
                            <td><strong style="color:#00ff66;">${data.highestStreak || 0}</strong></td>
                        </tr>`;
                        rank++;
                    });
                    
                    html += `</table>`; 
                    lbContainer.innerHTML = html;
                    
                } catch (e) { 
                    console.error("Leaderboard Error:", e);
                    lbContainer.innerHTML = `<span style="color:red;">The connection was severed. Error: ${e.message}</span>`; 
                }
            }
        };

        // EXPORT ROULETTE TO WINDOW
        window.RouletteTracker = RouletteTracker; 
        window.RouletteGame = RouletteGame;
        window.RouletteUI = RouletteUI;
        
        RouletteState.load();
