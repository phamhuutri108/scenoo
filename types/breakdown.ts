export type TagCategory =
  | 'cast'
  | 'extras'
  | 'props'
  | 'set-dressing'
  | 'wardrobe'
  | 'makeup-hair'
  | 'vehicle-animals'
  | 'special-effects'
  | 'sound-music'
  | 'special-equipment'
  | 'custom';

export interface TagCount {
  category: TagCategory;
  count: number;
}

export interface Scene {
  id: string;
  number: number;
  location: string;
  intExt: 'INT' | 'EXT';
  dayNight: 'DAY' | 'NIGHT';
  tagCounts?: TagCount[];
}

export interface TaggedElement {
  id: string;
  text: string;
  category: TagCategory;
  sceneId: string;
  quantity?: number;
  note?: string;
}

export interface ScriptSegment {
  id: string;
  text: string;
  tag?: TagCategory;
}

export interface ScriptLine {
  id: string;
  type: 'slug' | 'action' | 'character' | 'dialogue';
  segments: ScriptSegment[];
}

export interface TagConfig {
  label: string;
  icon: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
}

export const TAG_CONFIG: Record<TagCategory, TagConfig> = {
  cast:                { label: 'Cast',               icon: 'person',            textColor: '#B91C1C', bgColor: '#FEF2F2', borderColor: '#FCA5A5' },
  extras:              { label: 'Extras',              icon: 'groups',            textColor: '#92400E', bgColor: '#FFFBEB', borderColor: '#FCD34D' },
  props:               { label: 'Props',               icon: 'inventory_2',       textColor: '#6D28D9', bgColor: '#F5F3FF', borderColor: '#C4B5FD' },
  'set-dressing':      { label: 'Set Dressing',        icon: 'chair',             textColor: '#9A3412', bgColor: '#FFF7ED', borderColor: '#FDBA74' },
  wardrobe:            { label: 'Wardrobe',            icon: 'checkroom',         textColor: '#0E7490', bgColor: '#ECFEFF', borderColor: '#67E8F9' },
  'makeup-hair':       { label: 'Makeup & Hair',       icon: 'face',              textColor: '#C2410C', bgColor: '#FFF7ED', borderColor: '#FB923C' },
  'vehicle-animals':   { label: 'Vehicles & Animals',  icon: 'directions_car',    textColor: '#BE185D', bgColor: '#FDF2F8', borderColor: '#F9A8D4' },
  'special-effects':   { label: 'Special Effects',     icon: 'auto_awesome',      textColor: '#1D4ED8', bgColor: '#EFF6FF', borderColor: '#93C5FD' },
  'sound-music':       { label: 'Sound & Music',       icon: 'music_note',        textColor: '#0F766E', bgColor: '#F0FDFA', borderColor: '#5EEAD4' },
  'special-equipment': { label: 'Special Equipment',   icon: 'videocam',          textColor: '#15803D', bgColor: '#F0FDF4', borderColor: '#86EFAC' },
  custom:              { label: 'Add Category',         icon: 'add_circle',        textColor: '#4B5563', bgColor: '#F9FAFB', borderColor: '#D1D5DB' },
};

export const TAG_CATEGORIES = Object.keys(TAG_CONFIG) as TagCategory[];
