import Chessboard from "chessboardjsx";

interface Props {
  position: string,
  handleMove: Function
}

export default function InteractiveBoard({ position, handleMove }: Props) {

  return (
    <Chessboard
      position={position}
      width={400}
      dropSquareStyle={{boxShadow: 'inset 0 0 1px 4px rgba(0, 0, 0, 0.2)'}}
      onDrop={(move) =>
        handleMove({
          from: move.sourceSquare,
          to: move.targetSquare,
          promotion: "q", // TODO: give options!!
        })
      }
    />
  );
}
