import { ThreeVector3, ThreeRotation, ThreeArgs } from './three.d';
export type ThreeVector3 =
  | Vector3
  | [x: number, y: number, z: number]
  | undefined;

export type ThreeRotation =
  | Euler
  | [x: number, y: number, z: number, order?: string | undefined]
  | undefined;

export type ThreeArgs =
  | [
      (number | undefined)?,
      (number | undefined)?,
      (number | undefined)?,
      (number | undefined)?
    ]
  | undefined;

export interface ThreeProps {
  position?: ThreeVector3;
  rotation?: ThreeRotation;
  args?: ThreeArgs;
  color?: any;
}
