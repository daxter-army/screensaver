import GifAnimation from "@components/GifAnimation/GifAnimation";

import { GIFS } from "./constants/constants";

function App() {
  const onAppDoubleClickHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // to prevent zoom
    e.preventDefault();

    if (!document.fullscreenElement) e.currentTarget.requestFullscreen();
    else document.exitFullscreen();
  };

  return (
    <div className="h-full bg-black select-none" onDoubleClick={onAppDoubleClickHandler}>
      <GifAnimation data={GIFS} />
    </div>
  );
}

export default App;
