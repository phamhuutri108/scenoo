export type LineType = 'line-straight' | 'line-zigzag';

export type ActiveTool =
  | 'scene-break'
  | 'line-straight'
  | 'line-zigzag'
  | 'split'
  | 'annotation'
  | 'trash'
  | null;

export interface MockScriptLine {
  id: string;
  type: 'scene_heading' | 'action' | 'character' | 'parenthetical' | 'dialogue';
  text: string;
}

export interface MockScene {
  id: number;
  number: string;
  title: string;
  pageStart: number;
  pageEnd: number;
}
