import React, { useRef, useState, useEffect } from 'react';
import * as Tone from 'tone';
import './App.css';
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { GrResume } from "react-icons/gr";
import { FaStop } from "react-icons/fa";
import { SignedIn, SignedOut, useUser, useClerk } from '@clerk/clerk-react';

// This might vary based on your Clerk setup

const AppButtonsDisabled = () => {
  const { signOut } = useClerk();
  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  const red = '#F3888A';
  const yellow = '#FEF880';
  const blue = '#6AA2D8';
  const orange = '#FBAF5E';
  const purple = '#D37EF2';
  const green = '#9CE287'

  const colors = [
    [red, blue, yellow, red, blue, yellow, red, blue, yellow, red, blue, yellow, red, blue, yellow, red, blue, yellow],
    [blue, yellow, red, blue, yellow, red, blue, yellow, red, blue, yellow, red, blue, yellow, red, blue, yellow, red],
    [red, blue, yellow, red, blue, yellow, red, blue, yellow, red, blue, yellow, red, blue, yellow, red, blue, yellow],
    [blue, yellow, red, blue, yellow, red, blue, yellow, red, blue, yellow, red, blue, yellow, red, blue, yellow, red],
    [yellow, red, blue, yellow, red, blue, yellow, red, blue, yellow, red, blue, yellow, red, blue, yellow, red, blue],
    [red, blue, yellow, red, blue, yellow, red, blue, yellow, red, blue, yellow, red, blue, yellow, red, blue, yellow]
  ];

  const chords = {
    'C': {
      '2': {
        notes: [
          ['64', '45', '26'],//3 1
          ['61', '43', '24'],//6 2
          ['59', '40', '23'],//9 3
          ['57', '38', '19'],//12 4
          ['77', '59', '40'],//15 5
          ['75', '56', '38'],//18 6
          ['97', '77', '57'],//21 7
          ['93', '75', '56'],//24 8
          ['91', '72', '54'],//27 9
          ['79', '59', '40'],//30 10
          ['75', '57', '38'],//33 11
          ['74', '54', '36'],//36 12
          ['95', '75', '56'],//39 13
          ['91', '74', '54'],//42 14
          ['79', '59', '41'],//45 15
          ['77', '57', '38'],//48 16
          ['74', '56', '36'],//51 17
          ['95', '75', '57'],//54 18
          ['93', '74', '54'],//57 19
          ['79', '61', '41'],//60 20
          ['77', '57', '40'],//63 21
        ],
        chords: [
          'Cmaj', 'Dmin', 'Em', 'Fmaj', 'Gmaj', 'Amin', 'Bº', 'Cmaj', 'Dmin', 'Em', 'Fmaj', 'Gmaj',
          'Amin', 'Bº', 'Cmaj', 'Dmin', 'Em', 'Fmaj', 'Gmaj', 'Amin', 'Bº'
        ],
        chordsColor: [orange, green, purple, green, purple, orange, green, orange, green, purple, green, purple, orange, green, orange, green, purple, green, purple, orange, green],
        intervals:
          [['R', 'M3', 'P5'], ['P5', 'R', 'M3'], ['M3', 'P5', 'R'],
          ['R', 'M3', 'P5'], ['P5', 'R', 'M3'], ['M3', 'P5', 'R'],
          ['R', 'M3', 'P5'], ['P5', 'R', 'M3'], ['M3', 'P5', 'R'],
          ['R', 'M3', 'P5'], ['P5', 'R', 'M3'], ['M3', 'P5', 'R'],
          ['R', 'M3', 'P5'], ['P5', 'R', 'M3'], ['M3', 'P5', 'R'],
          ['R', 'M3', 'P5'], ['P5', 'R', 'M3'], ['M3', 'P5', 'R'],
          ['R', 'M3', 'P5'], ['P5', 'R', 'M3'], ['M3', 'P5', 'R']

          ],
        notesColor: [[yellow, red, red], [yellow, blue, blue], [red, blue, red], [blue, yellow, yellow], [blue, red, blue], [yellow, red, yellow], [blue, blue, blue],
        [red, yellow, red], [blue, yellow, blue], [red, red, blue], [yellow, blue, yellow], [blue, blue, red], [yellow, yellow, red], [blue, blue, blue],
        [red, red, yellow], [blue, blue, yellow], [blue, red, red], [yellow, yellow, blue], [red, blue, blue], [red, yellow, yellow], [blue, blue, blue]],
        noteNames: [
          ['C', 'E', 'G'], ['A', 'D', 'F'],
          ['G', 'B', 'E'], ['F', 'A', 'C'],
          ['D', 'G', 'B'], ['C', 'E', 'A'],
          ['B', 'D', 'F'], ['G', 'C', 'E'],
          ['F', 'A', 'D'], ['E', 'G', 'B'],
          ['C', 'F', 'A'], ['B', 'D', 'G'],
          ['A', 'C', 'E'], ['F', 'B', 'D'],
          ['E', 'G', 'C'], ['D', 'F', 'A'],

          ['B', 'E', 'G'], ['A', 'C', 'F'],
          ['G', 'B', 'D'], ['E', 'A', 'C'],
          ['D', 'F', 'B']
        ]


      }
    },
    'D': {
      '2': [
        ['D4', 'A4', 'F4'],
        ['A4', 'E5', 'C5']
      ]
    }
  };

  const notes = [
    ['E5', 'F5', 'F#5', 'G5', 'G#5', 'A5', 'A#5', 'B5', 'C6', 'C#6', 'D6', 'D#6', 'E6', 'F6', 'F#6', 'G6', 'G#6', 'A6'],
    ['B4', 'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5', 'A5', 'A#5', 'B5', 'C6', 'C#6', 'D6', 'D#6', 'E6'],
    ['G4', 'G#4', 'A4', 'A#4', 'B4', 'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5', 'A5', 'A#5', 'B5', 'C7'],
    ['D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5'],
    ['A3', 'A#3', 'B3', 'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5', 'C#5', 'D5'],
    ['E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3', 'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4']
  ];

  const numberKeys = [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17'],
    ['18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35'],
    ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53'],
    ['54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71'],
    ['72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89'],
    ['90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100', '101', '102', '103', '104', '105', '106', '107']
  ];

  const synthRef = useRef(null);
  const [selectedChord, setSelectedChord] = useState('C');
  const [selectedCycle, setSelectedCycle] = useState('2');
  const [chordPlaying, setChordPlaying] = useState([]);
  const [isSynthReady, setIsSynthReady] = useState(false);
  const [playingFret, setPlayingFret] = useState(null);
  const [currentChordIndex, setCurrentChordIndex] = useState(0); // Add state for current chord index
  const [currentChordName, setCurrentChordName] = useState(''); // Initialize current chord name
  const [intervals, setIntervals] = useState([''])
  const [noteNames, setNoteNames] = useState([''])
  const [colorChords, setColorChords] = useState('')
  const [colorNotes, setColorNotes] = useState([])
  const [isSliderVisible, setIsSliderVisible] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isPlayButtonDisabled, setIsPlayButtonDisabled] = useState(false);
  const [hasPlaybackStarted, setHasPlaybackStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSelectDisabled, setIsSelectDisabled] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false)
  const initAudio = async () => {
    try {
      await Tone.start();
      console.log("Audio context successfully started");
      synthRef.current = new Tone.PolySynth(Tone.Synth).toDestination();
      setIsSynthReady(true);
      setIsSelectDisabled(false)
      setIsInitialized(true)
    } catch (error) {
      console.error("Failed to start audio context:", error);
    }
  };

  const playNote = (note, time, duration, sequenceIndex, inChordIndex) => {
    if (synthRef.current) {
      const noteElement = document.querySelector(`[data-key='${note}']`);
      if (noteElement) {

        const noteNumber = noteElement.innerHTML;
        const stringIndex = numberKeys.findIndex(string => string.includes(note));
        const fretIndex = numberKeys[stringIndex].indexOf(note);
        setPlayingFret({ stringIndex, fretIndex });
        console.log(chords[selectedChord][selectedCycle].intervals[sequenceIndex])
        setIntervals(chords[selectedChord][selectedCycle].intervals[sequenceIndex]/* [inChordIndex] */);
        setColorChords(chords[selectedChord][selectedCycle].chordsColor[sequenceIndex]);
        synthRef.current.triggerAttackRelease(noteNumber, duration, time);
        setTimeout(() => {
          setPlayingFret(null);
        }, Tone.Time('8n').toMilliseconds());
      } else {
        console.error(`Note element with data-key '${note}' not found.`);
      }
    }
  };

  useEffect(() => {
    initAudio();

    Tone.Transport.on('stop', () => {
      setChordPlaying([]);
    });

    return () => {
      Tone.Transport.off('stop');
      Tone.Transport.stop();
      Tone.Transport.cancel();
    };
  }, []);


  const playChord = () => {
    if (!synthRef.current) {
      console.error("Synth is not initialized.");
      return;
    }
    setHasPlaybackStarted(true); // Indicate that playback has started
    setIsSelectDisabled(true)
    const chordSequences = chords[selectedChord][selectedCycle].notes;
    const chordNames = chords[selectedChord][selectedCycle].chords;
    const intervalNames = chords[selectedChord][selectedCycle].intervals;
    const notesNamesVar = chords[selectedChord][selectedCycle].noteNames;
    let notesToPlay = [];
    let startTime = 0;
    const targetDuration = 32; // Set the target duration to 21 seconds

    chordSequences.forEach((chordNotes, sequenceIndex) => {
      const totalChordDuration = 1;
      const timeBetweenChords = 0.5; // Adjust the time between chords to fit the target duration
      chordNotes.forEach((note, noteIndex) => {
        const noteDuration = totalChordDuration * (chordNotes.length - noteIndex) / chordNotes.length;
        const timeOffset = startTime + noteIndex * totalChordDuration / chordNotes.length;
        notesToPlay.push({ note, duration: `${noteDuration}s`, time: timeOffset, sequenceIndex, inChordIndex: noteIndex });
      });
      startTime += totalChordDuration + timeBetweenChords; // Adjust the time between chords
    });

    const totalTime = notesToPlay[notesToPlay.length - 1].time + Tone.Time(notesToPlay[notesToPlay.length - 1].duration).toSeconds();
    const timeStretchFactor = targetDuration / totalTime; // Calculate the time stretch factor

    // Adjust note durations based on the time stretch factor
    notesToPlay.forEach((note) => {
      note.duration = `${parseFloat(note.duration) * timeStretchFactor}s`;
    });

    const sequenceCallback = (time, { note, duration, sequenceIndex, inChordIndex }) => {
      playNote(note, time, duration, sequenceIndex, inChordIndex);
      setChordPlaying(chordSequences[sequenceIndex].flat());
      if (sequenceIndex === 0) {
        setCurrentChordName(chordNames[0])
        setNoteNames(notesNamesVar[0])
        setColorNotes(chords[selectedChord][selectedCycle].notesColor[0])
      }
      // Update chordName only if the chord changes
      if (sequenceIndex !== currentChordIndex) {
        setCurrentChordIndex(sequenceIndex);
        setCurrentChordName(chordNames[sequenceIndex]);
        setNoteNames(notesNamesVar[sequenceIndex]);
        setColorNotes(chords[selectedChord][selectedCycle].notesColor[sequenceIndex])
      }

      // Calculate the new slider position
      const newSliderPosition = sequenceIndex * 63; // assuming each step is 63 (you might need to adjust this based on actual steps)
      setSliderPosition(newSliderPosition);
    };


    const sequence = new Tone.Sequence(sequenceCallback, notesToPlay, '2n');
    sequence.loop = false;

    Tone.Transport.bpm.value = 240;
    Tone.Transport.start();
    sequence.start(0);

    const endTime = totalTime * timeStretchFactor;
    Tone.Transport.scheduleOnce(() => {
      setChordPlaying([]);
      setCurrentChordIndex(0); // Reset currentChordIndex
      setCurrentChordName('');
      setIntervals([]); // Reset currentChordName
      setNoteNames([])
      setColorChords(''); // Reset noteNames
      setColorNotes([])
      sequence.stop();
    }, endTime);
  };

  const pausePlayback = () => {
    console.log("Pause button pressed");
    if (isSynthReady) {
      Tone.Transport.pause();
      setIsSliderVisible(true); // Show the slider when paused
      setIsPlayButtonDisabled(true); // Disable the Play button when paused
      setIsPaused(true); // Indicate that playback is now paused
      console.log("Playback paused, isPaused:", isPaused); // Check the state after set

    }
  };


  const resumePlayback = () => {
    console.log("Resume button pressed");
    if (isSynthReady) {
      Tone.Transport.start("+0.1"); // Use a small lookahead time to ensure smooth playback resumption
      setIsSliderVisible(false); // Hide the slider when resumed
      setIsPlayButtonDisabled(false); // Enable the Play button when resumed
      setIsPaused(false); // Indicate that playback is no longer paused
      console.log("Playback resumed, isPaused:", isPaused);
      // Check the state after reset
      setIsPlayButtonDisabled(true)

    }
  };

  const stopPlayback = () => {
    if (isSynthReady) {
      Tone.Transport.stop();
      Tone.Transport.cancel();
      setChordPlaying([]);
      setCurrentChordIndex(0); // Reset currentChordIndex
      setCurrentChordName(''); // Reset currentChordName
      setNoteNames(['']);
      setIntervals([]);
      setColorChords('');
      setColorNotes([])// Reset color of chords
      setIsPlayButtonDisabled(false); // Enable the Play button when stopped
      setHasPlaybackStarted(false); // Reset playback started status
      setIsPaused(false); // Reset pause status
      setIsSelectDisabled(false)
    }
  };

  const handleSliderChange = (value) => {
    console.log("Slider value:", value);
    setSliderPosition(value);

    // Convert the slider value directly to a sequence index
    const sequenceIndex = value / 63;
    console.log("New sequence index:", sequenceIndex);

    // Update the current state and prepare for resuming playback at this index
    updatePlaybackPosition(sequenceIndex);
  };


  const updatePlaybackPosition = (sequenceIndex) => {
    // Calculate the exact start time for the sequence index
    const chordSequences = chords[selectedChord][selectedCycle].notes;
    let startTime = 0;
    for (let i = 0; i < sequenceIndex; i++) {
      startTime += chordSequences[i].length * Tone.Time('2n').toSeconds(); // Adjust depending on chord duration and time between chords
    }

    // Update the Transport's time to the calculated start time
    Tone.Transport.seconds = startTime;

    // Update the UI and application state to reflect the new playback position
    const chordNames = chords[selectedChord][selectedCycle].chords;
    setChordPlaying(chordSequences[sequenceIndex]);
    setCurrentChordIndex(sequenceIndex);
    setCurrentChordName(chordNames[sequenceIndex]);
    setIntervals(chords[selectedChord][selectedCycle].intervals[sequenceIndex]);
    setColorNotes(chords[selectedChord][selectedCycle].notesColor[sequenceIndex]);
    setColorChords(chords[selectedChord][selectedCycle].chordsColor[sequenceIndex]);
  };


  const chordSequences = chords[selectedChord][selectedCycle].notes;
  const sequenceDuration = chordSequences.reduce((acc, val) => acc + val.length, 0);
  const totalSequenceDuration = sequenceDuration * chordSequences.length;
  console.log('totalSequenceDuration', totalSequenceDuration)
  console.log('sequenceDuration:', sequenceDuration);
  return (
    <div className="App">
      <button onClick={handleLogout}>Log Out</button>
      <h1>Mick Goodrick's Cycles with <span className="meta-harmony"> Meta-Harmony colors</span></h1>
      <div className="buttons">
        <button disabled={isInitialized} className="button" onClick={initAudio}>



          Initialize Audio</button>

        <div className="select-container">
          <select className="select selectRoots" disabled={!isSynthReady || isSelectDisabled} onChange={(e) => setSelectedChord(e.target.value)}>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </div>
        <div className="select-container">
          <select className="select" disabled={!isSynthReady || isSelectDisabled} onChange={(e) => setSelectedCycle(e.target.value)}>
            <option value="2">Cycle 2</option>
            <option value="3">Cycle 3</option>
          </select>
        </div>

        <button className="button" onClick={playChord} disabled={!isSynthReady || isPlayButtonDisabled}><FaPlay />Play</button>
        <button className="button" onClick={pausePlayback} disabled={!isSynthReady || !hasPlaybackStarted || isPaused}><FaPause />Pause</button>
        <button className="button" onClick={resumePlayback} disabled={!isSynthReady || !isPaused}><GrResume />Resume</button>
        <button className="button" onClick={stopPlayback} disabled={!isSynthReady}><FaStop />Stop</button>
      </div >
      <div className="fretboard">
        {notes.map((string, stringIndex) => (
          <div key={stringIndex} className="string">
            {string.map((note, fretIndex) => (
              <div
                key={fretIndex}
                data-key={numberKeys[stringIndex][fretIndex]}
                className={`fret ${chordPlaying.includes(numberKeys[stringIndex][fretIndex]) ? 'active' : ''}`}
                style={chordPlaying.includes(numberKeys[stringIndex][fretIndex]) ? { backgroundColor: colors[stringIndex][fretIndex] } : {}}
              >
                {note}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="displayer">
        <div className="chordNames" style={{ backgroundColor: colorChords }}>{currentChordName}</div>
        <div className="intervals">
          {intervals.map((interval, index) => {
            //console.log('colorNotes[index]', colorNotes)
            return <div key={index} className="intervalIndividual" style={{ backgroundColor: colorNotes[index] }}>{interval}</div>;
          })}

        </div>
        <div className="noteNames">
          {noteNames.map((note, index) => {
            return <div key={note + index} className="notesIndividual" style={{ backgroundColor: colorNotes[index] }}>{note}</div>

          })}

        </div>
      </div>
      {
        isSliderVisible && (
          <input
            type="range"
            className="slider" // Add the class name for styling
            min="0"
            max={totalSequenceDuration}
            step={63} // Adjust step based on your requirements
            value={sliderPosition}
            onChange={(e) => handleSliderChange(e.target.value)}
            style={{ marginTop: '20px', marginBottom: '20px' }} // Additional spacing if needed
          />

        )
      }
    </div >
  );
};



export default AppButtonsDisabled;