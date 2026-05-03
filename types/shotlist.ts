export type IntExt = 'INT' | 'EXT' | 'INT/EXT';

export type DayNight = 'DAY' | 'NIGHT' | 'MORNING' | 'DUSK' | 'DAWN';

export type ShotSide = 'L' | 'R' | 'C' | '';

export interface ShotRow {
  id: string;
  orderIndex: number;       // Column 1: #
  sceneNumber: string;      // Column 2: SCENE #
  location: string;         // Column 3: LOCATION
  shotNumber: string;       // Column 4: SHOT #
  intExt: IntExt;           // Column 5: INT/EXT
  dayNight: DayNight;       // Column 6: D/N
  storyboardUrl?: string;   // Column 7: Storyboard
  description: string;      // Column 8: DESCRIPTION
  dialogue: string;         // Column 9: DIALOGUE
  subjects: string;         // Column 10: SUBJECTS
  scriptTime: string;       // Column 11: SCRIPT TIME (MM:SS)
  shotSize: string;         // Column 12: SHOT SIZE
  shotType: string;         // Column 13: SHOT TYPE
  side: ShotSide;           // Column 14: SIDE
  angle: string;            // Column 15: ANGLE
  movement: string;         // Column 16: MOVEMENT
  lens: string;             // Column 17: LENS
  note: string;             // Column 18: NOTE
}
