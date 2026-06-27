import type { CoursePart } from "../types"
import { assertNever } from "../utils"

interface PartProps {
  part: CoursePart
}

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>{part.description}</p>
          <p>
            <strong>Number of exercises:</strong> {part.exerciseCount}
          </p>
        </div>
      )
      break
    case "group":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>
            <strong>Project exercises:</strong> {part.groupProjectCount}
          </p>
          <p>
            <strong>Number of exercises:</strong> {part.exerciseCount}
          </p>
        </div>
      )
      break
    case "background":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>{part.description}</p>
          <p>
            <strong>submit to:</strong> {part.backgroundMaterial}
          </p>
          <p>
            <strong>Number of exercises:</strong> {part.exerciseCount}
          </p>
        </div>
      )
      break
    case "special":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>{part.description}</p>
          <p>
            <strong>required skills:</strong> {part.requirements.join(', ')}
          </p>
          <p>
            <strong>Number of exercises:</strong> {part.exerciseCount}
          </p>
        </div>
      )
      break
    default:
      return assertNever(part)
      break
  }
}
export default Part
