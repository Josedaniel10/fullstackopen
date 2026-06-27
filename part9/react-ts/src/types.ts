export interface CoursePartBase {
  name: string
  exerciseCount: number
}

export interface CoursePartExtend extends CoursePartBase {
  description: string
}

export interface CoursePartBasic extends CoursePartExtend {
  kind: "basic"
}

export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number
  kind: "group"
}

export interface CoursePartBackground extends CoursePartExtend {
  backgroundMaterial: string
  kind: "background"
}

export interface CoursePartSpecial extends CoursePartExtend {
  requirements: string[]
  kind: "special"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial
