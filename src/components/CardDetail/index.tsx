import {
  useState,
  ChangeEvent,
  FormEvent,
  Dispatch,
  SetStateAction,
  LegacyRef,
} from "react";
import Snowfall from "react-snowfall";
import { IBoard, Issue } from "../../types/Types";
import { states, choosableManagers } from "../../constants/dropList";
import SearchManager from "../SearchManager";
import { useClickOutside } from "../../hooks/useClickOutside";
import { defaultProfileImage } from "../../constants/dropList";
import DatePicker from "../DatePicker";
import CardStatus from "../CardStatus/index";

interface Props {
  toggleModal: Dispatch<SetStateAction<boolean>>;
  boards: IBoard[];
  setBoards: Dispatch<SetStateAction<IBoard[]>>;
  item: Issue;
  cardIdx: number;
}
const CardDetail = ({
  toggleModal,
  boards,
  setBoards,
  item,
  cardIdx,
}: Props) => {
  const { id, title, content, state, managers, deadLine, image } = item;
  const [value, setValue] = useState({
    id,
    title,
    content,
    deadLine,
    state,
    managers,
    image,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fromIndex = cardIdx;

    const tempBoards = [...boards];

    const targetBoardIndex = Number(
      tempBoards.findIndex((board) => board.state === value.state)
    );

    const targetBoard = tempBoards.filter(
      (board) => board.state === value.state
    )[0];

    const originalIdx = boards[targetBoardIndex].cards.findIndex(
      (card) => card.id === id
    );

    const currentId = cardIdx > 0 ? originalIdx : originalIdx;

    const targetCard = tempBoards[targetBoardIndex].cards[currentId];

    const image =
      value.managers.length > 0
        ? choosableManagers.filter(
            (manager) => manager.name === value.managers[0]
          )[0].image
        : defaultProfileImage;

    const newValue = {
      ...value,
      id: cardIdx < 0 ? Math.ceil(Math.random() * 1000) : id,
      image: image,
    };

    const fromBoard = tempBoards.filter((board) => board.state === state)[0];

    if (state !== value.state) {
      fromBoard.cards.splice(fromIndex, 1);
    }

    if (targetCard !== undefined) {
      const newValue = { ...value, image: image };
      targetBoard.cards[currentId] = newValue;
    }

    if (targetCard === undefined || cardIdx < 0) {
      targetBoard.cards.push(newValue);
      tempBoards[targetBoardIndex] = targetBoard;
    }

    setBoards(tempBoards);

    localStorage.setItem("boards", JSON.stringify(tempBoards));
    toggleModal(false);
  };

  const domNode = useClickOutside(toggleModal);

  return (
    <div className=" overflow-hidden touch-none fixed top-0 left-0 w-full z-20 h-full ">
      <div className="  flex justify-center items-center bg-[rgba(0,0,0,0.03)]  h-full">
        <form
          ref={domNode as LegacyRef<HTMLFormElement>}
          onSubmit={handleSubmit}
          className="border md:rounded-lg shadow-xl py-10 md:py-20 px-8 md:px-20 w-full h-full overflow-hidden md:h-[700px] md:w-[600px] flex flex-col justify-start bg-slate-200 "
        >
          <div className=" border-b mb-3 pb-3">
            <input
              onChange={handleChange}
              value={value.title}
              name="title"
              className="bg-slate-100 rounded p-2 text-2xl mb-5 w-full"
              placeholder="제목"
            />
            <CardStatus
              value={value.state}
              name="state"
              dropList={states}
              setValue={setValue}
            />
            <SearchManager currentManagers={managers} setValue={setValue} />
            <DatePicker handleChange={handleChange} deadLine={value.deadLine} />
          </div>
          <textarea
            onChange={handleChange}
            value={value.content}
            name="content"
            className=" outline-none h-full resize-none rounded mb-8 bg-slate-100"
            placeholder="내용"
          />

          <div className="flex justify-center gap-10">
            <button
              type="submit"
              className="py-2 px-5 bg-green-700 text-white rounded-lg"
            >
              저장
            </button>
            <button
              type="button"
              onClick={() => toggleModal(false)}
              className="py-2 px-5 bg-red-700 text-white rounded-lg"
            >
              취소
            </button>
          </div>

          <Snowfall snowflakeCount={70} />
        </form>
      </div>
    </div>
  );
};

export default CardDetail;
